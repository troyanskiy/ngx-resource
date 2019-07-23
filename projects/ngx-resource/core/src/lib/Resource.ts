import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  IResourceAction,
  IResourceActionInner,
  IResourceResponse,
  ResourceQueryMappingMethod,
  ResourceRequestBodyType,
  ResourceRequestMethod
} from './Declarations';
import { ResourceGlobalConfig } from './ResourceGlobalConfig';
import { ResourceHelper } from './ResourceHelper';
import { ResourceHandler } from './ResourceHandler';

export class Resource {

  private $url: string | null = null;
  private $pathPrefix: string | null = null;
  private $path: string | null = null;
  private $headers: {} | null = null;
  private $body: {} | null = null;
  private $params: {} | null = null;
  private $query: {} | null = null;

  constructor(protected requestHandler: ResourceHandler) {
    (this.constructor as any).instance = this;
  }

  /**
   * Used to get url
   */
  $getUrl(actionOptions: IResourceAction = {}): string | Promise<string> {
    return this.$url || actionOptions.url || ResourceGlobalConfig.url || '';
  }

  $setUrl(url: string) {
    this.$url = url;
  }

  /**
   * Used to get path prefix
   */
  $getPathPrefix(actionOptions: IResourceAction = {}): string | Promise<string> {
    return this.$pathPrefix || actionOptions.pathPrefix || ResourceGlobalConfig.pathPrefix || '';
  }

  $setPathPrefix(path: string) {
    this.$pathPrefix = path;
  }

  /**
   * Used to get path
   */
  $getPath(actionOptions: IResourceAction = {}): string | Promise<string> {
    return this.$path || actionOptions.path || ResourceGlobalConfig.path || '';
  }

  $setPath(path: string) {
    this.$path = path;
  }

  /**
   * Get headers.
   */
  $getHeaders(actionOptions: IResourceAction = {}): any | Promise<any> {
    return this.$headers || actionOptions.headers || ResourceGlobalConfig.headers || {};
  }

  $setHeaders(headers: any) {
    this.$headers = headers;
  }

  /**
   * Get body
   */
  $getBody(actionOptions: IResourceAction = {}): any | Promise<any> {
    return this.$body || actionOptions.body || ResourceGlobalConfig.body || {};
  }

  $setBody(body: any) {
    this.$body = body;
  }

  /**
   * Get path params
   */
  $getParams(actionOptions: IResourceAction = {}): any | Promise<any> {
    return this.$params || actionOptions.params || ResourceGlobalConfig.params || {};
  }

  $setParams(params: any) {
    this.$params = params;
  }

  /**
   * Get query params
   */
  $getQuery(actionOptions: IResourceAction = {}): any | Promise<any> {
    return this.$query || actionOptions.query || ResourceGlobalConfig.query || {};
  }

  $setQuery(query: any) {
    this.$query = query;
  }

  /**
   * Used to filter received data.
   * Is applied on each element of array or object
   */
  $filter(data: any, options: IResourceActionInner = {}): boolean {
    return true;
  }

  /**
   * Used to map received data
   * Is applied on each element of array or object
   */
  $map(data: any, options: IResourceActionInner = {}): any {
    return data;
  }

  /**
   * Used to create result object
   * Is applied on each element of array or object
   */
  $resultFactory(data: any, options: IResourceActionInner = {}): any {
    return data || {};
  }

  $restAction(options: IResourceActionInner) {

    this.$_setResourceActionInnerDefaults(options);
    this.$_setResourceActionOptionDefaults(options);

    if (!options.actionOptions) {
      throw new Error('Action options are not set');
    }

    const actionOptions = options.actionOptions;

    if (!actionOptions.resultFactory) {
      throw new Error('Action options resultFactory is not set');
    }

    if (!options.actionAttributes) {
      throw new Error('Action attributes is not set');
    }


    if (actionOptions.mutateBody || options.isModel) {
      options.returnData = options.actionAttributes.body;
    }

    if (!actionOptions.asPromise) {
      options.returnData = actionOptions.expectJsonArray ? [] : actionOptions.resultFactory.call(this, null, options);
    }

    if (this.$_canSetInternalData(options)) {
      ResourceHelper.defineReturnDataPropertiesResolvedAbort(options.returnData);
    }

    options.mainObservable = this.$_createMainObservable(options);

    if (this.$_canSetInternalData(options)) {
      ResourceHelper.defineReturnDataPropertiesPromise(options.returnData, options.mainObservable.toPromise());
    }

    if (actionOptions.asObservable) {
      return options.mainObservable.toPromise();
    }

    if (actionOptions.asPromise) {
      return options.mainObservable.toPromise();
    }

    return options.returnData;

  }

  /**
   * Creates main request observable
   */
  protected $_createMainObservable(options: IResourceActionInner): Observable<any> {

    const requestPreparationPromise = this.$_setResolvedOptions(options)
      .then((o: IResourceActionInner) => this.$_createRequestOptions(o));

    return of(requestPreparationPromise)
      .pipe(
        switchMap((oPromise: Promise<IResourceActionInner>) => {
          return oPromise
            .then((o: IResourceActionInner) => {

              if (!o.requestOptions) {
                throw new Error('IResourceActionInner miss request options');
              }

              const handlerResp = this.requestHandler.handle(o.requestOptions);

              if (o.returnData && this.$_canSetInternalData(options)) {
                o.returnData.$abort = handlerResp.abort;
              }

              return handlerResp.observable || handlerResp.promise;

            });
        }),
        switchMap(s => s instanceof Observable ? s : of(s)),
        map((resp: IResourceResponse) => this.$handleSuccessResponse(options, resp)),
        catchError((resp: IResourceResponse) => {
          throw this.$handleErrorResponse(options, resp);
        })
      );
  }

  /**
   * Success response handler
   */
  protected $handleSuccessResponse(options: IResourceActionInner, resp: IResourceResponse): any {

    let body = resp.body;

    if (Array.isArray(body)) {
      body = this.$prepareSuccessResponseBodyArray(body, options);
    } else {
      body = this.$prepareSuccessResponseBodyObject(body, options);
    }

    if (this.$_canSetInternalData(options)) {
      options.returnData.$resolved = true;
    }

    if (options.actionOptions && options.actionOptions.asResourceResponse) {
      resp.body = body;
      body = resp;
    }

    if (options.actionAttributes && options.actionAttributes.onSuccess) {
      options.actionAttributes.onSuccess(body);
    }

    return body;
  }

  /**
   * Prepare success response body as array
   */
  protected $prepareSuccessResponseBodyArray(body: any[], options: IResourceActionInner): any[] {

    if (!options.actionOptions) {
      throw new Error('$prepareSuccessResponseBodyArray options.actionOptions missing');
    }

    const actionOptions = options.actionOptions;

    body = body
      .filter((item: any) => {
        return actionOptions.filter ? actionOptions.filter.call(this, item, options) : true;
      })
      .map((item: any) => {

        if (actionOptions.map) {
          item = actionOptions.map.call(this, item, options);
        }

        return actionOptions.resultFactory ? actionOptions.resultFactory.call(this, item, options) : item;
      });

    if (options.returnData) {
      Array.prototype.push.apply(options.returnData, body);
      body = options.returnData;
    }

    return body;

  }

  /**
   * Prepare success response body as object
   */
  protected $prepareSuccessResponseBodyObject(body: any, options: IResourceActionInner): any {

    if (!options.actionOptions) {
      throw new Error('$prepareSuccessResponseBodyObject options.actionOptions missing');
    }

    const actionOptions = options.actionOptions;

    if (actionOptions.filter && !actionOptions.filter.call(this, body, options)) {
      return null;
    }

    if (actionOptions.map) {
      body = actionOptions.map.call(this, body, options);
    }

    let newBody = options.returnData;

    if (newBody) {
      if (typeof newBody.$setData === 'function') {
        newBody.$setData(body);
      } else {
        Object.assign(newBody, body);
      }
    } else {
      newBody = actionOptions.resultFactory ? actionOptions.resultFactory.call(this, body, options) : body;
    }

    body = newBody;

    // If it's model
    if (body.$resource) {
      body.$resolved = true;
      body.$promise = options.mainObservable;
      body.$abort = () => true;
    }

    return body;

  }

  /**
   * Handle error
   */
  protected $handleErrorResponse(options: IResourceActionInner, resp: IResourceResponse): any {

    if (options.returnData && this.$_canSetInternalData(options)) {
      options.returnData.$resolved = true;
    }

    if (options.actionAttributes && options.actionAttributes.onError) {
      options.actionAttributes.onError(resp);
    }

    throw resp;
  }

  /**
   * Sets request options url
   */
  protected $setRequestOptionsUrl(options: IResourceActionInner): void {

    const requestOptions = ResourceHelper.getRequestOptionsOrThrow(options);
    const resolvedOptions = ResourceHelper.getResolvedOptionsOrThrow(options);
    const actionAttributes = ResourceHelper.getActionAttributesOrThrow(options);

    if (!requestOptions.url) {
      requestOptions.url =
        (resolvedOptions.url || '') +
        (resolvedOptions.pathPrefix || '') +
        (resolvedOptions.path || '');
    }


    options.usedInPath = {};

    ResourceHelper.setRequestOptionsUrlParams(
      requestOptions,
      resolvedOptions,
      actionAttributes,
      options.usedInPath
    );

    // Removing double slashed from final url
    requestOptions.url = requestOptions.url.replace(/\/\/+/g, '/');
    if (requestOptions.url.startsWith('http')) {
      requestOptions.url = requestOptions.url.replace(':/', '://');
    }

    // Remove trailing slash
    if (options.actionOptions && options.actionOptions.removeTrailingSlash) {
      while (requestOptions.url[requestOptions.url.length - 1] === '/') {
        requestOptions.url = requestOptions.url.substr(0, requestOptions.url.length - 1);
      }
    }

  }

  protected $setRequestOptionsBody(options: IResourceActionInner): void {

    const actionOptions = ResourceHelper.getActionOptionsOrThrow(options);
    const actionAttributes = ResourceHelper.getActionAttributesOrThrow(options);
    const requestOptions = ResourceHelper.getRequestOptionsOrThrow(options);

    let body = actionAttributes.body;

    if (!body) {
      return;
    }

    const realBodyType = ResourceHelper.getRealTypeOf(body);

    let bodyOk: boolean = realBodyType === actionOptions.requestBodyType;

    if (
      !bodyOk &&
      realBodyType === ResourceRequestBodyType.JSON &&
      actionOptions.requestBodyType === ResourceRequestBodyType.FORM_DATA) {

      body = ResourceHelper.createRequestOptionsFormDataBody(body, actionOptions);
      bodyOk = true;

    }

    if (!bodyOk) {
      throw new Error('Can not convert body');
    }

    if (!(body instanceof FormData)) {
      // Add root node if needed
      if (actionOptions.rootNode) {
        const newBody: any = {};
        newBody[actionOptions.rootNode] = body;
        body = newBody;
      }


      if ((actionOptions.requestBodyType === ResourceRequestBodyType.NONE ||
        (actionOptions.requestBodyType === ResourceRequestBodyType.JSON &&
          typeof body === 'object' && Object.keys(body).length === 0)
      ) && !actionOptions.keepEmptyBody) {
        return;
      }

    }

    requestOptions.body = body;

  }

  protected $setRequestOptionsQuery(options: IResourceActionInner): void {

    const actionAttributes = ResourceHelper.getActionAttributesOrThrow(options);
    const resolvedOptions = ResourceHelper.getResolvedOptionsOrThrow(options);
    const requestOptions = ResourceHelper.getRequestOptionsOrThrow(options);
    const actionOptions = ResourceHelper.getActionOptionsOrThrow(options);

    options.usedInPath = options.usedInPath || {};

    let oq = actionAttributes.query || {};
    if (resolvedOptions.query) {
      oq = {...resolvedOptions.query, ...oq};
    }

    if (oq) {
      requestOptions.query = {};
      Object.keys(oq).forEach((key: string) => {
        // tslint:disable-next-line: no-non-null-assertion
        if (oq.hasOwnProperty(key) && !options.usedInPath![key]) {
          this.$appendQueryParams(requestOptions.query as any, key, oq[key], options.queryMappingMethod);
        }
      });
    }

    if (actionOptions.addTimestamp) {
      requestOptions.query = requestOptions.query || {};
      this.$appendQueryParams(
        requestOptions.query,
        actionOptions.addTimestamp as string,
        Date.now().toString(10),
        options.queryMappingMethod);
    }

  }

  protected $appendQueryParams(query: { [prop: string]: string | any[] },
                               key: string,
                               value: any,
                               queryMappingMethod?: ResourceQueryMappingMethod): void {

    ResourceHelper.appendQueryParams(query, key, value, queryMappingMethod);

  }

  protected $_setResourceActionInnerDefaults(options: IResourceActionInner) {

    const actionOptions = ResourceHelper.getActionOptionsOrThrow(options);
    const actionAttributes = ResourceHelper.getActionAttributesOrThrow(options);

    // Setting default request method
    if (!actionOptions.method) {
      actionOptions.method = ResourceRequestMethod.Get;
    }


    if (actionAttributes.body) {

      // Setting default request content type
      if (!actionOptions.requestBodyType) {
        actionOptions.requestBodyType = ResourceHelper.getRealTypeOf(actionAttributes.body);
      }


      // Setting params and query if needed
      if (actionOptions.requestBodyType === ResourceRequestBodyType.JSON &&
        typeof actionAttributes.body === 'object' && !Array.isArray(actionAttributes.body)) {

        if (!actionAttributes.params) {
          actionAttributes.params = actionAttributes.body;
        }

        options.isModel = !!actionAttributes.body.$resource;

      }

    }

    actionAttributes.params = actionAttributes.params || {};

    if (!actionAttributes.query && actionOptions.method === ResourceRequestMethod.Get) {
      actionAttributes.query = actionAttributes.params;
    }

    options.queryMappingMethod = actionOptions.queryMappingMethod || ResourceGlobalConfig.queryMappingMethod;

  }

  // tslint:disable-next-line: cognitive-complexity
  protected $_setResourceActionOptionDefaults(options: IResourceActionInner) {

    const actionOptions = ResourceHelper.getActionOptionsOrThrow(options);

    if (ResourceHelper.isNullOrUndefined(actionOptions.filter)) {
      actionOptions.filter = this.$filter;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.map)) {
      actionOptions.map = this.$map;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.resultFactory)) {
      actionOptions.resultFactory = this.$resultFactory;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.removeTrailingSlash)) {
      actionOptions.removeTrailingSlash = ResourceGlobalConfig.removeTrailingSlash;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.withCredentials)) {
      actionOptions.withCredentials = ResourceGlobalConfig.withCredentials;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.asPromise)) {
      actionOptions.asPromise = ResourceGlobalConfig.asPromise;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.asResourceResponse)) {
      actionOptions.asResourceResponse = ResourceGlobalConfig.asResourceResponse;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.responseBodyType)) {
      actionOptions.responseBodyType = ResourceGlobalConfig.responseBodyType;
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.lean)) {
      actionOptions.lean = !!ResourceGlobalConfig.lean;

      if (actionOptions.mutateBody && !actionOptions.asPromise && ResourceHelper.isNullOrUndefined(actionOptions.lean)) {
        actionOptions.lean = true;
      }
    }

    if (ResourceHelper.isNullOrUndefined(actionOptions.addTimestamp)) {
      actionOptions.addTimestamp = ResourceGlobalConfig.addTimestamp;

      if (actionOptions.addTimestamp && typeof actionOptions.addTimestamp !== 'string') {
        actionOptions.addTimestamp = 'ts';
      }
    }
  }

  protected $_setResolvedOptions(options: IResourceActionInner): Promise<IResourceActionInner> {
    return Promise.all([
      this.$getUrl(options.actionOptions),
      this.$getPathPrefix(options.actionOptions),
      this.$getPath(options.actionOptions),
      this.$getHeaders(options.actionOptions),
      this.$getBody(options.actionOptions),
      this.$getParams(options.actionOptions),
      this.$getQuery(options.actionOptions)
    ])
      .then(([url, pathPrefix, path, headers, body, params, query]: any[]) => {

        options.resolvedOptions = {
          url,
          pathPrefix,
          path,
          headers,
          body,
          params,
          query
        };

        return options;
      });
  }

  protected $_createRequestOptions(options: IResourceActionInner): IResourceActionInner | Promise<IResourceActionInner> {

    const actionOptions = ResourceHelper.getActionOptionsOrThrow(options);
    const resolvedOptions = ResourceHelper.getResolvedOptionsOrThrow(options);

    options.requestOptions = {};

    // Step 1 set main
    options.requestOptions.method = actionOptions.method;
    options.requestOptions.headers = resolvedOptions.headers;
    options.requestOptions.withCredentials = actionOptions.withCredentials;
    options.requestOptions.responseBodyType = actionOptions.responseBodyType;
    options.requestOptions.requestBodyType = actionOptions.requestBodyType;

    // Step 2 create url
    this.$setRequestOptionsUrl(options);

    // Step 3 create body
    this.$setRequestOptionsBody(options);

    // Step 4 set query params
    this.$setRequestOptionsQuery(options);

    return options;
  }

  protected $_canSetInternalData(options: IResourceActionInner): boolean {
    const actionOptions = ResourceHelper.getActionOptionsOrThrow(options);

    return !!(options.returnData && (!actionOptions.lean || options.isModel));
  }

}
