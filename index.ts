import {Inject, provide, Provider} from "angular2/core";
import {Http, Request, RequestMethod, Headers, RequestOptions, Response, URLSearchParams} from "angular2/http";
import {Observable} from "rxjs/Observable";



export interface ResourceRequestInterceptor {
	(req: Request): any;
}

export interface ResourceResponseInterceptor {
	(observable:Observable<any>):Observable<any>;
}

export interface ResourceParamsBase {
	url?:string,
	path?:string,
	headers?:any,
	params?:any,
	requestInterceptor?:ResourceRequestInterceptor,
	responseInterceptor?:ResourceResponseInterceptor
}

export interface ResourceActionBase extends ResourceParamsBase {
	method:RequestMethod
}


export class Resource {

	constructor(@Inject(Http) protected http:Http) {}

	protected requestInterceptor(req:Request) {}

	protected responseInterceptor(observable:Observable<any>):Observable<any> {
		observable.map(res => res.json());
		return observable;
	}

	getUrl():string {
		return '';
	}

	getPath():string {
		return '';
	}

	getHeaders():any {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
	}

	getParams():any {
		return null;
	}



	@ResourceAction({
		method: RequestMethod.Get
	})
	get(data?:any):Observable<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Post
	})
	save(data?:any):Observable<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Put
	})
	update(data?:any):Observable<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Delete
	})
	remove(data?:any):Observable<any> {
		return null;
	}


	delete(data?:any):Observable<any> {
		return this.remove(data);
	}

}


function parseUrl(url):any[] {
	let params = [];
	let index:number = url.indexOf('{');
	let lastIndex:number;
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



export function ResourceAction(action?:ResourceActionBase) {
	return function (target: Resource, propertyKey: string, descriptor: PropertyDescriptor) {

		descriptor.value = function(...args: any[]) {
			console.log(args);

			let isGetRequest = action.method === RequestMethod.Get;

			// Creating URL
			let url:string =
				(action.url ? action.url : this.getUrl()) +
				(action.path ? action.path : this.getPath());

			// Creating Headers
			let headers = new Headers(action.headers || this.getHeaders());

			// Setting data
			let data = args.length ? args[0] : null;
			let params = Object.assign({}, action.params || this.getParams() || null);

			let mapParam = {};

			// Merging default params with data
			for (let key in params) {
				if (typeof params[key] == 'string' && params[key][0] == '@') {
					mapParam[key] = params[key];
					delete params[key];
				}
			}

			let usedPathParams = {};

			// Parsing url for params
			var pathParams = parseUrl(url);

			for (let i=0; i<pathParams.length; i++) {

				let param = pathParams[i];

				let key:string = param.substr(1, param.length-2);
				let value:string = null;
				let isMandatory = key[0] == '!';
				if (isMandatory) {
					key = key.substr(1);
				}

				// Do we have mapped path param key
				if (mapParam[key]) {
					key = mapParam[key].substr(1);
				}

				// Getting value from data body
				if (data && data[key] && !(data[key] instanceof Object)) {
					value = data[key];
					usedPathParams[key] = value;
				}

				// Getting default value from params
				if (!value && params[key] && !(params[key] instanceof Object)) {
					value = params[key];
					usedPathParams[key] = value;
				}

				// Well, all is bad and setting value to empty string
				if (!value) {
					if (isMandatory) {
						return Observable.create(observer => {
							observer.onError(new Error('Mandatory '+param+' path parameter is missing'));
						});
					}
					url = url.substr(0, url.indexOf(param));
					break;
				}

				// Replacing in the url
				url = url.replace(param, value);

			}


			// Removing doulble slashed from final url
			let urlParts: string[] = url.split('//').filter(val => val !== '');
			url = urlParts[0];
			if (urlParts.length > 1) {
				url += '//' + urlParts.slice(1).join('/');
			}


			// Default search params or data

			let body = null;

			let searchParams;
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


			let search:URLSearchParams = new URLSearchParams();
			for (let key in searchParams) {
				if (!usedPathParams[key]) {
					let value = searchParams[key];
					if (value instanceof Object) {
						value = JSON.stringify(value);
					}
					search.append(key, value);
				}
			}




			let requestOptions = new RequestOptions({
				method: action.method,
				headers: headers,
				body: body,
				url: url,
				search: search
			});

			let req = new Request(requestOptions);

			if (action.requestInterceptor) {
				action.requestInterceptor(req);
			} else {
				this.requestInterceptor(req);
			}

			let observable: Observable<Response> = this.http.request(req);

			return action.responseInterceptor ?
				action.responseInterceptor(observable) : this.responseInterceptor(observable);

		}

	};
}


export let RESOURCE_PROVIDERS:Provider[] = [];

export function ResourceParams(params:ResourceParamsBase) {

	return function (target: Function) {

		RESOURCE_PROVIDERS.push(provide(target, {
			useFactory: (http: Http) => new target(http),
			deps: [Http]
		}));

		if (params.url) {
			target.prototype.getUrl = function() {
				return params.url;
			};
		}

		if (params.path) {
			target.prototype.getPath = function () {
				return params.path;
			};
		}

		if (params.headers) {
			target.prototype.getHeaders = function () {
				return params.headers;
			};
		}

		if (params.params) {
			target.prototype.getParams = function () {
				return params.params;
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