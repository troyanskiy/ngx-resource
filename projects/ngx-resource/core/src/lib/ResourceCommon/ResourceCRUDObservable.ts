import { ResourceActionReturnType } from '../Declarations';
import { ResourceCRUDBase } from './ResourceCRUDBase';


export abstract class ResourceCRUDObservable<TQuery, TShort, TFull, TQueryResult = TShort[]>
  extends ResourceCRUDBase<TQuery, TShort, TFull, TQueryResult,
    Promise<TQueryResult>, Promise<TFull>, Promise<any>> {

  protected readonly $crudReturnAs = ResourceActionReturnType.Observable;

}
