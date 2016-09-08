[![npm version](https://badge.fury.io/js/ng2-resource-rest.svg)](http://badge.fury.io/js/ng2-resource-rest)
# ng2-resource-rest
Resource (REST) Client for Angular 2 RC6

To use the module install the module using below command

`npm install ng2-resource-rest --save`



### How to use

***Creating simple resource CRUD (./resources/NewsRes.ts)***
```ts
import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
import {RequestMethod} from '@angular/http';

interface IQueryInput {
  dateFrom?: string;
  dateTo?: string;
  isRead?: string;
}

interface INewsShort {
  id: number;
  date: string;
  title: string;
  text: string;
}

interface INews extends INewsShort {
  image: string;
  fullText: string;
}

@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/users'
})
export class NewsRes extends Resource {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<IQueryInput, INewsShort[]>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, INews>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<INews, INews>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<INews, INews>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;

  // Alias to save
  create(data: INews, callback?: (res: INews) => any): INews {
    return this.save(data, callback);
  }
  
}
```

Or it is possible to use predefined CRUD resource which will to exactly the same as resource above
``` ts
@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/users'
})
export class NewRes extends ResourceCRUD<IQueryInput, INewsShort, INews> {}
```

***Using in your app. (In the case is Ionic)***
```javascript
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {UserRes} from "./resources/UserRes";
import {ResourceProviders} from "ng2-resource-rest";

@App({
	templateUrl: 'build/app.html',
	config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
	providers: [
		ResourceProviders.main()
	]
})
export class MyApp {

	allUsers: any[];

	constructor(private platform:Platform, private userRes:UserRes) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
		
			// Will make GET request to https://domain.net/api/users
			this.userRes.get()
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
				
			this.allUsers = this.userRes.query();
			
			this.allUsers1 = this.userRes.query(() => {
				// Called after setting the data
				console.log(this.allUsers1);
			});
			
			this.allUsers2 = this.userRes.query({name: 'Roman'}, () => {
				// Called after setting the data
				console.log(this.allUsers2);
			});
			
				
		});
	}
}
```


# Docs (WIP)

##  Build in methods

By default implemented 5 main methods:

1. get(data, callback) to execute GET request;
2. query(data, callback) to execute GET and recieve an array
3. save(data, callback) to execute POST request;
4. update(data, callback) to execute PUT request;
5. remove(data, callback) or delete(data, callback) to execute DELETE request.


## @ResourceProvide class decorator
```@ResourceParams()```

The decorator is used to create provider for the resource and push it to RESOURCE_PROVIDERS


## @ResourceParams class decorator
```@ResourceParams(options: ResourceParamsBase)```

The decorator is used to define default resource parameters (can be overwritten with method parameters). @ResourceParams accepts object `ResourceParamsBase` type (description below).


## @ResourceAction method decorator
```@ResourceAction(options: ResourceActionBase)```

Decorates methods. @ResourceAction accepts object `ResourceActionBase` type (description below). All default decorated options will be overwritten for the method.


## Types

### ResourceParamsBase
```javascript
export interface ResourceParamsBase {
	url?:string;
	path?:string;
	headers?:any;
	params?:any;
	data?:any;
	requestInterceptor?:ResourceRequestInterceptor;
	responseInterceptor?:ResourceResponseInterceptor;
	add2Provides?: boolean;
	removeTrailingSlash?: boolean;
	providersSubSet?: string;
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
`(observable:Observable<any>, request?:Request):Observable<any>;`

Default response interceptor is a function which receives `Observable` object from `rxjs/Observable` and returns also `Observable` object.<br>
**Default**: 
```javascript
function (observable:Observable<any>):Observable<any> {
	return observable.map(res => res._body ? res.json() : null);
}
```

#### add2Provides
To create provider the class and it to ResourceProviders.main()<br>
**Default**: true

#### removeTrailingSlash
Remove trailing slashed from url<br>
**Default**: true<br>

#### providersSubSet
To create provider the class and it to ResourceProviders.subSet(<providersSubSet>)<br>
**Default**: true<br>

<br>

### ResourceActionBase
```javascript
export interface ResourceActionBase extends ResourceParamsBase {
	method:RequestMethod, // from angular `@angular/http`
	isArray: boolean,
	isLazy: boolean
}
```

All parametes will overwrite default one from `ResourceParamsBase`

#### method ***is mandatory***
Http request method of the action.<br>
**Ex**: method: RequestMethod.Get


#### isArray
Used if received data is an array


#### isLazy
Is `isLazy` set to true, then the request will not be executed immediately. To execute the request you should subsribe to abservable and hande responces by yourself. 


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
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			// OR
			let user = this.userRes.get();
				
			// Will make GET request to https://domain.net/api/users/1
			this.userRes.get({id: 1})
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			// OR
			user = this.userRes.get({id: 1});
			
			// Will return an array
			let usersList = <any[]>this.userRes.query();
				
				
			// Will make GET request to https://domain.net/api/users?firstName=John
			this.userRes.get({firstName: 'John'})
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make POST request to https://domain.net/api/users
			// with stringify json data in the body
			this.userRes.save({firstName: 'John', lastName: 'Smith'})
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make POST request to https://domain.net/api/users/1
			// with stringify json data in the body
			this.userRes.save({id: 1, firstName: 'John', lastName: 'Smith'})
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make PUT request to https://domain.net/api/users/1
			// with stringify json data in the body
			this.userRes.update({id: 1, firstName: 'John', lastName: 'Smith'})
				.$observable
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);
			
			// Will make DELETE request to https://domain.net/api/users/1
			this.userRes.remove({id: 1}) // also alias is availabe to this.userRes.delete
				.$observable
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
import {Resource, ResourceParams, ResourceAction, ResourceResult} from "ng2-resouce-rest";
import {Injectable} from "@angular/core";
import {RequestMethod} from "@angular/http";


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
		method: RequestMethod.Post, // Mandatory field
		path: '/auth' // Will overwrite default path
	})
	login(data:any, callback?:Function): ResourceResult { return null; }
	
	
	@ResourceAction({
		method: RequestMethod.Get, // Mandatory field
		path: '/list', // Will overwrite default path
		isArray: true
	})
	list(data?:any, callback?:Function): ResourceResult { return null; }

}

// Using in your app
// Will make POST request to https://domain.net/api/auth with stringify json data in the body
this.userRes.login({login: 'login', password: 'password'}) 
	.$observable
	.subscribe(
		res => console.log(res),
		err => console.log('Err', err)
	);

// Assign the data directly
let activeUsers = this.userRes.list({isActive: true});

// Using promises
this.userRes.login({login: 'login', password: 'password'}) 
	.$observable
	.toPromise()
	.then(function(resp){
		console.log(resp);
	})
	.catch(function(err) {
		console.error(err);
	});

```

