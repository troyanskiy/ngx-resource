/// <reference types="es6-shim" />
import "reflect-metadata";
import { Http, Request } from "@angular/http";
import { Injector } from "@angular/core";
import { Type } from "@angular/core/src/type";
import { Observable } from "rxjs";
import { ResourceModel } from "./ResourceModel";
export declare class Resource {
    protected http: Http;
    protected injector: Injector;
    static model: Type<ResourceModel>;
    private _url;
    private _path;
    private _headers;
    private _params;
    private _data;
    constructor(http: Http, injector: Injector);
    /**
     * Get main url of the resource
     * @returns {string|Promise<string>}
     */
    getUrl(): string | Promise<string>;
    /**
     * Set resource url
     * @param url
     */
    setUrl(url: string): void;
    /**
     * Get path of the resource
     * @returns {string|Promise<string>}
     */
    getPath(): string | Promise<string>;
    /**
     * Set resource path
     * @param path
     */
    setPath(path: string): void;
    /**
     * Get headers
     * @returns {any|Promise<any>}
     */
    getHeaders(): any | Promise<any>;
    /**
     * Set resource headers
     * @param headers
     */
    setHeaders(headers: any): void;
    /**
     * Get default params
     * @returns {any|Promise<any>|{}}
     */
    getParams(): any | Promise<any>;
    /**
     * Set default resource params
     * @param params
     */
    setParams(params: any): void;
    /**
     * Get default data
     * @returns {any|Promise<any>|{}}
     */
    getData(): any | Promise<any>;
    /**
     * Set default resource params
     * @param data
     */
    setData(data: any): void;
    /**
     * That is called before executing request
     * @param req
     */
    requestInterceptor(req: Request): Request;
    /**
     * Request observable interceptor
     * @param observable
     * @returns {Observable<any>}
     */
    responseInterceptor(observable: Observable<any>, req: Request): Observable<any>;
    removeTrailingSlash(): boolean;
    map(item: any): any;
    filter(item: any): boolean;
    private _getUrl();
    private _getPath();
    private _getHeaders();
    private _getParams();
    private _getData();
}
