import { ResourceActionReturnType } from '../Declarations';
import { ResourceCRUDBase } from './ResourceCRUDBase';


export abstract class ResourceCRUDPromise<TQuery, TShort, TFull, TQueryResult = TShort[], TId = any, TReference = {id: TId}>
  extends ResourceCRUDBase<TQuery, TShort, TFull, TQueryResult,
    Promise<TQueryResult>, Promise<TFull>, Promise<any>, TId, TReference> {

  protected readonly $crudReturnAs = ResourceActionReturnType.Promise;

}
