import {Type} from '@angular/core/src/type';
import {Observable} from 'rxjs/Rx';
import {ResourceModelParamsBase} from './Interfaces';
import {Resource} from './Resource';
import {mapToModel} from './ResourceAction';



export function ResourceModelParams(params?: ResourceModelParamsBase) {

  return function (target: Type<ResourceModel>) {
    let providers: any[] = [];
    if (params) {
      providers = params.providers || [];
    }

    (<any>Reflect).defineMetadata('providers', providers, target);
  };
}


export class ResourceModel {

  static resourceClass: Type<Resource>;
  static resourceInstance: Resource;

  $resolved: boolean;
  $observable: Observable<any>;
  $abortRequest: () => void;
  $primaryKey: string = 'id';
  $resource: Resource;

  static create(data: any = {}, commit: boolean = true) {
    if (!this.resourceInstance) {
      console.error('You should first instantiate Resource by injecting.');
    }
    let result = mapToModel.bind(this.resourceInstance)(data, this);
    if (commit) {
      result = result.$save();
    }
    return result;
  }

  public $fillFromObject(_object: any) {
    for (let propName in _object) {
      (<any>this)[propName] = _object[propName];
    }
    return this;
  }

  public $getData() {
    let _object: any = {};
    for (let propName in this) {
      if (!((<any>this)[propName] instanceof Function) && !(propName.charAt(0) === '$')) {
        _object[propName] = (<any>this)[propName];
      }
    }
    return _object;
  }

  public $save() {
    if ((<any>this)[this.$primaryKey]) {
      return this.$update();
    } else {
      return this.$create();
    }
  }

  public $update() {
    return this.$resource_method('update');
  }

  public $remove() {
    return this.$resource_method('remove');
  }

  private $resource_method(method_name: string) {
    let _method = (<any>this.$resource)[method_name];
    if (!_method) {
      console.error(`Your Resource has no implemented ${method_name} method.`);
      return this;
    }
    let data = (method_name === 'remove') ? {id: (<any>this)[this.$primaryKey]} : this.$getData();

    let result = _method.bind(this.$resource)(data);
    this.$resolved = result.$resolved;
    this.$observable = result.$observable;
    this.$abortRequest = result.$abortRequest;
    this.$observable.subscribe(resp => {
      this.$fillFromObject(resp.$getData());
    });

    return this;
  }

  private $create() {
    return this.$resource_method('create');
  }

}
