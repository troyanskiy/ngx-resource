import {Inject, provide, Provider} from "angular2/core";
import {Http, Request, RequestMethod, Headers, RequestOptions, Response, URLSearchParams} from "angular2/http";
import {Observable} from "rxjs/Observable";



export interface ResourceParamsBase {
	url?:string,
	path?:string,
	headers?:any,
	params?:any
}

export interface ResourceActionBase extends ResourceParamsBase {
	method:RequestMethod,
	isArray?:boolean
}

export class Resource {

	static urlRegex:RegExp = new RegExp('{.*(.*)}','gm');

	constructor(@Inject(Http)
							protected http:Http) {
	}

	protected requestInterceptor(req:Request) {
	}

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
		return null;
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
	public save(data?:any):Observable<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Get,
		isArray: true
	})
	public query(data?:any):Observable<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Delete
	})
	public remove(data?:any):Observable<any> {
		return null;
	}


	@ResourceAction({
		method: RequestMethod.Delete
	})
	public delete(data?:any):Observable<any> {
		return null;
	}

}


export function ResourceAction(action?:ResourceActionBase) {
	return function (target: Resource, propertyKey: string, descriptor: PropertyDescriptor) {
		// console.log('ResourceAction target: ', target);
		// console.log('ResourceAction propertyKey: ', propertyKey);
		// console.log('ResourceAction descriptor: ', descriptor);

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
			let data = args.length ? args[0] : {};

			let params = action.params || this.getParams() || {};

			// Parsing url for params
			url.match(Resource.urlRegex)
				.map(param => {

					let key:string = param.substr(1, param.length-2);
					let value:string = null;

					// Do we have mapped path param key
					if (params[key] && params[key][0] == '@') {
						key = params[key].substr(1);
					}

					// Getting value from data body
					if (data[key] && !(data[key] instanceof Object)) {
						value = data[key];
						if (!isGetRequest) {
							delete data[key];
						}
					}

					// If we don't have value, check default value
					if (!value && params[key]) {
						value = params[key];
					}

					// Well, all is bad and setting value to empty string
					value = value || '';

					console.log(param, key, value);

					// Replacing in the url
					url = url.replace(param, value);

				});


			// Default search params
			// TODO generate new data
			let search:URLSearchParams;
			if (params)

			if (isGetRequest) {
				search = new URLSearchParams();
			}



			let requestOptions = new RequestOptions({
				method: action.method,
				headers: headers,
				body: data ? JSON.stringify(data) : null,
				url: url,
				search: search
			});

			let req = new Request(requestOptions);

			this.requestInterceptor(req);
			let observable: Observable<Response> = this.http.request(req);
			observable = this.responseInterceptor(observable);

			return observable;

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

		target.prototype.getUrl = function() {
			return params.url || '';
		};

		target.prototype.getPath = function() {
			return params.path || '';
		};

		target.prototype.getHeaders = function() {
			return params.headers || null;
		};

		target.prototype.getParams = function() {
			return params.params || null;
		};

	};
}