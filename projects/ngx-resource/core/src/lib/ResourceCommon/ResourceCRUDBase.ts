import { Resource } from '../Resource';
import { IResourceAction, IResourceResponse, ResourceActionReturnType, ResourceRequestMethod } from '../Declarations';


export abstract class ResourceCRUDBase<TQuery, TShort, TFull, TQueryResult, TRetQuery, TRetFull, TRetAny, TId = any, TReference = {id: TId}> extends Resource {

  protected readonly abstract $crudReturnAs: ResourceActionReturnType;
  protected readonly $idPropertyName: string = "id";

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

  get(data: TReference,
      onSuccess?: (data: TFull) => any,
      onError?: (err: IResourceResponse) => any): TRetFull {

    return this.$restAction({
      actionAttributes: {
        body: data,
        onSuccess,
        onError
      },
      actionOptions: this.$_crudBaseGetActionOptions({
        path: `/{!${this.$idPropertyName}}`
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
        path: `/{!${this.$idPropertyName}}`
      })
    });

  }

  remove(data: TReference,
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
        path: `/{!${this.$idPropertyName}}`
      })
    });

  }

  patch(data: TReference & Partial<TFull>,
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
        path: `/{!${this.$idPropertyName}}`
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
