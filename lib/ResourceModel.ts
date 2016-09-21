import {global} from "@angular/common/src/facade/lang";
import { Type } from "@angular/core/src/type";
import {Observable} from 'rxjs';
import {ResourceModelParamsBase} from "./Interfaces";
import {Resource} from "./Resource";
import {mapToModel} from "./ResourceAction";

var Reflect = global.Reflect;


export function ResourceModelParams(params?: ResourceModelParamsBase) {

	return function(target: Type<ResourceModel>) {
		let providers = []
		if (params) {
			providers = params.providers || [];
		}
		Reflect.defineMetadata('providers', providers, target);
	}

}


export class ResourceModel {
	$resolved: boolean;
  	$observable: Observable<any>;
  	$abortRequest: () => void;
  	$primaryKey: string = 'id';
  	$resource: Resource;

  	static resourceClass: Type<Resource>;

    static create(data: any = {}, commit: boolean = true) {
    	if (!this['resourceInstance']) {
    		console.error('You should first instantiate Resource by injecting.');
    	}
    	let result = mapToModel.bind(this['resourceInstance'])(data, this);
    	if (commit) result = result.save();
    	return result;
    }

    private _resource_method(method_name: string) {
    	let _method = this.$resource[method_name]
    	if (!_method) {
    		console.error(`Your Resource has no implemented ${method_name} method.`);
    		return;
    	}
    	let data = (method_name=="remove") ? {id: this[this.$primaryKey]} :this.getData();

    	let result = _method(data)
    	this.$resolved = result.$resolved;
    	this.$observable = result.$observable;
    	this.$abortRequest = result.$abortRequest;
    	this.$observable.subscribe(resp => {
    		this.fillFromObject(resp.getData())
    	})
    }

    private _create() {
    	this._resource_method('create');
    }

    fillFromObject(_object: any) {
        for (var propName in _object) {
            this[propName] = _object[propName]
        }
        return this
    }

    getData() {
    	let _object = {};
    	for (var propName in this) {
    		if (!(this[propName] instanceof Function)&&!(propName.charAt(0)=='$')) {

    		}
            _object[propName] = this[propName]
        }
        return _object;
    }

    save() {
    	if (this[this.$primaryKey]) {
    		this.update();
    	}
    	else {
    		this._create();
    	}
    }

    update() {
    	this._resource_method('update');
    }

    remove() {
    	this._resource_method('remove');
    }

}
