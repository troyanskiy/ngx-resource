import { Observable } from 'rxjs';

export type TTypePromiseNull<T = {}> = T | Promise<T> | null;

export interface IResourceParamsBase {
  url?: string;
  pathPrefix?: string;
  path?: string;
  headers?: any;
  body?: any;
  params?: any;
  query?: any;
}

export interface IResourceParams extends IResourceParamsBase {
  rootNode?: string;
  removeTrailingSlash?: boolean;
  addTimestamp?: boolean | string;
  withCredentials?: boolean;
  lean?: boolean;
  mutateBody?: boolean;
  asPromise?: boolean;
  asObservable?: boolean;
  keepEmptyBody?: boolean;
  requestBodyType?: ResourceRequestBodyType;
  responseBodyType?: ResourceResponseBodyType;
  queryMappingMethod?: ResourceQueryMappingMethod;
  asResourceResponse?: boolean;

  [prop: string]: any;
}

export interface IResourceAction extends IResourceParams {
  method?: ResourceRequestMethod; // get default
  expectJsonArray?: boolean;
  resultFactory?: TResourceResultFactory;
  map?: TResourceResponseMap;
  filter?: TResourceResponseFilter;
}

export type TResourceResponseMap = (item: any, options: IResourceActionInner) => any;

export type TResourceResponseFilter = (item: any, options: IResourceActionInner) => boolean;

export type TResourceResultFactory = (item: any, options: IResourceActionInner) => any;

export interface IResourceActionAttributes {
  body: any;
  query: any;
  params: any;

  onSuccess(data: any): any;

  onError(data: any): any;
}

export interface IResourceActionInner {
  actionAttributes?: IResourceActionAttributes;
  actionOptions?: IResourceAction;
  resolvedOptions?: IResourceParamsBase;

  queryMappingMethod?: ResourceQueryMappingMethod;

  usedInPath?: { [key: string]: boolean };
  mainObservable?: Observable<any>;
  isModel?: boolean;

  requestOptions?: IResourceRequest;

  returnData?: any;
}

export interface IResourceRequest {
  method?: ResourceRequestMethod;
  headers?: any;
  url?: string;
  withCredentials?: boolean;
  body?: any;
  query?: { [prop: string]: string };
  responseBodyType?: ResourceResponseBodyType;
  requestBodyType?: ResourceRequestBodyType;
}

export interface IResourceHandlerResponse {
  promise: Promise<IResourceResponse>;
  observable: Observable<IResourceResponse>;

  abort?(): void;
}

export interface IResourceResponse<B = any> {
  status: number;
  headers?: any;
  body?: B;
}

export interface IResourceMethodStrictBase<IB, IQ, IP, O, R> {
  (body: IB,
   query: IQ,
   params: IP,
   onSuccess?: (data: O) => any,
   onError?: (err: IResourceResponse) => any): R;

  (body: IB,
   query: IQ,
   onSuccess?: (data: O) => any,
   onError?: (err: IResourceResponse) => any): R;

  (body: IB,
   onSuccess?: (data: O) => any,
   onError?: (err: IResourceResponse) => any): R;

  (onSuccess?: (data: O) => any,
   onError?: (err: IResourceResponse) => any): R;
}

export interface IResourceMethodBase<IB, O, R>
  extends IResourceMethodStrictBase<IB, any, any, O, R> {
}



export interface IResourceMethodStrict<IB, IQ, IP, O>
  extends IResourceMethodStrictBase<IB, IQ, IP, O, Promise<O>> {
}

export interface IResourceMethod<IB, O>
  extends IResourceMethodBase<IB, O, Promise<O>> {
}


export interface IResourceMethodResultStrict<IB, IQ, IP, O>
  extends IResourceMethodStrictBase<IB, IQ, IP, O, ResourceResult<O>> {
}

export interface IResourceMethodResult<IB, O>
  extends IResourceMethodBase<IB, O, ResourceResult<O>> {
}



// As IResourceResponse

export interface IResourceMethodStrictFull<IB, IQ, IP, O>
  extends IResourceMethodStrictBase<IB, IQ, IP, O, Promise<IResourceResponse<O>>> {
}

export interface IResourceMethodFull<IB, O>
  extends IResourceMethodBase<IB, O, Promise<IResourceResponse<O>>> {
}


export interface IResourceMethodResultStrictFull<IB, IQ, IP, O>
  extends IResourceMethodStrictBase<IB, IQ, IP, O, ResourceResult<IResourceResponse<O>>> {
}

export interface IResourceMethodResultFull<IB, O>
  extends IResourceMethodBase<IB, O, ResourceResult<IResourceResponse<O>>> {
}



export type ResourceResult<R extends {}> = R & {
  $resolved?: boolean;
  $promise?: Promise<R>;
  $abort?(): void;
};


export enum ResourceRequestBodyType {
  NONE = 0,
  JSON = 1,
  FORM = 2,
  FORM_DATA = 3,
  TEXT = 4,
  BLOB = 5,
  ARRAY_BUFFER = 6
}

export enum ResourceResponseBodyType {
  Text = 1,
  Json = 2,
  ArrayBuffer = 3,
  Blob = 4
}

export enum ResourceRequestMethod {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
  Options = 5,
  Head = 6,
  Patch = 7
}

export enum ResourceQueryMappingMethod {
  Plain = 1,
  Bracket = 2,
  JQueryParamsBracket = 3,

  None = 99
}
