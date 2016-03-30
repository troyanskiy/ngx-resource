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

			this.userRes.get()
				.subscribe(
					res => console.log(res),
					err => console.log('Err', err)
				);

		});
	}
}
```
