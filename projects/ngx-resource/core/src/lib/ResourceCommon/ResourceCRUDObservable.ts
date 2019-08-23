import { ResourceActionReturnType } from '../Declarations';
import { ResourceCRUDBase } from './ResourceCRUDBase';
import { Observable } from 'rxjs';


export abstract class ResourceCRUDObservable<TQuery, TShort, TFull, TQueryResult = TShort[]>
  extends ResourceCRUDBase<TQuery, TShort, TFull, TQueryResult,
    Observable<TQueryResult>, Observable<TFull>, Observable<any>> {

  protected readonly $crudReturnAs = ResourceActionReturnType.Observable;

}
