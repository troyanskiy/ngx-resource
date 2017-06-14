import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, Response, URLSearchParams } from '@angular/http';
import { RequestArgs } from '@angular/http/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';


import { ResourceGlobalConfig, TGetParamsMappingType } from './ResourceGlobalConfig';
import { ResourceModel } from './ResourceModel';
import {
  ResourceActionBase,
  ResourceParamsBase,
  ResourceResponseFilter,
  ResourceResponseInitResult,
  ResourceResponseMap,
  ResourceResult
} from './Interfaces';


@Injectable()
export class Resource {

  static $cleanDataFields: string[] = [
    '$cleanDataFields',
    '$resolved',
    '$observable',
    '$abortRequest',
    '$resource'
  ];

  private $url: string = null;
  private $path: string = null;
  private $headers: any = null;
  private $params: any = null;
  private $data: any = null;

  constructor(protected http: Http) {
  }

  static $cleanData(obj: ResourceResult<any>): any {

    for (let propName in obj) {

      if ((obj[propName] instanceof Function) || this.$cleanDataFields.indexOf(propName) > -1) {
        delete obj[propName];
      }

    }

    return obj;
  }


  /**
   * Get main url of the resource
   * @returns {string|Promise<string>}
   */
  $getUrl(methodOptions?: ResourceActionBase): string | Promise<string> {
    return this.$url || this.$_getUrl(methodOptions) || ResourceGlobalConfig.url || '';
  }

  /**
   * Set resource url
   * @param url
   */
  $setUrl(url: string) {
    this.$url = url;
  }

  /**
   * Get path of the resource
   * @returns {string|Promise<string>}
   */
  $getPath(methodOptions?: ResourceActionBase): string | Promise<string> {
    return this.$path || this.$_getPath(methodOptions) || ResourceGlobalConfig.path || '';
  }

  /**
   * Set resource path
   * @param path
   */
  $setPath(path: string) {
    this.$path = path;
  }

  /**
   * Get headers
   * @returns {any|Promise<any>}
   */
  $getHeaders(methodOptions?: ResourceActionBase): any | Promise<any> {
    return this.$headers || this.$_getHeaders(methodOptions) || ResourceGlobalConfig.headers || {};
  }

  /**
   * Set resource headers
   * @param headers
   */
  $setHeaders(headers: any) {
    this.$headers = headers;
  }

  /**
   * Get default params
   * @returns {any|Promise<any>|{}}
   */
  $getParams(methodOptions?: ResourceActionBase): any | Promise<any> {
    return this.$params || this.$_getParams(methodOptions) || ResourceGlobalConfig.params || {};
  }

  /**
   * Set default resource params
   * @param params
   */
  $setParams(params: any) {
    this.$params = params;
  }

  /**
   * Get default data
   * @returns {any|Promise<any>|{}}
   */
  $getData(methodOptions?: ResourceActionBase): any | Promise<any> {
    return this.$data || this.$_getData(methodOptions) || ResourceGlobalConfig.data || {};
  }

  /**
   * Set default resource params
   * @param data
   */
  $setData(data: any) {
    this.$data = data;
  }

  /**
   * Create the model
   *
   * @returns {any}
   */
  $createModel(): ResourceModel<any> {
    let ret = this.$initResultObject();
    ret.$resource = this;
    return ret;
  }


  /**
   * That is called before executing request
   * @param req
   */
  protected $requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request {
    return req;
  }

  /**
   * Request observable interceptor
   * @param observable
   * @returns {Observable<any>}
   */
  protected $responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any> {
    return observable.map(res => res._body ? res.json() : null);
  }

  // removeTrailingSlash(): boolean {
  //   return true;
  // }

  protected $initResultObject(methodOptions: ResourceActionBase = null): any {
    return {};
  }

  protected $map(item: any): any {
    return item;
  }

  protected $filter(item: any): boolean {
    return true;
  }

  protected $getResourceOptions(): ResourceParamsBase {
    return null;
  }

  protected $request(req: Request, methodOptions: ResourceActionBase = {}): Observable<any> {

    let requestObservable = this.http.request(req);

    // noinspection TypeScriptValidateTypes
    return methodOptions.responseInterceptor ?
      methodOptions.responseInterceptor(requestObservable, req, methodOptions) :
      this.$responseInterceptor(requestObservable, req, methodOptions);

  }

  protected $resourceAction(data: any, params: any, callback: () => any, methodOptions: ResourceActionBase): ResourceResult<any> | ResourceModel<Resource> {

    const shell: IResourceActionShell = <IResourceActionShell>{
      returnInternal: this.$_createReturnData(data, methodOptions),
      data: data,
      params: params,
      options: methodOptions,
      callback: callback
    };

    shell.returnExternal = methodOptions.lean ? this.$_createReturnData(data, methodOptions) : shell.returnInternal;

    this.$_cleanData(shell);
    this.$_fillInternal(shell);

    this.$_mainRequest(shell);


    return shell.returnExternal;

  }

  private $_createReturnData(data: any, methodOptions: ResourceActionBase): ResourceResult<any> | ResourceModel<Resource> {

    if (methodOptions.isLazy) {
      return {};
    }

    if (methodOptions.isArray) {
      return [];
    }

    if (methodOptions.lean || !data || data.$resource !== this) {
      return this.$_initResultObject(methodOptions);
    }

    return data;

  }

  private $_initResultObject(methodOptions: ResourceActionBase): ResourceResponseInitResult {
    return methodOptions.initResultObject ? methodOptions.initResultObject() : this.$initResultObject(methodOptions);
  }

  private $_map(methodOptions: ResourceActionBase): ResourceResponseMap {
    return methodOptions.map ? methodOptions.map : this.$map;
  }

  private $_filter(methodOptions: ResourceActionBase): ResourceResponseFilter {
    return methodOptions.filter ? methodOptions.filter : this.$filter;
  }

  private $_cleanData(shell: IResourceActionShell) {

    if (shell.data && !shell.options.skipDataCleaning) {
      shell.data = shell.data.toJSON ? shell.data.toJSON() : Resource.$cleanData(shell.data);
    }

  }

  private $_fillInternal(shell: IResourceActionShell) {

    const returnInternal = shell.returnInternal;

    returnInternal.$resolved = false;

    returnInternal.$observable = Observable.create((subscriber: Subscriber<any>) => {
      shell.mainDeferredSubscriber = subscriber;
    }).flatMap(() => shell.mainObservable);

    returnInternal.$abortRequest = () => {
      returnInternal.$resolved = true;
    };

    returnInternal.$resource = this;

    if (!shell.options.isLazy) {
      returnInternal.$observable = returnInternal.$observable.publish();
      (<ConnectableObservable<any>>returnInternal.$observable).connect();
    }

  }

  private $_mainRequest(shell: IResourceActionShell) {

    this.$_resolveMainOptions(shell)
      .then((extraOptions: IResourceActionMainOptions) => {

        shell.extraOptions = extraOptions;

        if (shell.returnInternal.$resolved) {
          shell.mainObservable = Observable.create((subscriber: Subscriber<any>) => {
            subscriber.next(null);
          });

          this.$_releaseMainDeferredSubscriber(shell);
          return;
        }

        shell.url = extraOptions.url + extraOptions.path;

        this.$_prepareDataParams(shell);
        this.$_prepareBody(shell);
        this.$_prepareSearch(shell);
        this.$_createRequestOptions(shell);

        let mainRequest = new Request(shell.requestOptions);

        mainRequest = shell.options.requestInterceptor ?
          shell.options.requestInterceptor(mainRequest, shell.options) :
          this.$requestInterceptor(mainRequest, shell.options);

        if (!mainRequest) {
          shell.mainObservable = Observable.create((observer: any) => {
            observer.error(new Error('Request is null'));
          });

          console.warn('Request is null');

          this.$_releaseMainDeferredSubscriber(shell);
          return;
        }

        // Doing the request
        const requestObservable = this.$request(mainRequest, shell.options);

        shell.mainObservable = shell.options.isLazy ? requestObservable : this.$_createMainObservable(shell, requestObservable);

        this.$_releaseMainDeferredSubscriber(shell);

      });

  }

  private $_resolveMainOptions(shell: IResourceActionShell): Promise<IResourceActionMainOptions> {
    return Promise
      .all([
        Promise.resolve(shell.options.url || this.$getUrl(shell.options)),
        Promise.resolve(shell.options.path || this.$getPath(shell.options)),
        Promise.resolve(shell.options.headers || this.$getHeaders(shell.options)),
        Promise.resolve(shell.options.params || this.$getParams(shell.options)),
        Promise.resolve(shell.options.data || this.$getData(shell.options))
      ])
      .then((data: any[]) => {

        return <IResourceActionMainOptions> {
          url: data[0],
          path: data[1],
          headers: new Headers(data[2] ? Object.assign({}, data[2]) : data[2]),
          params: data[3] ? Object.assign({}, data[3]) : data[3],
          data: data[4]
        };
      });
  }

  private $_releaseMainDeferredSubscriber(shell: IResourceActionShell) {
    if (shell.mainDeferredSubscriber) {
      shell.mainDeferredSubscriber.next();
      shell.mainDeferredSubscriber.complete();
      shell.mainDeferredSubscriber = null;
    }
  }

  private $_prepareDataParams(shell: IResourceActionShell) {

    const usedPathParams: any = {};
    shell.usedPathParams = usedPathParams;

    if (!Array.isArray(shell.data) || shell.params) {

      if (!Array.isArray(shell.data)) {
        shell.data = Object.assign({}, shell.extraOptions.data, shell.data);
      }

      const pathParams = shell.url.match(/{([^}]*)}/g) || [];

      for (let i = 0; i < pathParams.length; i++) {
        let pathParam = pathParams[i];

        let pathKey = pathParam.substr(1, pathParam.length - 2);
        let isMandatory = pathKey[0] === '!';
        if (isMandatory) {
          pathKey = pathKey.substr(1);
        }

        let isGetOnly = pathKey[0] === ':';
        if (isGetOnly) {
          pathKey = pathKey.substr(1);
        }

        let value = this.$_getValueForPath(pathKey, shell.extraOptions.params, shell.params || shell.data, usedPathParams);
        if (isGetOnly && !shell.params) {
          delete shell.data[pathKey];
        }

        if (this.$_isNullOrUndefined(value)) {
          if (isMandatory) {

            let consoleMsg = `Mandatory ${pathParam} path parameter is missing`;

            shell.mainObservable = Observable.create((observer: any) => {
              observer.error(new Error(consoleMsg));
            });

            console.warn(consoleMsg);

            this.$_releaseMainDeferredSubscriber(shell);
            throw new Error(consoleMsg);

          }
          shell.url = shell.url.substr(0, shell.url.indexOf(pathParam));
          break;
        }

        // Replacing in the url
        shell.url = shell.url.replace(pathParam, value);
      }

    }

    // Removing double slashed from final url
    shell.url = shell.url.replace(/\/\/+/g, '/');
    if (shell.url.startsWith('http')) {
      shell.url = shell.url.replace(':/', '://');
    }

    // Remove trailing slash
    if (typeof shell.options.removeTrailingSlash === 'undefined') {
      shell.options.removeTrailingSlash = true;
    }
    if (shell.options.removeTrailingSlash) {
      while (shell.url[shell.url.length - 1] === '/') {
        shell.url = shell.url.substr(0, shell.url.length - 1);
      }
    }

    // Remove mapped params
    for (let key in shell.extraOptions.params) {
      if (shell.extraOptions.params[key][0] === '@') {
        delete shell.extraOptions.params[key];
      }
    }

  }

  private $_prepareBody(shell: IResourceActionShell) {

    if (shell.options.method === RequestMethod.Get) {
      // GET
      shell.searchParams = Object.assign({}, shell.extraOptions.params, shell.data);
    } else {
      // NON GET
      if (shell.data) {
        let _body: any = {};
        if (shell.options.rootNode) {
          _body[`${shell.options.rootNode}`] = shell.data;
        } else {
          _body = shell.data;
        }
        shell.body = JSON.stringify(_body);
      }
      shell.searchParams = shell.params;
    }

    if (!shell.body) {
      shell.extraOptions.headers.delete('content-type');
    }

  }

  private $_prepareSearch(shell: IResourceActionShell) {
    shell.search = new URLSearchParams();

    if (!shell.params) {
      for (let key in shell.searchParams) {
        if (shell.searchParams.hasOwnProperty(key) && !shell.usedPathParams[key]) {
          let value: any = shell.searchParams[key];
          this.$_appendSearchParams(shell.search, key, value);
        }
      }
    }

    let tsName = shell.options.addTimestamp;
    if (tsName) {
      if (tsName === true) {
        tsName = 'ts';
      }
      shell.search.append(tsName, '' + Date.now());
    }

  }

  private $_createRequestOptions(shell: IResourceActionShell) {
    shell.requestOptions = <RequestArgs>{
      method: shell.options.method,
      headers: shell.extraOptions.headers,
      body: shell.body,
      url: shell.url,
      withCredentials: shell.options.withCredentials
    };

    if (shell.options.angularV2) {
      shell.requestOptions.search = shell.search;
    } else {
      shell.requestOptions.params = shell.search;
    }

  }

  private $_createMainObservable(shell: IResourceActionShell, requestObservable: Observable<Response>): Observable<any> {

    return Observable.create((subscriber: Subscriber<any>) => {

      let reqSubscr: Subscription = requestObservable.subscribe(
        (resp: any) => {

          const filter = this.$_filter(shell.options);
          const map = this.$_map(shell.options);

          if (resp !== null) {

            if (shell.options.isArray) {

              // Expecting array

              if (!Array.isArray(resp)) {
                console.error('Returned data should be an array. Received', resp);
              } else {

                shell.returnExternal.push(
                  ...resp
                    .filter(filter)
                    .map(map)
                    .map((respItem: any) => {
                      if (!shell.options.lean) {
                        respItem.$resource = this;
                      }
                      return this.$_setDataToObject(this.$_initResultObject(shell.options), respItem);
                    })
                );

              }

            } else {

              // Expecting object

              if (Array.isArray(resp)) {
                console.error('Returned data should be an object. Received', resp);
              } else {

                if (filter(resp)) {

                  this.$_setDataToObject(shell.returnExternal, map(resp));

                }

              }
            }
          }

          shell.returnInternal.$resolved = true;
          subscriber.next(shell.returnExternal);

        },
        (err: any) => subscriber.error(err),
        () => {
          shell.returnInternal.$resolved = true;
          subscriber.complete();
          if (shell.callback) {
            shell.callback(shell.returnExternal);
          }
        }
      );

      shell.returnInternal.$abortRequest = () => {
        if (shell.returnInternal.$resolved) {
          return;
        }
        reqSubscr.unsubscribe();
        shell.returnInternal.$resolved = true;
      };

    });

  }

  private $_setDataToObject(ret: any, resp: any): any {

    if (ret.$setData) {
      ret.$setData(resp);
    } else {
      if (Array.isArray(resp)) {
        ret = resp;
      } else {
        Object.assign(ret, resp);
      }
    }

    return ret;

  }

  private $_getValueForPath(key: string, params: any, data: any, usedPathParams: any): string {

    if (!this.$_isNullOrUndefined(data[key]) && typeof data[key] !== 'object') {
      usedPathParams[key] = true;
      return data[key];
    }

    if (this.$_isNullOrUndefined(params[key])) {
      return null;
    }

    if (params[key][0] === '@') {
      return this.$_getValueForPath(params[key].substr(1), params, data, usedPathParams);
    }

    usedPathParams[key] = true;
    return params[key];

  }

  private $_isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  private $_appendSearchParams(search: URLSearchParams, key: string, value: any): void {
    /// Convert dates to ISO format string
    if (value instanceof Date) {
      search.append(key, value.toISOString());
      return;
    }

    if (typeof value === 'object') {

      switch (ResourceGlobalConfig.getParamsMappingType) {

        case TGetParamsMappingType.Plain:

          if (Array.isArray(value)) {
            for (let arr_value of value) {
              search.append(key, arr_value);
            }
          } else {

            if (value && typeof value === 'object') {
              /// Convert dates to ISO format string
              if (value instanceof Date) {
                value = value.toISOString();
              } else {
                value = JSON.stringify(value);
              }
            }
            search.append(key, value);

          }
          break;

        case TGetParamsMappingType.Bracket:
          /// Convert object and arrays to query params
          for (let k in value) {
            if (value.hasOwnProperty(k)) {
              this.$_appendSearchParams(search, key + '[' + k + ']', value[k]);
            }
          }
          break;
      }

      return;
    }


    search.append(key, value);

  }

  /**
   * Get url to be replaced by ResourceParamsBase
   *
   * @param methodOptions
   * @returns { any | Promise<any>}
   * @private
   */
  private $_getUrl(methodOptions?: ResourceActionBase): string | Promise<string> {
    return null;
  }

  /**
   * Get get path to be replaced by ResourceParamsBase
   *
   * @param methodOptions
   * @returns { any | Promise<any>}
   * @private
   */
  private $_getPath(methodOptions?: ResourceActionBase): string | Promise<string> {
    return null;
  }

  /**
   * Get headers to be replaced by ResourceParamsBase
   *
   * @param methodOptions
   * @returns { any | Promise<any>}
   * @private
   */
  private $_getHeaders(methodOptions?: ResourceActionBase): any | Promise<any> {
    return null;
  }

  /**
   * Get params to be replaced by ResourceParamsBase
   *
   * @param methodOptions
   * @returns { any | Promise<any>}
   * @private
   */
  private $_getParams(methodOptions?: ResourceActionBase): any | Promise<any> {
    return null;
  }

  /**
   * Get data to be replaced by ResourceParamsBase
   *
   * @param methodOptions
   * @returns { any | Promise<any>}
   * @private
   */
  private $_getData(methodOptions?: ResourceActionBase): any | Promise<any> {
    return null;
  }


}


interface IResourceActionShell {
  url?: string;
  body?: string;
  search?: URLSearchParams;
  searchParams?: any;
  usedPathParams?: any;
  returnInternal?: ResourceResult<any> | ResourceModel<Resource>;
  returnExternal?: ResourceResult<any> | ResourceModel<Resource>;
  data?: any;
  params?: any;
  options?: ResourceActionBase;
  mainDeferredSubscriber?: Subscriber<any>;
  mainObservable?: Observable<Response>;
  extraOptions?: IResourceActionMainOptions;
  requestOptions?: RequestArgs;
  callback?: (data?: any) => any;
}

interface IResourceActionMainOptions {
  url: string;
  path: string;
  headers: Headers;
  params: any;
  data: any;
}
