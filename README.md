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


# Docs

##  Build in methods

By default implemented 4 main methods:

1. get(data) to execute GET request;
2. save(data) to execute POST request;
3. update(data) to execute PUT request;
4. remove(data) or delete(data) to execute DELETE request.

> Note: For all non GET request all data object will be send in the request body as json.
> In case of GET requset the data object will be send as query parameters. Parameters, which are has been used for path params, will be removed from query list (only for GET request).





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

