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
export class EnrichDashboardPageComponent implements OnInit {

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
      date: '17.06.2016,
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

### `ResourceResult<T>`
Every request method is returning give data type this is extended by `ResourceResult`
```ts
export type ResourceResult<R extends {}> = R & {
  $resolved?: boolean; // true is request has been executed
  $observable?: Observable<R>; // Observable for the request
  $abortRequest?: () => void; // method to cances pending request
}
```

### `ResourceParamsBase`
```javascript
export interface ResourceParamsBase {
	url?:string;
	path?:string;
	headers?:any;
	params?:any;
	data?:any;
	removeTrailingSlash?: boolean;
	add2Provides?: boolean;
	providersSubSet?: string;
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
**Default**: *empty*<br>
**Ex**: /users/{id}<br>
**Ex2**: /users/{!id}<br>

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

#### `add2Provides`
To create service provider and it to ResourceModule.forRoot()<br>
**Default**: true<br>

#### `providersSubSet`
To create service provider and it to ResourceModule.forChild(<providersSubSet>)<br>
**Default**: null (so it goes to forRoot())<br>

<br>

### `ResourceActionBase`
```javascript
export interface ResourceActionBase extends ResourceParamsBase {
	method?:RequestMethod; // from angular `@angular/http`
	isArray?: boolean;
	isLazy?: boolean;
	requestInterceptor?: ResourceRequestInterceptor;
  responseInterceptor?: ResourceResponseInterceptor;
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

Default request interceptor is a function which recieves `Request` object from `anglar2/http`<br>
**Default**: *doing nothing*

#### `responseInterceptor`
`(observable:Observable<any>, request?:Request):Observable<any>;`

Default response interceptor is a function which receives `Observable` object from `rxjs/Observable` and returns also `Observable` object.<br>
**Default**: 
```javascript
function (observable:Observable<any>):Observable<any> {
	return observable.map(res => res._body ? res.json() : null);
}
```

<br>


> Note: For all non GET request all data object will be send in the request body as json.
> In case of GET requset the data object will be send as query parameters. Parameters, which are has been used for path params, will be removed from query list (only for GET request).

## `Resource` class

### Default methods

#### `getUrl(): string | Promise<string>`
To get url. Used in methods.

#### `setUrl(url: string)`
To set resource url

#### `getPath(): string | Promise<string>`
To get path. Used in methods

#### `setPath(path: string)`
To set resource path

#### `getHeaders(): any | Promise<any>`
To get headers. Used in methods.

#### `setHeaders(headers: any)`
To set resource headers

#### `getParams(): any | Promise<any>`
To get params. Used in methods.

#### `getParams(params: any)`
To set resource params

#### `getData(): any | Promise<any>`
To get data. Used in methods.

#### `getData(data: any)`
To set resource data

#### `requestInterceptor(req: Request): Request`
Default request interceptor

#### `responseInterceptor(observable: Observable<any>, req: Request): Observable<any>`
Default response interceptor

#### `removeTrailingSlash(): boolean`
Called by method if needs to trim trailing slashes from final url


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


## Priority of getting params by methods

Lower number - higher priority

1. Defined by @ResourceAction decorator
2. Sett by setUrl method of the resource
3. Defined by @ResourceParams decorator
4. Defined in ResourceGlobalConfig
5. Default value


## Example of auth resource service with custom headers


### `AuthGuardResource`
```ts
import {Request, Response} from '@angular/http';
import {Observable, Subscriber} from 'rxjs';
import {AuthServiceHelper, ConfigServiceHelper} from '../helpers/index';
import {AppConfigResource} from './appConfig.resource';
import {Resource} from 'ng2-resource-rest';

export class AuthGuardResource extends Resource {

  private deferredQ: Subscriber<any>[] = [];
  private configListenerSet: boolean = false;

  getHeaders(): any {
    let headers = super.getHeaders();

    // Extending our headers with Authorization
    headers = AuthServiceHelper.extendHeaders(headers);

    return headers;
  }

  responseInterceptor(observable: Observable<any>, request?: Request): Observable<any> {

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
import {ResourceAction, ResourceMethod, ResourceParams} from 'ng2-resource-rest';
import {AuthGuardResource} from './authGuard.resource';


@Injectable()
@ResourceParams({
  url: AppProject.BASE_URL + '/auth/v1'
})
export class AuthResource extends AuthGuardResource {

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/login'
  })
  login: ResourceMethod<any, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/logout'
  })
  logout: ResourceMethod<void, any>;

}

```