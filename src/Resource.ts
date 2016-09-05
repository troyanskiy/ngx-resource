import {RequestMethod} from '@angular/http';
import {ResourceBase} from './ResourceBase';
import {ResourceMethod} from './Interfaces';
import {ResourceAction} from './ResourceAction';

export class Resource<T> extends ResourceBase {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<T, T>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, T>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<T, T>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<T, T>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;

  // Alias to save
  create(data: T, callback?: (res: T) => any): T {
    return this.save(data, callback);
  }

  // Alias to remove
  delete(data: {id: any}, callback?: (res: any) => any): any {
    return this.remove(data, callback);
  }

}
