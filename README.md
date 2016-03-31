# ng2-resource-rest
Resource (REST) Client for Angular 2

To use the module install the module using below command

`npm install ng2-resource-rest --save`

### How to use

***Creating simple resource (./resources/UserRes.ts)***
```javascript
// Import necessary staff
import {Resource, ResourceParams} from "ng2-resouce-rest";
import {Injectable} from "angular2/core";


// Make it Injectable
@Injectable()

// Decorate the your resource class
@ResourceParams({
	// Url to api
	url: 'https://domain.net/api',
	// Api path
	path: '/users/{id}'
})
export class UserRes extends Resource {}
```

***Using in your app. (In the case is Ionic)***
```javascript
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {UserRes} from "./resources/UserRes";
import {RESOURCE_PROVIDERS} from "ng2-resource-rest";

@App({
	templateUrl: 'build/app.html',
	config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
	providers: [
		RESOURCE_PROVIDERS
	]
})
export class MyApp {

	constructor(private platform:Platform, private userRes:UserRes) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
		
			// Will make GET request to https://domain.net/api/users
			this.userRes.get()
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
				
		});
	}
}
```


# Docs (WIP)

##  Build in methods

By default implemented 4 main methods:

1. get(data) to execute GET request;
2. save(data) to execute POST request;
3. update(data) to execute PUT request;
4. remove(data) or delete(data) to execute DELETE request.


## @ResourceParams class decorator
```@ResourceParams(options: ResourceParamsBase)```

The decorator is used to define default resource parameters (can be overwritten with method parameters) and register the class in providers array. @ResourceParams accepts object `ResourceParamsBase` type (description below).


## @ResourceAction method decorator
```@ResourceAction(options: ResourceActionBase)```

Decorates methods. @ResourceAction accepts object `ResourceActionBase` type (description below). All default decorated options will be overwritten for the method.


## Types

### ResourceParamsBase
```javascript
export interface ResourceParamsBase {
	url?:string,
	path?:string,
	headers?:any,
	params?:any,
	data?:any,
	requestInterceptor?:ResourceRequestInterceptor,
	responseInterceptor?:ResourceResponseInterceptor
}
```

#### url
Default resource common address<br>
**Default**: *empty*<br>
**Ex**: https://domain.com/api

#### path
Default resource path to api.<br>
Can contain path params, which are between `{ }`.<br>
If path param is with `!` prefix, then the param is mandatory<br>
**Default**: *empty*<br>
**Ex**: /users/{id}<br>
**Ex2**: /users/{!id}<br>

#### headers
Default resource HTTP headers.<br>
It should be object where key is header name and value is header value<br>
**Default**: 
```javascript
{
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}
```

#### params
Default resource path/get params<br>
**Default**: *null*<br>
**Ex**: ```{"mode": "user", "id": "@_id", "_id": 0}```

#### data
Default resource body params<br>
The params will be added to data object if they does not exists<br>
**Default**: *null*<br>
**Ex**: ```{"mode": "user", "isActive": true}```

#### requestInterceptor
`(req: Request): any;`

Default request interceptor is a function which recieves `Request` object from `anglar2/http`<br>
**Default**: *doing nothing*

#### responseInterceptor
`(observable:Observable<any>):Observable<any>;`

Default responce interceptor is a function which receives `Observable` object from `rxjs/Observable` and returns also `Observable` object.<br>
**Default**: 
```javascript
function (observable:Observable<any>):Observable<any> {
	observable.map(res => res.json());
	return observable;
}
```

<br>

### ResourceActionBase
```javascript
export interface ResourceActionBase extends ResourceParamsBase {
	method:RequestMethod // from angular `angular2/http`
}
```

All parametes will overwrite default one from `ResourceParamsBase`

#### method ***is mondatory***
Http request method of the action.<br>
**Ex**: method: RequestMethod.Get



<br>


> Note: For all non GET request all data object will be send in the request body as json.
> In case of GET requset the data object will be send as query parameters. Parameters, which are has been used for path params, will be removed from query list (only for GET request).



<br><br><br>

# Examples

**Using in your app. (In the case is Ionic)**
```javascript
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {UserRes} from "./resources/UserRes";
import {RESOURCE_PROVIDERS} from "ng2-resource-rest";

@App({
	templateUrl: 'build/app.html',
	config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
	providers: [
		RESOURCE_PROVIDERS
	]
})
export class MyApp {

	constructor(private platform:Platform, private userRes:UserRes) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {

			StatusBar.styleDefault();

			// Will make GET request to https://domain.net/api/users
			this.userRes.get()
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
				
			// Will make GET request to https://domain.net/api/users/1
			this.userRes.get({id: 1})
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
				
				
			// Will make GET request to https://domain.net/api/users?firstName=John
			this.userRes.get({firstName: 'John'})
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make POST request to https://domain.net/api/users
			// with stringify json data in the body
			this.userRes.save({firstName: 'John', lastName: 'Smith'})
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make POST request to https://domain.net/api/users/1
			// with stringify json data in the body
			this.userRes.save({id: 1, firstName: 'John', lastName: 'Smith'})
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make PUT request to https://domain.net/api/users/1
			// with stringify json data in the body
			this.userRes.update({id: 1, firstName: 'John', lastName: 'Smith'})
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make DELETE request to https://domain.net/api/users/1
			this.userRes.remove({id: 1}) // also alias is availabe to this.userRes.delete
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
				
		});
	}
}
```


**Creating simple resource with custom methods (./resources/UserRes.ts)**
```javascript
// Import necessary staff
import {Resource, ResourceParams, ResourceAction} from "ng2-resouce-rest";
import {Injectable} from "angular2/core";
import {RequestMethod} from "angular2/http";
import {Observable} from "rxjs/Observable";


// Make it Injectable
@Injectable()

// Decorate the your resource class
@ResourceParams({
	// Url to api
	url: 'https://domain.net/api',
	// Api path
	path: '/users/{id}'
})
export class UserRes extends Resource {

	@ResourceAction({
		method: RequestMethod.Post, // Mondatory field
		path: '/auth' // Will overwrite default path
	})
	login(data:any): Observable<any> { return null; }

}

// Using in your app
// Will make POST request to https://domain.net/api/auth with stringify json data in the body
this.userRes.login({login: 'login', password: 'password'}) 
	.subscribe(
		res => console.log(res),
		err => console.log('Err', err)
	);

```

