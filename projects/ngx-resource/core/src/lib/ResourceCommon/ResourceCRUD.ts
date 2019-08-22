import { ResourceActionReturnType } from '../Declarations';
import { ResourceCRUDBase } from './ResourceCRUDBase';


/**
 * @deprecated use ResourceCRUDPromise or ResourceCRUDObservable instead
 */
export abstract class ResourceCRUD<TQuery, TShort, TFull, TQueryResult = TShort[]>
  extends ResourceCRUDBase<TQuery, TShort, TFull, TQueryResult,
    Promise<TQueryResult>, Promise<TFull>, Promise<any>> {

  protected readonly $crudReturnAs = ResourceActionReturnType.Promise;

}
