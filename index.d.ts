import { Provider } from "angular2/core";
import { Http, Request, RequestMethod } from "angular2/http";
import { Observable } from "rxjs/Observable";
export interface ResourceRequestInterceptor {
    (req: Request): any;
}
export interface ResourceResponseInterceptor {
    (observable: Observable<any>): Observable<any>;
}
export interface ResourceParamsBase {
    url?: string;
    path?: string;
    headers?: any;
    params?: any;
    data?: any;
    requestInterceptor?: ResourceRequestInterceptor;
    responseInterceptor?: ResourceResponseInterceptor;
}
export interface ResourceActionBase extends ResourceParamsBase {
    method: RequestMethod;
}
export declare class Resource {
    protected http: Http;
    constructor(http: Http);
    protected requestInterceptor(req: Request): void;
    protected responseInterceptor(observable: Observable<any>): Observable<any>;
    getUrl(): string;
    getPath(): string;
    getHeaders(): any;
    getParams(): any;
    getData(): any;
    get(data?: any): Observable<any>;
    save(data?: any): Observable<any>;
    update(data?: any): Observable<any>;
    remove(data?: any): Observable<any>;
    delete(data?: any): Observable<any>;
}
export declare function ResourceAction(action?: ResourceActionBase): (target: Resource, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare let RESOURCE_PROVIDERS: Provider[];
export declare function ResourceProvide(): Function;
export declare function ResourceParams(params: ResourceParamsBase): (target: Function) => void;
