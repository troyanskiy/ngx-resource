import {RequestMethod} from '@angular/http';
import {Resource} from './Resource';
import {ResourceMethod} from './Interfaces';
import {ResourceAction} from './ResourceAction';

export class ResourceCRUDBase<TQuery, TKeys, TShort, TFull> extends Resource {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<TQuery, TShort[]>;

  @ResourceAction()
  get: ResourceMethod<TKeys, TFull>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<TFull, TFull>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  update: ResourceMethod<TFull, TFull>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<TKeys, any>;

  // Alias to save
  create(data: TFull, callback?: (res: TFull) => any): TFull {
    return this.save(data, callback);
  }

}
