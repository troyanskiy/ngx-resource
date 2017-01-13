import { Http, Request } from '@angular/http';
import { Injector } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { Observable } from 'rxjs/Rx';
import { ResourceGlobalConfig } from './ResourceGlobalConfig';
import { ResourceModel } from './ResourceModel';
import { ResourceParamsBase } from './Interfaces';
import { ResourceActionBase } from './Interfaces';

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
  getUrl(): string | Promise<string> {
    return this._url || this._getUrl() || ResourceGlobalConfig.url || '';
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
  getPath(): string | Promise<string> {
    return this._path || this._getPath() || ResourceGlobalConfig.path || '';
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
  getHeaders(): any | Promise<any> {
    return this._headers || this._getHeaders() || ResourceGlobalConfig.headers || {};
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
  getParams(): any | Promise<any> {
    return this._params || this._getParams() || ResourceGlobalConfig.params || {};
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
  getData(): any | Promise<any> {
    return this._data || this._getData() || ResourceGlobalConfig.data || {};
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
  requestInterceptor(req: Request): Request {
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

  getResourceOptions(): ResourceParamsBase {
    return null;
  }


  private _getUrl(): string|Promise<string> {
    return null;
  }

  private _getPath(): string|Promise<string> {
    return null;
  }

  private _getHeaders(): any | Promise<any> {
    return null;
  }

  private _getParams(): any | Promise<any> {
    return null;
  }

  private _getData(): any | Promise<any> {
    this.getResourceOptions();
    return null;
  }


}
