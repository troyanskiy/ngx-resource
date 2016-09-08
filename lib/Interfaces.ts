import {Observable} from 'rxjs';
import {Request, RequestMethod} from '@angular/http';

export interface ResourceRequestInterceptor {
  (req: Request): Request;
}

export interface ResourceResponseInterceptor {
  (observable: Observable<any>, request?: Request): Observable<any>;
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
}

export interface ResourceMethod<I, O> {
  (data?: I, callback?: (res: O) => any): ResourceResult<O>;
}

export type ResourceResult<R extends {}> = R & {
  $resolved?: boolean;
  $observable?: Observable<R>;
  $abortRequest?: () => void;
}
