import {ResourceActionBase, ResourceResult} from './Interfaces';
import {Resource} from './Resource';
import {RequestMethod, Response, Headers, URLSearchParams, RequestOptions, Request} from '@angular/http';
import {Subscriber, Observable, ConnectableObservable} from 'rxjs';

export function ResourceAction(action?: ResourceActionBase) {

  action = action || {};

  if (action.method === undefined) {
    action.method = RequestMethod.Get;
  }


  return function(target: Resource, propertyKey: string) {

    target[propertyKey] = function(...args: any[]): ResourceResult<any> {

      let isGetRequest = action.method === RequestMethod.Get;

      let ret: ResourceResult<any>;

      if (action.isLazy) {
        ret = {};
      } else {
        ret = action.isArray ? [] : {};
      }

      let mainDeferredSubscriber: Subscriber<any> = null;
      let mainObservable:Observable<Response> = null;

      ret.$resolved = false;
      ret.$observable = Observable.create((subscriber:Subscriber<any>) => {
        mainDeferredSubscriber = subscriber;
      }).flatMap(() => mainObservable);


      if (!action.isLazy) {
        ret.$observable = ret.$observable.publish();
        (<ConnectableObservable<any>>ret.$observable).connect();
      }

      Promise.all([
        Promise.resolve(action.url || this.getUrl()),
        Promise.resolve(action.path || this.getPath()),
        Promise.resolve(action.headers || this.getHeaders()),
        Promise.resolve(action.params || this.getParams()),
        Promise.resolve(action.data || this.getData())
      ])
        .then((dataAll:any[]) => {

          let url:string = dataAll[0] + dataAll[1];
          let headers = new Headers(dataAll[2]);
          let defPathParams = dataAll[3];

          let data = args.length ? args[0] : null;
          let callback = args.length > 1 ? args[1] : null;

          if (typeof data === 'function') {
            if (!callback) {
              callback = data;
              data = null;
            } else if (typeof callback !== 'function') {
              let tmpData = callback;
              callback = data;
              data = tmpData;
            } else {
              data = null;
            }

          }

          data = Object.assign(dataAll[4], data);

          let pathParams = url.match(/{([^}]*)}/g) || [];
          let usedPathParams:any = {};

          for (let i=0; i < pathParams.length; i++) {

            let pathParam = pathParams[i];

            let pathKey = pathParam.substr(1, pathParam.length-2);
            let isMandatory = pathKey[0] === '!';
            if (isMandatory) {
              pathKey = pathKey.substr(1);
            }

            let value = getValueForPath(pathKey, defPathParams, data, usedPathParams);

            if (!value) {
              if (isMandatory) {

                mainObservable = Observable.create((observer:any) => {
                  observer.error(new Error('Mandatory ' + pathParam + ' path parameter is missing'));
                });

                console.warn('Mandatory ' + pathParam + ' path parameter is missing');

                mainDeferredSubscriber.next();
                mainDeferredSubscriber.complete();
                mainDeferredSubscriber = null;
                return;

              }
              url = url.substr(0, url.indexOf(pathParam));
              break;
            }

            // Replacing in the url
            url = url.replace(pathParam, value);
          }

          // Removing double slashed from final url
          url = url.replace(/\/\/+/g, '/');

          // Remove trailing slash
          if (typeof action.removeTrailingSlash === "undefined") {
            action.removeTrailingSlash = this.removeTrailingSlash();
          }
          if (action.removeTrailingSlash) {
            while (url[url.length-1] == '/') {
              url = url.substr(0, url.length-1);
            }
          }


          // Remove mapped params
          for (let key in defPathParams) {
            if (defPathParams[key][0] === '@') {
              delete defPathParams[key];
            }
          }


          // Default search params or data
          let body: string = null;

          let searchParams: any;
          if (isGetRequest) {
            // GET
            searchParams = Object.assign({}, defPathParams, data);
          } else {
            // NON GET
            if (data) {
              body = JSON.stringify(data);
            }
            searchParams = defPathParams;
          }


          // Setting search params
          let search: URLSearchParams = new URLSearchParams();
          for (let key in searchParams) {
            if (!usedPathParams[key]) {
              let value:any = searchParams[key];
              if (typeof value == 'object') {
                // if (value instanceof Object) {
                value = JSON.stringify(value);
              }
              search.append(key, value);
            }
          }

          // Removing Content-Type header if no body
          if (!body) {
            headers.delete('content-type');
          }

          // Creating request options
          let requestOptions = new RequestOptions({
            method: action.method,
            headers: headers,
            body: body,
            url: url,
            search: search
          });

          // Creating request object
          let req = new Request(requestOptions);

          req = action.requestInterceptor ?
            action.requestInterceptor(req) :
            this.requestInterceptor(req);

          if (!req) {
            mainObservable = Observable.create((observer:any) => {
              observer.error(new Error('Request is null'));
            });

            console.warn('Request is null');

            mainDeferredSubscriber.next();
            mainDeferredSubscriber.complete();
            mainDeferredSubscriber = null;
            return;
          }

          // Doing the request
          let requestObservable = this.http.request(req);

          //noinspection TypeScriptValidateTypes
          requestObservable = action.responseInterceptor ?
            action.responseInterceptor(requestObservable, req) :
            this.responseInterceptor(requestObservable, req);



          if (action.isLazy) {
            mainObservable = requestObservable;
          } else {

            mainObservable = Observable.create((subscriber:Subscriber<any>) => {

              requestObservable.subscribe(
                (resp:any) => {

                  if (resp !== null) {
                    if (action.isArray) {
                      if (!Array.isArray(resp)) {
                        console.error('Returned data should be an array. Received', resp);
                      } else {
                        Array.prototype.push.apply(ret, resp);
                      }
                    } else {
                      if (Array.isArray(resp)) {
                        console.error('Returned data should be an object. Received', resp);
                      } else {
                        Object.assign(ret, resp);
                      }
                    }
                  }

                  subscriber.next(resp);

                },
                (err:any) => subscriber.error(err),
                () => {
                  ret.$resolved = true;
                  subscriber.complete();
                  if (callback) {
                    callback(ret);
                  }
                }
              );

            });

          }

          mainDeferredSubscriber.next();
          mainDeferredSubscriber.complete();
          mainDeferredSubscriber = null;



        });

      return ret;

    }

  }
}


function getValueForPath(key: string, params: any, data: any, usedPathParams: any) {

  if (typeof data[key] !== 'object') {
    usedPathParams[key] = true;
    return data[key];
  }

  if (!params[key]) {
    return null;
  }

  if (params[key][0] === '@') {
    return getValueForPath(params[key].substr(1), params, data, usedPathParams);
  }

  usedPathParams[key] = true;
  return params[key];

}
