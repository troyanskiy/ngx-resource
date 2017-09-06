[![npm version](https://badge.fury.io/js/ngx-resource.svg)](http://badge.fury.io/js/ngx-resource)

[![NPM](https://nodei.co/npm/ngx-resource.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ngx-resource/)

# ngx-resource
Resource (REST) Client for Angular 2

To use the module install the module using below command

`npm install ngx-resource --save`

### How to use articles
Good explanation how to use the library in the article "[Angular2, a rest client interface](http://blog.slals.net/programming/2017/01/12/angular2-a-rest-client-interface.html)" by [Jonathan Serra](https://github.com/Slaals)

### How to use

***Creating simple resource CRUD (./resources/NewsRes.ts)***
```ts
import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ngx-resource';
import {RequestMethod} from '@angular/http';

interface IQueryInput {
  page?: number;
  perPage?: number;
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
  image?: string;
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
    path: '/{!id}'
  })
  get2: ResourceMethodStrict<INews, {id: any}, INews>;

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

Or it is possible to use predefined CRUD resource which will do exactly the same as resource above
``` ts
@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/users'
})
export class NewRes extends ResourceCRUD<IQueryInput, INewsShort, INews> {}
```

***Using in your app.***

First of all need to add Resource Module to your app Module. Simply
import ResourceModule.forRoot() to your all root module

```ts
@NgModule({
  imports: [
    BrowserModule,
    ResourceModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Then inject resource into your components
```ts
import {Component, OnInit} from '@angular/core';
import {NewsRes} from '../../resources/index';

@Component({
  moduleId: module.id,
  selector: 'news-component',
  templateUrl: 'news.page.component.html',
  styleUrls: ['news.page.component.css'],
})
export class PageComponent implements OnInit {

  newList: INewsShort[] = [];

  constructor(private newsRes:NewsRes) {}

  ngOnInit():any {

    // That will execute GET request https://domain.net/api/users
    // and after will assign the data to this.newsList
    this.newList = this.newsRes.query();

    // Execute GET request https://domain.net/api/users?page=1&perPage=20
    this.newList = this.newsRes.query({page: 1, perPage: 20});

    // Execute GET request https://domain.net/api/users/12
    // and assing the data to oneNews variable
    let oneNews = this.newsRes.get({id: 12});

    // or
    let otherOneNews: INews = null;
    this.newsRes.get({id: 12}, (receivedNews: INews) => {
      otherOneNews = receivedNews;
      // do some magic after receiving news
    });

    // or :)
    let otherSomeNews = this.newsRes.get({id: 12});
    otherSomeNews
      .$observable
      .subscribe(
        (receivedNews: INews) => {
          otherOneNews = receivedNews;
          // do some magic after receiving news
        }
      );

    // Also you can cancel the requests
    let news = this.newsRes.get({id: 12});
    news.$abortRequest();

    // That kind of ways with callback, $observable and $abortRequest
    // can be used on all methods


    // Creating the news
    let newNews:INews = {
      date: '17.06.2016',
      title: 'The great day',
      text: 'The best day ever',
      fullText: 'Should be full text here';
    }
    // That will execute the POST request to https://domain.net/api/users
    // Expected to receive created news object which will be assigned to newNews
    let newNews = this.newsRes.save(newNews);

    // and so on

  }
}
```

***QueryParams Conversion***

You can define the way query params are converted
Set the global config at the root of your app.

`ResourceGlobalConfig.getParamsMappingType = TGetParamsMappingType.<CONVERTION_STRATEGY>`

```
{
  a: [{ b:1, c: [2, 3] }]
}
```

With `<CONVERTION_STRATEGY>` being an enumerable within

#### Plain (default)
No convertion at all. 

Output: `?a=[Object object]`

#### Bracket
All array elements will be indexed

Output: `?a[0][b]=10383&a[0][c][0]=2&a[0][c][1]=3`

#### JQueryParamsBracket 
Implements the standard $.params way of converting

Output: `?a[0][b]=10383&a[0][c][]=2&a[0][c][]=3`


# Changes

## Version 3.5.0
Added `JQueryParamsBracket` method to convert query params

## Version 3.4.0
Added `toObservable` flag to ResourceAction or ResourceParam to get observable directly from method<br>
Method type `ResourceMethodObservable<I, O>` should be used

## Version 3.3.0
Added `bodySerializer` method to implement custom data serializer

## Version 3.2.0
Added `toPromise` flag to ResourceAction or ResourceParam to get promise directly from method<br>
Method type `ResourceMethodPromise<I, O>` should be used

## Version 3.1.0
Added path prefix param `pathPrefix`

## Version 3.0.2
Added angular v2 support by setting flag `angularV2` on `ResourceParams` to `true`. Fixes #116.

## Version 3.0.0
1. Breaking changes on Resource class. All methods and properties starts from `$` in order to split users 
methods and Resource methods (starts from `$`):
- `getUrl` -> `$getUrl`
- `setUrl` -> `$setUrl`
- `getPath` -> `$getPath`
- `setPath` -> `$setPath`
- `getHeaders` -> `$getHeaders`
- `setHeaders` -> `$setHeaders`
- `getParams` -> `$getParams`
- `setParams` -> `$setParams`
- `getData` -> `$getData`
- `setData` -> `$setData`
- `createModel` -> `$createModel`
- `requestInterceptor` -> `$requestInterceptor`
- `responseInterceptor` -> `$responseInterceptor`
- `initResultObject` -> `$initResultObject`
- `map` -> `$map`
- `filter` -> `$filter`
- `getResourceOptions` -> `$getResourceOptions`
- `_request` -> `$request`

2. Added new flag `lean` to resource params or action. Will prevent adding `$` variables to result. Fixes #110

3. Removed full import of `rxjs/Rx`. Might broke your app, if need some extra operators or something else, 
import them in your app. Fixes #111 

4. Removed deprecated static method `create` from `ResourceModel` class

## Version 2.2.1
Fixes #108

## Version 2.2.0
Added ODATA support.

## Version 2.1.0
1. (Breaking) Removed Injector from Resource class constructor
2. Added `cleanData` method to resource to remove from some predefined by response/create model methods/properties from data  

## Version 2.0.0
Support Angular 4

#### Breaking
ResourceModel is simplified.

New model migration steps:
1. Model Class
    1. Remove model decorator.
    1. Remove `static resourceClass`.
    1. If you have data `id` different then default `id`, then overwrite method `protected isNew(): boolean`.
    `Create` resource method will be used if `isNew()` return's `true`, otherwise `update` method will be called.
    1. Static `create` method does not exists anymore. Please use `myResource.createModel()`.
1. Model's resource class
    1. Remove `static model`
    1. Overwrite default `initResultObject()` resource method. Normally it should just contain `return new MyModel()`

Please check bellow the example.


## Version 1.14.0 (Removed broken chance from ver 1.13.0)
Added resource method `initResultObject` which is used to create return object or items in returned array.<br>
The method should return object. If method `$setData` exists on the return object, then it will be called with
received data, so the method is kind of constructor to set received data. If method does not exists on the
object, then Object.assign will be used to set received data. See example below.


## Version 1.13.0 (Might Broke)
`map` method is used to create main return object<br>
`map` method will be called with `null` as data in order to create initial object
and again will be called with real data after receiving.

See example of usage below

## Version 1.12.0

Added possibility to switch array/object mapping to get params.
For now it's possible to switch between 2 ways of mapping, which are:
- `TGetParamsMappingType.Plain` (default and old behavior)<br>
`params: ['one', 'two']` will be mapped to `/some/url/?params=one&params=two`
- `TGetParamsMappingType.Braket` (proposed by [PR #87](https://github.com/troyanskiy/ng2-resource-rest/pull/87))<br>
`params: ['one', 'two']` will be mapped to `/some/url?params[0]=one&params[1]=two`<br>
`params: { data: ['one', 'two'] }` will be mapped to `/some/url?params[data][0]=one&params[data][1]=two`

## Version 1.11.0

Added protected method _request to Resource class. Can be used to replace default http requests with custom one.


# Docs (WIP)

## @ResourceParams class decorator
```@ResourceParams(options: ResourceParamsBase)```

The decorator is used to define default resource parameters (can be overwritten with method parameters).
@ResourceParams accepts object `ResourceParamsBase` type (description below).


## @ResourceAction method decorator
```@ResourceAction(options: ResourceActionBase)```

Decorates methods. @ResourceAction accepts object `ResourceActionBase` type (description below).
All default decorated options will be overwritten for the method.


## Types

### `ResourceMethod<I, O>`
Resource method type with specified `input data type` as `I` and `output data type` as `O`<br>
In fact it's a function type (input?: I, callback?: (res: O) => void): ResourceResult<O>

### `ResourceMethodStrict<IB, IP, O>`
Resource method type with specified  `input body data type` as `IB`, `input path data type` as `IP` and `output data type` as `O`<br>
In fact it's a function type (body?: IB, params?: IP, callback?: (res: O) => any): ResourceResult<O>
`ResourceMethodStrict` developed in purpose to respove [issue #76](https://github.com/troyanskiy/ng2-resource-rest/issues/76)


### `ResourceResult<R>`
Every request method is returning given data type which is extended by `ResourceResult`
```ts
export type ResourceResult<R extends {}> = R & {
  $resolved?: boolean; // true if request has been executed
  $observable?: Observable<R>; // Observable for the request
  $abortRequest?: () => void; // method to abort pending request
}
```

### `ResourceParamsCommon`
```javascript
export interface ResourceParamsCommon {
	url?:string;
	pathPrefix?:string;
	path?:string;
	headers?:any;
	params?:any;
	data?:any;
	removeTrailingSlash?: boolean;
	addTimestamp?: boolean | string;
	withCredentials?: boolean;
	lean?: boolean;
  angularV2?: boolean;
  toPromise?: boolean;
  toObservable?: boolean;
  bodySerializer?(body: any): string;
	[propName: string]: any;
}
```

#### `url`
Default resource common address<br>
**Default**: *empty*<br>
**Ex**: https://domain.com/api

#### `pathPrefix`
Default resource path prefix to api.<br>
url + pathPrefix + path

#### `path`
Default resource path to api.<br>
Can contain path params, which are between `{ }`.<br>
If path param is with `!` prefix, then the param is mandatory<br>
If path param is with `:` prefix, then the param will be removed from post data<br>
**Default**: *empty*<br>
**Ex**: /users/{id}<br>
**Ex2**: /users/{!id}<br>
**Ex3**: /users/{:id}<br>
**Ex4**: /users/{!:id}<br>

#### `headers`
Default resource HTTP headers.<br>
It should be object where key is header name and value is header value<br>
**Default**:
```javascript
{
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}
```

#### `params`
Default resource path/get params<br>
**Default**: *null*<br>
**Ex**: ```{"mode": "user", "id": "@_id", "_id": 0}```

#### `data`
Default resource body params<br>
The params will be added to data object if they does not exists<br>
**Default**: *null*<br>
**Ex**: ```{"mode": "user", "isActive": true}```

#### `removeTrailingSlash`
Remove trailing slashed from url<br>
**Default**: true<br>

#### `addTimestamp`
Will add timestamp to the url<br>
Can be boolean or string representation of parameter name<br>
**Default**: false<br>

#### `withCredentials`
Will add withCredentials option to request options<br>
**Default**: false<br>

#### `angularV2`
Use the flag for angular version 2

#### `toPromise`
To return promise directly from resource method

#### `toObservable`
To return observable directly from resource method. The observable will be `lazy` by default if `isLazy` is not specified.

#### `bodySerializer`
Custom method to serialise data body


### `ResourceParamsBase`
```javascript
export interface ResourceParamsBase extends ResourceParamsCommon {
	add2Provides?: boolean;
	providersSubSet?: string;
}
```

#### `add2Provides`
To create service provider and it to ResourceModule.forRoot()<br>
**Default**: true<br>

#### `providersSubSet`
To create service provider and it to ResourceModule.forChild(<providersSubSet>)<br>
**Default**: null (so it goes to forRoot())<br>



### `ResourceActionBase`
```javascript
export interface ResourceActionBase extends ResourceParamsCommon {
	method?:RequestMethod; // from angular `@angular/http`
	isArray?: boolean;
	isLazy?: boolean;
  requestInterceptor?: ResourceRequestInterceptor;
  responseInterceptor?: ResourceResponseInterceptor;
  initResultObject?: ResourceResponseInitResult;
  map?: ResourceResponseMap;
  filter?: ResourceResponseFilter;
  rootNode?: string;
  skipDataCleaning?: boolean;
}
```

All parameters will overwrite default one from `ResourceParamsBase`

#### `method`
Http request method of the action.<br>
**Ex**: method: RequestMethod.Get
**Default**: method: RequestMethod.Get


#### `isArray`
Used if received data is an array


#### `isLazy`
Is `isLazy` set to true, then the request will not be executed immediately. To execute the request you should subscribe to observable and handle responses by yourself.

#### `requestInterceptor`
`(req: Request): Request;`

Custom request modifier for the method<br>
Default request interceptor is a function which recieves `Request` object from `anglar2/http`<br>
**Default**: *doing nothing*

#### `responseInterceptor`
`(observable:Observable<any>, request?:Request, methodOptions?: ResourceActionBase):Observable<any>;`

Custom response interceptor for the method<br>
Default response interceptor is a function which receives `Observable` object from `rxjs/Observable` and returns also `Observable` object.<br>
**Default**:
```javascript
function (observable:Observable<any>):Observable<any> {
	return observable.map(res => res._body ? res.json() : null);
}
```

#### `initResultObject`
`(): any;`

Custom object creator. Added on Ver 1.14.0

#### `map`
`(item: any):any;`

Custom response data mapper.<br>
Will be called for each array element if response is an array.<br>
Will called for the object if response is an object<br>
Called before mapping data

#### `filter`
`(item: any):boolean;`

Custom response filter.<br>
Will be called for each array element if response is an array.<br>
Will called for the object if response is an object<br>
Called before map method

#### `rootNode`
The data sent to the API will be wrapped into the root node provided

#### `skipDataCleaning`
Every time before making the request the data object is cleaned from `ResourceModel` system variables which are staring
with `$` prefix or toJSON function will be called if it exists on data object.<br>
By setting the flag to `true` the object will not be cleaned from system variables.

<br>


> Note: For all non GET request all data object will be send in the request body as json.
> In case of GET requset the data object will be send as query parameters. Parameters, which are has been used for path params, will be removed from query list (only for GET request).

## `Resource` class

### Default methods

#### `$getUrl(methodOptions?: ResourceActionBase): string | Promise<string>`
To get url. Used in methods.

#### `$setUrl(url: string)`
To set resource url

#### `$getPath(methodOptions?: ResourceActionBase): string | Promise<string>`
To get path. Used in methods

#### `$setPath(path: string)`
To set resource path

#### `$getHeaders(methodOptions?: ResourceActionBase): any | Promise<any>`
To get headers. Used in methods.

#### `$setHeaders(headers: any)`
To set resource headers

#### `$getParams(methodOptions?: ResourceActionBase): any | Promise<any>`
To get params. Used in methods.

#### `$setParams(params: any)`
To set resource params

#### `$getData(methodOptions?: ResourceActionBase): any | Promise<any>`
To get data. Used in methods.

#### `$setData(data: any)`
To set resource data

#### `$bodySerializer(body: any): string`
To serialize the data before send. Default `JSON.stringify`

#### `$requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request`
Default request interceptor

#### `$responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any>`
Default response interceptor

#### `$removeTrailingSlash(): boolean`
Called by method if needs to trim trailing slashes from final url

#### `$initResultObject(): any`
Called on return object initialization

#### `$map(item: any): any<any>`
Default response mapper

#### `$filter(item: any): boolean`
Default filter method. By default always `true`

#### `$cleanData(obj: ResourceResult<any>): any`
Default object cleaning.
Returns clean from functions and (`$resolved`, `$observable`, `$abortRequest`, `$resource`) variables


## `ResourceCRUD` class

The class is extends with Resource and has predefined 5 methods:

1. get(data, callback) to execute GET request;
2. query(data, callback) to execute GET and recieve an array
3. save(data, callback) to execute POST request;
4. update(data, callback) to execute PUT request;
5. remove(data, callback) or delete(data, callback) to execute DELETE request.

## `ResourceGlobalConfig` class

Static class to define global common params for all Resources globally

#### `ResourceGlobalConfig.url: string | Promise<string> = null`
Defines url

#### `ResourceGlobalConfig.path: string | Promise<string> = null`
Defines path

#### `ResourceGlobalConfig.headers: any | Promise<any> = null`
Defines headers

#### `ResourceGlobalConfig.params: any | Promise<any> = null`
Defines params

#### `ResourceGlobalConfig.add2Provides: boolean = null`
Defines global default `add2Providers` flag

#### `ResourceGlobalConfig.lean: boolean = null`
Defines global default `lean` flag

#### `ResourceGlobalConfig.toPromise: boolean = null`
Defines global default `toPromise` flag

#### `ResourceGlobalConfig.toObservable: boolean = null`
Defines global default `toObservable` flag

#### `ResourceGlobalConfig.data: any | Promise<any> = null`
Defines data

#### `ResourceGlobalConfig.getParamsMappingType: any = TGetParamsMappingType.Plain`
Defines mapping method of arrays/objects to get params


## Priority of getting params by methods

Lower number - higher priority

1. Defined by @ResourceAction decorator
2. Sett by setUrl method of the resource
3. Defined by @ResourceParams decorator
4. Defined in ResourceGlobalConfig
5. Default value

## ODATA

[OData](http://www.odata.org) (Open Data Protocol) is an OASIS standard that defines a set of best practices for building and consuming RESTful APIs.

This module also includes a class for dealing with ODATA endpoints.

```ts
import {ResourceODATA, ResourceODATAParams} from 'ngx-resource';


@ResourceODATAParams({entity: News, name: "News"})
export class NewsResource extends ResourceODATA<News> {
}
```

Then when using this resource you already can use the following predefined methods:

 - newsResource.get({id: 1})
 - newsResource.save(news)
 - newsResource.search({"$filter": "ODATA filter expression", "$search": "search string", "$expand": "comma separated list of fields to include in response", "$limit": "count limit for results"})

For more information please check out the [standard](http://www.odata.org/documentation/odata-version-2-0/uri-conventions/).

More capabilities will be added in the future.


## Example of auth resource service with custom headers


### `AuthGuardResource`
```ts
import {Request, Response} from '@angular/http';
import {Observable, Subscriber} from 'rxjs';
import {AuthServiceHelper} from '../helpers/index';
import {Resource} from 'ngx-resource';

export class AuthGuardResource extends Resource {

  private deferredQ: Subscriber<any>[] = [];
  private configListenerSet: boolean = false;

  $getHeaders(methodOptions: any): any {
    let headers = super.$getHeaders();

    // Extending our headers with Authorization
    if (!methodOptions.noAuth) {
      headers = AuthServiceHelper.extendHeaders(headers);
    }

    return headers;
  }

  $responseInterceptor(observable: Observable<any>, request: Request, methodOptions: ResourceActionBase): Observable<any> {

    return Observable.create((subscriber: Subscriber<any>) => {

      observable.subscribe(
        (res: Response) => {
          if (res.headers) {
            let newToken: string = res.headers.get('X-AUTH-TOKEN');
            if (newToken) {
              AuthServiceHelper.token = newToken;
            }
          }
          subscriber.next((<any>res)._body ? res.json() : null);
        },
        (error: Response) => {
          if (error.status === 401) {
            AuthServiceHelper.token = null;
          }
          //console.warn('BaseResource request error', error, request);
          subscriber.error(error);
        },
        () => subscriber.complete()
      );

    });
  }

}
```


### `AuthResource`
```ts
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { AppProject } from '../../project/app.project';
import { ResourceAction, ResourceMethod, ResourceParams } from 'ngx-resource';
import { AuthGuardResource } from './authGuard.resource';


@Injectable()
@ResourceParams({
  url: AppProject.BASE_URL + '/auth/v1'
})
export class AuthResource extends AuthGuardResource {

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/login',
    // Custom param
    noAuth: true
  })
  login: ResourceMethod<{login: string, password: string}, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/logout'
  })
  logout: ResourceMethod<void, any>;

}

```


## Example of resource model usage


### `UserResource with model`


```ts
export interface ITestModel {
  id?: string;
  name?: string;
}

export interface ITestQueryInput {
  name?: string;
}

export class TestModel extends ResourceModel<TestResource> implements ITestModel {

  id: string;
  name: string;

  $setData(data: any) {
    // You can overwrite $setData method
    if (data) {
      this.id = data.id;
      this.name = data.name;
      // do something else
    }
  }

  protected isNew(): boolean {
    return !this.id;
  }

}


@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/test'
})
export class TestResource extends ResourceCRUD<ITestQueryInput, TestModel, TestModel> {

  $initResultObject(): TestModel {
    return new TestModel();
  }

}

```

### Using resource with model in your app

```ts
import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'test-component',
  templateUrl: 'test.page.component.html',
  styleUrls: ['test.page.component.css'],
})
export class TestComponent implements OnInit {

  constructor(private testRes: TestResource) {}

  ngOnInit() {

    let modelTest = this.testRes.createModel();
    console.log('New modelTest', modelTest);

    modelTest.$save().$observable.subscribe(() => {
      console.log('Saved and updated modelTest', modelTest);
    });

    let modelTest2 = this.testRes.query();
    console.log('Array of models', modelTest2);

    modelTest2.$observable.subscribe(() => {
      // Data received
      console.log('Array filled with test models', modelTest2);

      let modelTest3 = modelTest2[1];

      modelTest3.name = 'Roma';
      modelTest3.$save().$observable.subscribe(() => {
        console.log('Saved and updated', modelTest3);
      });

    });

  }

);
```


## Example of mapping object

```ts

export class CTest {

  prop1: string = '';
  prop2: string = '';

  get prop(): string {
    return this.prop1 + ' ' + this.prop2;
  }

  constructor(data: any = null) {
    this.$setData(data);
  }

  $setData(data: any) {
    if (data) {
      this.prop1 = data.prop1;
      this.prop2 = data.prop2;
      // do something else
    }
  }

}

@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/test'
})
export class TestRes extends Resource {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<any, CTest[]>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, CTest>;

  $initResultObject(): any {
    return new CTest();
  }

}

@Component({
  moduleId: module.id,
  selector: 'test-component',
  templateUrl: 'test.page.component.html',
  styleUrls: ['test.page.component.css'],
})
export class TestComponent implements OnInit {

  list: CTest[] = [];
  test: CTest;

  prop: string;

  constructor(private testRes:TestRes) {}

  ngOnInit():any {

    this.list = this.testRes.query();

    this.test = this.testRes.get({id:1});

    this.prepareData(); // will not set prop, test is not yet resolved
    console.log(this.test.prop); // a space ' ' will be returned because data is not yet received


    // so to get the prop we will need to wait data to be received
    this.test
      .$observable
      .subscribe(
        // Now the data is received and assigned on the object
        () => this.prepareData()
      );
  }

  private preprareData() {
    if (this.test && this.test.$resolved) {
      this.prop = this.test.prop;
    }
  }
}



```
