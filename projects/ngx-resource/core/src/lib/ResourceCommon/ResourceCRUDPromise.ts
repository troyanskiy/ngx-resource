import { Resource } from '../Resource';
import { ResourceAction } from '../ResourceAction';
import { IResourceMethodPromise, ResourceRequestMethod } from '../Declarations';


export abstract class ResourceCRUDPromise<TQuery, TShort, TFull, TQueryResult = TShort[]> extends Resource {

  @ResourceAction()
  query: IResourceMethodPromise<TQuery, TQueryResult>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: IResourceMethodPromise<{ id: any }, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Post
  })
  save: IResourceMethodPromise<TFull, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Put,
    path: '/{!id}'
  })
  update: IResourceMethodPromise<TFull, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Delete,
    path: '/{!:id}'
  })
  remove: IResourceMethodPromise<{ id: any }, any>;

  @ResourceAction({
    method: ResourceRequestMethod.Patch,
    path: '/{!id}'
  })
  patch: IResourceMethodPromise<{ id: any } & Partial<TFull>, TFull>;

  // Alias to save
  create(data: TFull, callback?: (res: TFull) => any): Promise<TFull> {
    return this.save(data, callback);
  }

}
