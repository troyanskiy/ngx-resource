import { ResourceActionReturnType, ResourceQueryMappingMethod, ResourceResponseBodyType, TTypePromiseNull } from './Declarations';

export class ResourceGlobalConfig {
  static url: TTypePromiseNull<string> = null;
  static pathPrefix: TTypePromiseNull<string> = null;
  static path: TTypePromiseNull<string> = null;
  static headers: TTypePromiseNull = null;
  static body: TTypePromiseNull = null;
  static params: TTypePromiseNull = null;
  static query: TTypePromiseNull = null;

  static removeTrailingSlash = true;
  static addTimestamp: boolean | string = false;
  static withCredentials = false;
  static lean: boolean | null = null;
  static returnAs: ResourceActionReturnType = ResourceActionReturnType.Observable;
  static responseBodyType: ResourceResponseBodyType = ResourceResponseBodyType.Json;


  static queryMappingMethod: ResourceQueryMappingMethod = ResourceQueryMappingMethod.Plain;

}
