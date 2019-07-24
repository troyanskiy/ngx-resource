import { Observable } from 'rxjs';

import { Resource } from '../Resource';
import { ResourceAction } from '../ResourceAction';
import { IResourceMethodObservable, ResourceRequestMethod } from '../Declarations';


export abstract class ResourceCRUDObservable<TQuery, TShort, TFull, TQueryResult = TShort[]> extends Resource {

  @ResourceAction()
  query: IResourceMethodObservable<TQuery, TQueryResult>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: IResourceMethodObservable<{ id: any }, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Post
  })
  save: IResourceMethodObservable<TFull, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Put,
    path: '/{!id}'
  })
  update: IResourceMethodObservable<TFull, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Delete,
    path: '/{!:id}'
  })
  remove: IResourceMethodObservable<{ id: any }, any>;

  @ResourceAction({
    method: ResourceRequestMethod.Patch,
    path: '/{!id}'
  })
  patch: IResourceMethodObservable<{ id: any } & Partial<TFull>, TFull>;

  // Alias to save
  create(data: TFull, callback?: (res: TFull) => any): Observable<TFull> {
    return this.save(data, callback);
  }

}
