import { Type } from '@angular/core';
import { Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ResourceModel } from './ResourceModel';
import { Resource } from './Resource';


export interface ResourceRequestInterceptor {
  (req: Request, methodOptions?: ResourceActionBase): Request;
}

export interface ResourceResponseInterceptor {
  (observable: Observable<any>, request?: Request, methodOptions?: ResourceActionBase): Observable<any>;
}

export interface ResourceResponseMap {
  (item: any): any;
}

export interface ResourceResponseInitResult {
  (): any;
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
  addTimestamp?: boolean | string;
  withCredentials?: boolean;
  [propName: string]: any;
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
  initResultObject?: ResourceResponseInitResult;
  map?: ResourceResponseMap;
  filter?: ResourceResponseFilter;
  model?: Type<ResourceModel<Resource>>;
  useModel?: boolean;
  rootNode?: string;
  skipDataCleaning?: boolean;
}

export interface ResourceMethod<I, O> {
  (data?: I, callback?: (res: O) => any): ResourceResult<O>;
}

export interface ResourceMethodStrict<IB, IP, O> {
  (body?: IB, params?: IP, callback?: (res: O) => any): ResourceResult<O>;
}

export interface ResourceModelParamsBase {
  providers?: any[];
}

export type ResourceResult<R extends {}> = R & {
  $resolved?: boolean;
  $observable?: Observable<R>;
  $abortRequest?: () => void;
  $resource?: Resource;
};
