import {Observable} from 'rxjs';
import {Request, RequestMethod} from '@angular/http';
import { Type } from '@angular/core/src/type';
import { ResourceModel } from './ResourceModel'


export interface ResourceRequestInterceptor {
  (req: Request): Request;
}

export interface ResourceResponseInterceptor {
  (observable: Observable<any>, request?: Request): Observable<any>;
}

export interface ResourceResponseMap {
  (item: any): any;
}

export interface ResourceResponseFilter {
  (item: any): boolean;
}

export interface ResourceParamsCommon {
  url?: string;
  path?: string;
  headers?: any;
  params?: any;
  data?: any;
  removeTrailingSlash?: boolean;
}

export interface ResourceParamsBase extends ResourceParamsCommon {
  add2Provides?: boolean;
  providersSubSet?: string;
}

export interface ResourceActionBase extends ResourceParamsCommon {
  method?: RequestMethod; // get default
  isArray?: boolean;
  isLazy?: boolean;
  requestInterceptor?: ResourceRequestInterceptor;
  responseInterceptor?: ResourceResponseInterceptor;
  map?: ResourceResponseMap;
  filter?: ResourceResponseFilter;
  model?: Type<ResourceModel>;
}

export interface ResourceMethod<I, O> {
  (data?: I, callback?: (res: O) => any): ResourceResult<O>;
}

export interface ResourceModelParamsBase {
  providers?: any[];
}

export type ResourceResult<R extends {}> = R & {
  $resolved?: boolean;
  $observable?: Observable<R>;
  $abortRequest?: () => void;
}
