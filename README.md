# ng2-resource-rest
Resource (REST) Client for Angular 2

To use the module install the module using below command

`npm install ng2-resource-rest --save`

**Creating simple resource (./resources/UserRes.ts)**
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
