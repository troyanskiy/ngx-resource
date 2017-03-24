import { Http, Request } from '@angular/http';
import { Injector } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { Observable } from 'rxjs/Rx';
import { ResourceGlobalConfig } from './ResourceGlobalConfig';
import { ResourceModel } from './ResourceModel';
import { ResourceParamsBase } from './Interfaces';
import { ResourceActionBase, ResourceResult } from './Interfaces';

export class Resource {

  static model: Type<ResourceModel<Resource>>;

  private _url: string = null;
  private _path: string = null;
  private _headers: any = null;
  private _params: any = null;
  private _data: any = null;

  constructor(protected http: Http, protected injector: Injector) {
    if ((<any>this.constructor).model) {
      (<any>this.constructor).model.resourceInstance = this;
    }
  }

  /**
   * Get main url of the resource
   * @returns {string|Promise<string>}
   */
  getUrl(methodOptions?: ResourceActionBase): string | Promise<string> {
    return this._url || this._getUrl(methodOptions) || ResourceGlobalConfig.url || '';
  }

  /**
   * Set resource url
   * @param url
   */
  setUrl(url: string) {
    this._url = url;
  }

  /**
   * Get path of the resource
   * @returns {string|Promise<string>}
   */
  getPath(methodOptions?: ResourceActionBase): string | Promise<string> {
    return this._path || this._getPath(methodOptions) || ResourceGlobalConfig.path || '';
  }

  /**
   * Set resource path
   * @param path
   */
  setPath(path: string) {
    this._path = path;
  }

  /**
   * Get headers
   * @returns {any|Promise<any>}
   */
  getHeaders(methodOptions?: ResourceActionBase): any | Promise<any> {
    return this._headers || this._getHeaders(methodOptions) || ResourceGlobalConfig.headers || {};
  }

  /**
   * Set resource headers
   * @param headers
   */
  setHeaders(headers: any) {
    this._headers = headers;
  }

  /**
   * Get default params
   * @returns {any|Promise<any>|{}}
   */
  getParams(methodOptions?: ResourceActionBase): any | Promise<any> {
    return this._params || this._getParams(methodOptions) || ResourceGlobalConfig.params || {};
  }

  /**
   * Set default resource params
   * @param params
   */
  setParams(params: any) {
    this._params = params;
  }

  /**
   * Get default data
   * @returns {any|Promise<any>|{}}
   */
  getData(methodOptions?: ResourceActionBase): any | Promise<any> {
    return this._data || this._getData(methodOptions) || ResourceGlobalConfig.data || {};
  }

  /**
   * Set default resource params
   * @param data
   */
  setData(data: any) {
    this._data = data;
  }


  /**
   * That is called before executing request
   * @param req
   */
  requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request {
    return req;
  }

  /**
   * Request observable interceptor
   * @param observable
   * @returns {Observable<any>}
   */
  responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any> {
    return observable.map(res => res._body ? res.json() : null);
  }

  removeTrailingSlash(): boolean {
    return true;
  }

  map(item: any): any {
    return item;
  }

  filter(item: any): boolean {
    return true;
  }

  instantiate(): ResourceResult<any> {
    return {};
  }

  getResourceOptions(): ResourceParamsBase {
    return null;
  }


  protected _request(req: Request, methodOptions: ResourceActionBase = {}): Observable<any> {

    let requestObservable = this.http.request(req);

    // noinspection TypeScriptValidateTypes
    return methodOptions.responseInterceptor ?
      methodOptions.responseInterceptor(requestObservable, req, methodOptions) :
      this.responseInterceptor(requestObservable, req, methodOptions);

  }


  private _getUrl(methodOptions?: ResourceActionBase): string|Promise<string> {
    return null;
  }

  private _getPath(methodOptions?: ResourceActionBase): string|Promise<string> {
    return null;
  }

  private _getHeaders(methodOptions?: ResourceActionBase): any | Promise<any> {
    return null;
  }

  private _getParams(methodOptions?: ResourceActionBase): any | Promise<any> {
    return null;
  }

  private _getData(methodOptions?: ResourceActionBase): any | Promise<any> {
    return null;
  }


}
