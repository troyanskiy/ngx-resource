import { Resource } from '../Resource';
import { ResourceAction } from '../ResourceAction';
import { IResourceMethod, ResourceRequestMethod } from '../Declarations';


export abstract class ResourceCRUD<TQuery, TShort, TFull, TQueryResult = TShort[]> extends Resource {

  @ResourceAction()
  query: IResourceMethod<TQuery, TQueryResult>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: IResourceMethod<{ id: any }, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Post
  })
  save: IResourceMethod<TFull, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Put,
    path: '/{!id}'
  })
  update: IResourceMethod<TFull, TFull>;

  @ResourceAction({
    method: ResourceRequestMethod.Delete,
    path: '/{!:id}'
  })
  remove: IResourceMethod<{ id: any }, any>;

  @ResourceAction({
    method: ResourceRequestMethod.Patch,
    path: '/{!id}'
  })
  patch: IResourceMethod<{ id: any } & Partial<TFull>, TFull>;

  // Alias to save
  create(data: TFull, callback?: (res: TFull) => any): Promise<TFull> {
    return this.save(data, callback);
  }

}
