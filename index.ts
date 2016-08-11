import "rxjs/add/operator/map";
import "rxjs/add/operator/publish";
import {Inject} from "@angular/core";
import {
	Http, Request, RequestMethod, Headers, RequestOptions, Response, URLSearchParams
} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {ConnectableObservable} from "rxjs/observable/ConnectableObservable";
import {Subscriber} from "rxjs";

declare var Object: {
	assign: any;
};


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

export interface ArrayResourceResult<T> extends ResourceResult, Array<T> {}


export class Resource {

	constructor( @Inject(Http) protected http: Http) { }

	protected requestInterceptor(req: Request) { }

	protected responseInterceptor(observable: Observable<any>): Observable<any> {
		return observable.map(res => res._body ? res.json() : null);
	}

	removeTrailingSlash(): boolean {
		return true;
	}

	getUrl(): string | Promise<string> {
		return '';
	}

	getPath(): string | Promise<string> {
		return '';
	}

	getHeaders(): any | Promise<any> {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
	}

	getParams(): any {
		return null;
	}

	getData(): any {
		return null;
	}



	@ResourceAction({
		method: RequestMethod.Get
	})
	get(data?: any, callback?: Function): ResourceResult {
		return null;
	}

	@ResourceAction({
		method: RequestMethod.Get,
		isArray: true
	})
	query(data?: any, callback?: Function): ArrayResourceResult<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Post
	})
	save(data?: any, callback?: Function): ResourceResult {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Put
	})
	update(data?: any, callback?: Function): ResourceResult {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Delete
	})
	remove(data?: any, callback?: Function): ResourceResult {
		return null;
	}


	delete(data?: any, callback?: Function): ResourceResult {
		return this.remove(data, callback);
	}

}



function parseUrl(url:string): string[] {
	let params: string[] = [];
	let index: number = url.indexOf('{');
	let lastIndex: number;
	while (index > -1) {
		lastIndex = url.indexOf('}', index);
		if (lastIndex == -1) {
			return params;
		}
		lastIndex++;
		params.push(url.substring(index, lastIndex));
		index = url.indexOf('{', lastIndex);
	}

	return params;
}



export function ResourceAction(action?: ResourceActionBase) {
	return function(target: Resource, propertyKey: string, descriptor: PropertyDescriptor) {

		descriptor.value = function(...args: any[]):ResourceResult {

			let isGetRequest = action.method === RequestMethod.Get;

			let ret: ResourceResult;

			if (action.isLazy) {
				ret = {};
			} else {
				ret = action.isArray ? [] : {};
			}

			let deferredSubscriber: Subscriber<any> = null;
			let mainObservable:Observable<Response> = null;

			ret.$resolved = false;
			ret.$observable = Observable.create((subscriber:Subscriber<any>) => {
				deferredSubscriber = subscriber;
			}).flatMap(() => mainObservable);

			Promise.all([
				Promise.resolve(action.url || this.getUrl()),
				Promise.resolve(action.path || this.getPath()),
				Promise.resolve(action.headers || this.getHeaders())
			])
			.then((dataAll:any[]) => {

				let url:string = dataAll[0] + dataAll[1];
				let headers = new Headers(dataAll[2]);

				let data = args.length ? args[0] : null;
				let callback = args.length > 1 ? args[1] : null;
				if (typeof data === 'function') {
					if (!callback) {
						callback = data;
						data = null;
					} else if (typeof callback !== 'function') {
						let tmpData = callback;
						callback = data;
						data = tmpData;
					} else {
						data = null;
					}

				}
				let params = Object.assign({}, action.params || this.getParams());

				// Setting default data parameters
				let defData = action.data || this.getData();
				if (defData) {
					if (!data) {
						data = defData;
					} else {
						data = Object.assign(defData, data);
					}
				}



				// Splitting map params
				let mapParam: { [key: string]: string } = {};
				for (let key in params) {
					if (typeof params[key] == 'string' && params[key][0] == '@') {
						mapParam[key] = params[key];
						delete params[key];
					}
				}

				let usedPathParams: { [key: string]: string } = {};

				// Parsing url for params
				var pathParams = parseUrl(url);

				for (let i = 0; i < pathParams.length; i++) {

					let param = pathParams[i];

					let key: string = param.substr(1, param.length - 2);
					let value: string = null;
					let isMandatory = key[0] == '!';
					if (isMandatory) {
						key = key.substr(1);
					}

					// Do we have mapped path param key
					if (mapParam[key]) {
						key = mapParam[key].substr(1);
					}

					// Getting value from data body
					if (data && data[key] && (typeof data[key] != 'object')) {
						// if (data && data[key] && !(data[key] instanceof Object)) {
						value = data[key];
						usedPathParams[key] = value;
					}

					// Getting default value from params
					if (!value && params[key] && (typeof params[key] != 'object')) {
						// if (!value && params[key] && !(params[key] instanceof Object)) {
						value = params[key];
						usedPathParams[key] = value;
					}

					// Well, all is bad and setting value to empty string
					if (!value) {
						// Checking if it's mandatory param
						if (isMandatory) {

							mainObservable = Observable.create((observer:any) => {
								observer.onError(new Error('Mandatory ' + param + ' path parameter is missing'));
							});

							deferredSubscriber.next();
							deferredSubscriber.complete();
							deferredSubscriber = null;
							return;

							// return <Observable<any>> Observable.create((observer:any) => {
							// 	observer.onError(new Error('Mandatory ' + param + ' path parameter is missing'));
							// });
						}
						url = url.substr(0, url.indexOf(param));
						break;
					}

					// Replacing in the url
					url = url.replace(param, value);

				}


				// Removing double slashed from final url
				let urlParts: string[] = url.split('//').filter(val => val !== '');
				url = urlParts[0];
				if (urlParts.length > 1) {
					url += '//' + urlParts.slice(1).join('/');
				}

				// Remove trailing slash
				if (typeof action.removeTrailingSlash === "undefined") {
					action.removeTrailingSlash = this.removeTrailingSlash;
				}
				if (action.removeTrailingSlash) {
					while (url[url.length-1] == '/') {
						url = url.substr(0, url.length-1);
					}
				}


				// Default search params or data

				let body: string = null;

				let searchParams: { [key: string]: string };
				if (isGetRequest) {
					// GET
					searchParams = Object.assign({}, params, data);
				} else {
					// NON GET
					if (data) {
						body = JSON.stringify(data);
					}
					searchParams = params;
				}

				// Setting search params
				let search: URLSearchParams = new URLSearchParams();
				for (let key in searchParams) {
					if (!usedPathParams[key]) {
						let value:any = searchParams[key];
						if (typeof value == 'object') {
							// if (value instanceof Object) {
							value = JSON.stringify(value);
						}
						search.append(key, value);
					}
				}

				if (!body) {
					headers.delete('content-type');
				}

				// Creating request options
				let requestOptions = new RequestOptions({
					method: action.method,
					headers: headers,
					body: body,
					url: url,
					search: search
				});

				// Creating request object
				let req = new Request(requestOptions);

				if (action.requestInterceptor) {
					action.requestInterceptor(req);
				} else {
					this.requestInterceptor(req);
				}

				// Doing the request
				mainObservable = this.http.request(req);

				mainObservable = action.responseInterceptor ?
					action.responseInterceptor(mainObservable, req) : this.responseInterceptor(mainObservable, req);

				if (!action.isLazy) {

          mainObservable = mainObservable.publish();
					(<ConnectableObservable<any>>mainObservable).connect();

          mainObservable.subscribe(
						resp => {

							if (resp === null) {
								return;
							}

							if (action.isArray) {
								if (!Array.isArray(resp)) {
									console.error('Returned data should be an array. Received', resp);
									return;
								}
								Array.prototype.push.apply(ret, resp);
							} else {
								if (Array.isArray(resp)) {
									console.error('Returned data should be an object. Received', resp);
									return;
								}
								Object.assign(ret, resp);
							}

						},
						err => {},
						() => {
							ret.$resolved = true;
							if (callback) {
								callback(ret);
							}
						}
					);
				}

        deferredSubscriber.next();
        deferredSubscriber.complete();
        deferredSubscriber = null;

			});

			return ret;

		}

	};
}


export let RESOURCE_PROVIDERS: any[] = [];
export let RESOURCE_PROVIDERS_SUBSET: {[id:string] :any[]} = {};

export class ResourceProviders {
	static main(): any[] {
		return RESOURCE_PROVIDERS;
	}
	static subSet(name:string):any[] {
		return RESOURCE_PROVIDERS_SUBSET[name] || [];
	}
}


export function ResourceParams(params: ResourceParamsBase) {

	return function(target: { new (http: Http): Resource }) {

		let providersList:any[] = null;

		if (params.add2Provides !== false) {
			if (params.providersSubSet) {
				if (!RESOURCE_PROVIDERS_SUBSET[params.providersSubSet]) {
					RESOURCE_PROVIDERS_SUBSET[params.providersSubSet] = [];
				}
				providersList = RESOURCE_PROVIDERS_SUBSET[params.providersSubSet];
			} else {
				providersList = RESOURCE_PROVIDERS;
			}

			providersList.push({
				provide: target,
				useFactory: (http: Http) => new target(http),
				deps: [Http]
			});

		}

		if (typeof params.removeTrailingSlash !== 'undefined') {
			target.prototype.removeTrailingSlash = function() {
				return !!params.removeTrailingSlash;
			};
		}

		if (params.url) {
			target.prototype.getUrl = function() {
				return params.url;
			};
		}

		if (params.path) {
			target.prototype.getPath = function() {
				return params.path;
			};
		}

		if (params.headers) {
			target.prototype.getHeaders = function() {
				return params.headers;
			};
		}

		if (params.params) {
			target.prototype.getParams = function() {
				return params.params;
			};
		}

		if (params.data) {
			target.prototype.getData = function() {
				return params.data;
			};
		}

		if (params.requestInterceptor) {
			target.prototype.requestInterceptor = params.requestInterceptor;
		}

		if (params.responseInterceptor) {
			target.prototype.responseInterceptor = params.responseInterceptor;
		}

	};
}
