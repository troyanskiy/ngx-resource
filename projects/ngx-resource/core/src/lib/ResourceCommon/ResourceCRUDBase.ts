import { Resource } from '../Resource';
import { IResourceAction, IResourceResponse, ResourceActionReturnType, ResourceRequestMethod } from '../Declarations';


export abstract class ResourceCRUDBase<TQuery, TShort, TFull, TQueryResult, TRetQuery, TRetFull, TRetAny> extends Resource {

  protected readonly abstract $crudReturnAs: ResourceActionReturnType;

  query(query?: TQuery,
        onSuccess?: (data: TQueryResult) => any,
        onError?: (err: IResourceResponse) => any): TRetQuery {

    return this.$restAction({
      actionAttributes: {
        body: query,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions()
    });

  }

  get(data: { id: any },
      onSuccess?: (data: TFull) => any,
      onError?: (err: IResourceResponse) => any): TRetFull {

    return this.$restAction({
      actionAttributes: {
        body: data,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions({
        path: '/{!id}'
      })
    });

  }

  save(data: TFull,
       onSuccess?: (data: TFull) => any,
       onError?: (err: IResourceResponse) => any): TRetFull {

    return this.$restAction({
      actionAttributes: {
        body: data,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions({
        method: ResourceRequestMethod.Post,
      })
    });

  }

  update(data: TFull,
         onSuccess?: (data: TFull) => any,
         onError?: (err: IResourceResponse) => any): TRetFull {

    return this.$restAction({
      actionAttributes: {
        body: data,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions({
        method: ResourceRequestMethod.Put,
        path: '/{!id}'
      })
    });

  }

  remove(data: { id: any },
         onSuccess?: (data: any) => any,
         onError?: (err: IResourceResponse) => any): TRetAny {

    return this.$restAction({
      actionAttributes: {
        body: data,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions({
        method: ResourceRequestMethod.Delete,
        path: '/{!id}'
      })
    });

  }

  patch(data: { id: any } & Partial<TFull>,
        onSuccess?: (data: TFull) => any,
        onError?: (err: IResourceResponse) => any): TRetFull {

    return this.$restAction({
      actionAttributes: {
        body: data,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions({
        method: ResourceRequestMethod.Patch,
        path: '/{!id}'
      })
    });

  }

  // Alias to save
  create(data: TFull, callback?: (res: TFull) => any): TRetFull {
    return this.save(data, callback);
  }


  private $_crudBaseGetActionOptions(actionOptions: IResourceAction = {}): IResourceAction {
    return {
      ...(this as any).getResourceOptions(),
      method: ResourceRequestMethod.Get,
      returnAs: this.$crudReturnAs,
      ...actionOptions
    };
  }

}
