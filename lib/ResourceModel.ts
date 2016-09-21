import {global} from '@angular/common/src/facade/lang';
import {Type} from '@angular/core/src/type';
import {Observable} from 'rxjs';
import {ResourceModelParamsBase} from './Interfaces';
import {Resource} from './Resource';
import {mapToModel} from './ResourceAction';

var Reflect = global.Reflect;


export function ResourceModelParams(params?: ResourceModelParamsBase) {

  return function (target: Type<ResourceModel>) {
    let providers = [];
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

  public $fillFromObject(_object: any) {
    for (let propName in _object) {
      this[propName] = _object[propName];
    }
    return this;
  }

  public $getData() {
    let _object = {};
    for (let propName in this) {
      if (!(this[propName] instanceof Function) && !(propName.charAt(0) === '$')) {
        _object[propName] = this[propName];
      }
    }
    return _object;
  }

  public $save() {
    if (this[this.$primaryKey]) {
      this.$update();
    }
    else {
      this._create();
    }
  }

  public $update() {
    this._resourceMethod('update');
  }

  public $remove() {
    this._resourceMethod('remove');
  }

  private _resourceMethod(method_name: string) {
    let _method = this.$resource[method_name];
    if (!_method) {
      console.error(`Your Resource has no implemented ${method_name} method.`);
      return;
    }
    let data = (method_name == 'remove') ? {id: this[this.$primaryKey]} : this.$getData();

    let result = _method(data);
    this.$resolved = result.$resolved;
    this.$observable = result.$observable;
    this.$abortRequest = result.$abortRequest;
    this.$observable.subscribe(resp => {
      this.$fillFromObject(resp.$getData());
    })
  }

  private _create() {
    this._resourceMethod('_create');
  }

}
