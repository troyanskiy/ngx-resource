[![npm version](https://badge.fury.io/js/ng2-resource-rest.svg)](http://badge.fury.io/js/ng2-resource-rest)

[![NPM](https://nodei.co/npm/ng2-resource-rest.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ng2-resource-rest/)

# ng2-resource-rest
Resource (REST) Client for Angular 2

To use the module install the module using below command

`npm install ng2-resource-rest --save`

### How to use articles
Good explanation how to use the library in the article "[Angular2, a rest client interface](http://blog.slals.io/angular2-a-rest-client-interface)" by [Jonathan Serra](https://github.com/Slaals)

### How to use

***Creating simple resource CRUD (./resources/NewsRes.ts)***
```ts
import {Injectable} from '@angular/core';
import {Resource, ResourceParams, ResourceAction, ResourceMethod} from 'ng2-resource-rest';
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

Than inject resource into your components
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
# Changes

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
	path?:string;
	headers?:any;
	params?:any;
	data?:any;
	removeTrailingSlash?: boolean;
	addTimestamp?: boolean | string;
	withCredentials?: boolean;
	[propName: string]: any;
}
```

#### `url`
Default resource common address<br>
**Default**: *empty*<br>
**Ex**: https://domain.com/api

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
  map?: ResourceResponseMap;
  filter?: ResourceResponseFilter;
  rootNode?: string;
}
```

All parametes will overwrite default one from `ResourceParamsBase`

#### `method`
Http request method of the action.<br>
**Ex**: method: RequestMethod.Get
**Default**: method: RequestMethod.Get


#### `isArray`
Used if received data is an array


#### `isLazy`
Is `isLazy` set to true, then the request will not be executed immediately. To execute the request you should subsribe to abservable and hande responces by yourself.

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

<br>


> Note: For all non GET request all data object will be send in the request body as json.
> In case of GET requset the data object will be send as query parameters. Parameters, which are has been used for path params, will be removed from query list (only for GET request).

## `Resource` class

### Default methods

#### `getUrl(methodOptions?: ResourceActionBase): string | Promise<string>`
To get url. Used in methods.

#### `setUrl(url: string)`
To set resource url

#### `getPath(methodOptions?: ResourceActionBase): string | Promise<string>`
To get path. Used in methods

#### `setPath(path: string)`
To set resource path

#### `getHeaders(methodOptions?: ResourceActionBase): any | Promise<any>`
To get headers. Used in methods.

#### `setHeaders(headers: any)`
To set resource headers

#### `getParams(methodOptions?: ResourceActionBase): any | Promise<any>`
To get params. Used in methods.

#### `setParams(params: any)`
To set resource params

#### `getData(methodOptions?: ResourceActionBase): any | Promise<any>`
To get data. Used in methods.

#### `setData(data: any)`
To set resource data

#### `requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request`
Default request interceptor

#### `responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any>`
Default response interceptor

#### `removeTrailingSlash(): boolean`
Called by method if needs to trim trailing slashes from final url

#### `map(item: any): any<any>`
Default response mapper

#### `filter(item: any): boolean`
Default filter method. By default always `true`


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

#### `ResourceGlobalConfig.data: any | Promise<any> = null`
Defines data

#### `getParamsMappingType: any = TGetParamsMappingType.Plain`
Defines mapping method of arrays/objects to get params


## Priority of getting params by methods

Lower number - higher priority

1. Defined by @ResourceAction decorator
2. Sett by setUrl method of the resource
3. Defined by @ResourceParams decorator
4. Defined in ResourceGlobalConfig
5. Default value

## Example of service injection
```ts
export class UnitRes extends Resource {
    constructor(
            http: Http,
            injector: Injector,
            private _myService: MyService
        ) {
            super(http, injector);
        }
 }
```

## Example of auth resource service with custom headers


### `AuthGuardResource`
```ts
import {Request, Response} from '@angular/http';
import {Observable, Subscriber} from 'rxjs';
import {AuthServiceHelper} from '../helpers/index';
import {Resource} from 'ng2-resource-rest';

export class AuthGuardResource extends Resource {

  private deferredQ: Subscriber<any>[] = [];
  private configListenerSet: boolean = false;

  getHeaders(methodOptions: any): any {
    let headers = super.getHeaders();

    // Extending our headers with Authorization
    if (!methodOptions.noAuth) {
      headers = AuthServiceHelper.extendHeaders(headers);
    }

    return headers;
  }

  responseInterceptor(observable: Observable<any>, request: Request, methodOptions: ResourceActionBase): Observable<any> {

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
import { ResourceAction, ResourceMethod, ResourceParams } from 'ng2-resource-rest';
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
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { AppProject } from '../../project/app.project';
import { Resource, ResourceAction, ResourceMethod, ResourceParams, ResourceModelParams, ResourceModel } from 'ng2-resource-rest';
import { SomeService } from './some.service'
import { GroupResource, Group } from './group.resource'

export interface IUserQueryInput {
  is_active?: boolean;
}

export interface IUserShort {
  id: number;
  email: string;
}

export interface IUser extends IUserShort {
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface User extends IUser {}

@ResourceModelParams({
  providers: [SomeService]
})
export class User extends ResourceModel<UserResource> {

  static resourceClass = UserResource;

  constructor(private someService: SomeService, private groupResource: GroupResource) {
    super();
  }

  someAction() {
      return this.someService.someAction(this.id);
  }

  followers(): User[] {
      return this.$resource.followers({id: this.id})
  }

  groups(): Group[] {
      return this.groupResource.query({user: this.id})
  }
}


@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/users'
})
export class UserResource extends ResourceCRUD<IUserQueryInput, IUserShort, User> {

  static model = User;

  @ResourceAction({
    method: RequestMethod.Get,
    isArray: true,
    path: '/followers'
  })
  followers: ResourceMethod<{id: any}, User[]>;

  @ResourceAction({
    method: RequestMethod.Get,
    isArray: true,
    path: '/followers',
    model: Group
  })
  groups: ResourceMethod<{id: any}, Group[]>;

}

```

###Using resource with model in your app

```ts
import {Component, OnInit} from '@angular/core';
import {UserResource, GroupResource, User, Group} from '../../resources/index';

@Component({
  moduleId: module.id,
  selector: 'user-component',
  templateUrl: 'users.page.component.html',
  styleUrls: ['users.page.component.css'],
})
export class PageComponent implements OnInit {

  usersList: User[] = [];
  groupsList: Group[] = []
  group: Group;
  user: User;

  constructor(private userResource: UserResource, private groupResource: GroupResource) {}

  ngOnInit():any {

    // That will execute GET request https://domain.net/api/users
    // and after will assign the data to this.usersList
    this.usersList = this.userResource.query();

    //Get user
    this.user = this.userResource.get({id: 1});

    //change and save user
    this.user.first_name = 'Bob'
    this.user.$save()

    //get followers, get first follower, change and save
    let followers: User[] = this.user.followers()
    let follower: User = followers[0]
    follower.first_name = 'Mary'
    follower.$save()

    //get user groups
    let groups: Group[] = this.user.groups()

    //call some action from SomeService for user
    this.user.someAction()

);
```
