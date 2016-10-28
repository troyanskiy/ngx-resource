import {RequestMethod} from '@angular/http';
import {Resource} from './Resource';
import {ResourceMethod} from './Interfaces';
import {ResourceAction} from './ResourceAction';

export class ResourceCRUD<TQuery, TShort, TFull> extends Resource {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<TQuery, TShort[]>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, TFull>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<TFull, TFull>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<TFull, TFull>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;

  // Alias to save
  create(data: TFull, callback?: (res: TFull) => any): TFull {
    return this.save(data, callback);
  }

}
