/// <reference path="node_modules/@types/es6-shim/index.d.ts" />
import "rxjs/add/operator/map";
import "rxjs/add/operator/publish";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
export interface ResourceRequestInterceptor {
    (req: Request): any;
}
export interface ResourceResponseInterceptor {
    (observable: Observable<any>, request?: Request): Observable<any>;
}
export interface ResourceParamsBase {
    url?: string;
    path?: string;
    headers?: any;
    params?: any;
    data?: any;
    requestInterceptor?: ResourceRequestInterceptor;
    responseInterceptor?: ResourceResponseInterceptor;
    add2Provides?: boolean;
    providersSubSet?: string;
    removeTrailingSlash?: boolean;
}
export interface ResourceActionBase extends ResourceParamsBase {
    method: RequestMethod;
    isArray?: boolean;
    isLazy?: boolean;
}
export interface ResourceResult {
    $resolved?: boolean;
    $observable?: Observable<any>;
}
export interface ArrayResourceResult<T> extends ResourceResult, Array<T> {
}
export declare class Resource {
    protected http: Http;
    constructor(http: Http);
    protected requestInterceptor(req: Request): void;
    protected responseInterceptor(observable: Observable<any>): Observable<any>;
    removeTrailingSlash(): boolean;
    getUrl(): string | Promise<string>;
    getPath(): string | Promise<string>;
    getHeaders(): any | Promise<any>;
    getParams(): any;
    getData(): any;
    get(data?: any, callback?: Function): ResourceResult;
    query(data?: any, callback?: Function): ArrayResourceResult<any>;
    save(data?: any, callback?: Function): ResourceResult;
    update(data?: any, callback?: Function): ResourceResult;
    remove(data?: any, callback?: Function): ResourceResult;
    delete(data?: any, callback?: Function): ResourceResult;
}
export declare function ResourceAction(action?: ResourceActionBase): (target: Resource, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare let RESOURCE_PROVIDERS: any[];
export declare let RESOURCE_PROVIDERS_SUBSET: {
    [id: string]: any[];
};
export declare class ResourceProviders {
    static main(): any[];
    static subSet(name: string): any[];
}
export declare function ResourceParams(params: ResourceParamsBase): (target: new (http: Http) => Resource) => void;
