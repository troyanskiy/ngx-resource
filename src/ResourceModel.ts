import {Observable} from 'rxjs/Rx';


export class ResourceModel<R> {

  $resolved: boolean;
  $observable: Observable<any>;
  $abortRequest: () => void;
  $resource: R;

  protected cleanDataFields: string[] = [
    '$resolved',
    '$observable',
    '$abortRequest',
    '$resource'
  ];

  static create(data: any = {}, commit: boolean = true) {
    console.error('Model static create is not availbale anymore. Please use resource.createModel() method');
  }

  public $setData(data: any) {
    Object.assign(this, data);
    return this;
  }


  public $save() {

    if (this.isNew()) {
      return this.$create();
    } else {
      return this.$update();
    }

  }

  public $create() {
    return this.$resource_method('create');
  }

  public $update() {
    return this.$resource_method('update');
  }

  public $remove() {
    return this.$resource_method('remove');
  }

  public toJSON():any {
    let retObj: any = {};

    for (let propName in this) {

      if (!((<any>this)[propName] instanceof Function) && this.cleanDataFields.indexOf(propName) === -1) {
        retObj[propName] = (<any>this)[propName];
      }

    }
    return retObj;
  }

  protected isNew(): boolean {
    return !(<any>this)['id'];
  }

  private $resource_method(methodName: string) {

    if (!this.$resource) {
      console.error(`Your Resource is not set. Please use resource.createModel() method to create model.`);
      return this;
    }

    if (!(<any>this.$resource)[methodName]) {
      console.error(`Your Resource has no implemented ${methodName} method.`);
      return this;
    }

    (<any>this.$resource)[methodName](this);

    return this;
  }



}
