import { ResourceCRUD } from './ResourceCommon/ResourceCRUD';
import { ResourceHelper } from './ResourceHelper';

export abstract class ResourceModel {

  static resourceInstance: ResourceCRUD<any, any, any> | null = null;

  protected static methodQuery = 'query';
  protected static methodGet = 'get';
  protected static methodCreate = 'create';
  protected static methodUpdate = 'update';
  protected static methodRemove = 'remove';



  abstract readonly $resource: any = null;

  $resolved = true;
  $promise: Promise<any> | null = null;
  $abort: () => void;

  $idField = 'id';

  static get(id: string | number): Promise<any> {
    const p = this.getInstance()[this.methodGet]({id});

    return p;
  }

  static query(query?: any): Promise<any> {
    const p = this.getInstance()[this.methodQuery](query);

    return p;
  }

  static remove(id: string | number): Promise<void> {
    const p = this.getInstance()[this.methodRemove]({id});

    return p;
  }

  private static getInstance(): any {
    if (!this.resourceInstance) {

      const model: ResourceModel = (new (this as any)());

      if (!model.$resource) {
        throw new Error('Your resource is not defined');
      }

      if (!model.$resource.instance) {
        throw new Error('Your resource is not created (inject it somewhere)');
      }

      this.resourceInstance = (new (this as any)()).$resource.instance;
    }

    return this.resourceInstance;
  }


  public $setData(data: any) {
    Object.assign(this, data);

    return this;
  }

  public $save(query?: any, params?: any) {

    if (this.isNew()) {
      return this.$create(query, params);
    } else {
      return this.$update(query, params);
    }

  }

  public $create(query?: any, params?: any) {
    return this.$executeResourceMethod((this.constructor as any).methodCreate, query, params);
  }

  public $update(query?: any, params?: any) {
    return this.$executeResourceMethod((this.constructor as any).methodUpdate, query, params);
  }

  public $remove(query?: any, params?: any) {
    return this.$executeResourceMethod((this.constructor as any).methodRemove, query, params);
  }

  public toJSON(): any {
    return ResourceHelper.cleanData(this);
  }

  protected isNew(): boolean {
    return !(this as any)[this.$idField];
  }

  protected $getResourceWithMethodCheck(methodName: string): any {

    if (!this.$resource) {
      console.error(`Your Resource is not defined`);

      return null;
    }

    const restInstance = this.$resource.instance;

    if (!restInstance) {
      console.error(`Your Resource is not defined or not created`);

      return null;
    }

    if (!restInstance[methodName]) {
      console.error(`Your Resource has no implemented ${methodName} method.`);

      return null;
    }

    return restInstance;

  }

  protected $executeResourceMethod(methodName: string, query?: any, params?: any) {

    const resource = this.$getResourceWithMethodCheck(methodName);

    if (resource) {
      resource[methodName](this, query, params);
    }

    return this;
  }


}
