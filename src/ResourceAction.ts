import { RequestMethod, Response, Headers, URLSearchParams, RequestOptions, Request } from '@angular/http';
import { Subscriber, Observable, ConnectableObservable, Subscription } from 'rxjs/Rx';
import { ReflectiveInjector } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { ResourceActionBase, ResourceResult, ResourceResponseMap, ResourceResponseFilter } from './Interfaces';
import { Resource } from './Resource';
import { ResourceModel } from './ResourceModel';


export function ResourceAction(methodOptions?: ResourceActionBase) {

  methodOptions = methodOptions || {};

  if (methodOptions.method === undefined) {
    methodOptions.method = RequestMethod.Get;
  }

  if (methodOptions.useModel === undefined) {
    methodOptions.useModel = true;
  }


  return function (target: Resource, propertyKey: string) {

    (<any>target)[propertyKey] = function (...args: any[]): ResourceResult<any> | ResourceModel {

      let resourceOptions = this._getResourceOptions();

      let isGetRequest = methodOptions.method === RequestMethod.Get;

      let ret: ResourceResult<any> | ResourceModel;

      let resourceModel: any;

      if (methodOptions.useModel) {
        if (this.constructor.hasOwnProperty('getResourceModel') && !methodOptions.model) {
          resourceModel = this.constructor.getResourceModel(args);
        } else {
          resourceModel = methodOptions.model || this.constructor['model'];
        }
      }

      if (resourceModel && !methodOptions.isArray) {
        ret = resourceModel.create({}, false);
      } else if (methodOptions.isLazy) {
        ret = {};
      } else {
        ret = methodOptions.isArray ? [] : {};
      }

      let mainDeferredSubscriber: Subscriber<any> = null;
      let mainObservable: Observable<Response> = null;

      ret.$resolved = false;
      ret.$observable = Observable.create((subscriber: Subscriber<any>) => {
        mainDeferredSubscriber = subscriber;
      }).flatMap(() => mainObservable);
      ret.$abortRequest = () => {
        ret.$resolved = true;
      };

      function releaseMainDeferredSubscriber() {
        if (mainDeferredSubscriber) {
          mainDeferredSubscriber.next();
          mainDeferredSubscriber.complete();
          mainDeferredSubscriber = null;
        }
      }


      if (!methodOptions.isLazy) {
        ret.$observable = ret.$observable.publish();
        (<ConnectableObservable<any>>ret.$observable).connect();
      }

      Promise.all([
        Promise.resolve(methodOptions.url || this.getUrl()),
        Promise.resolve(methodOptions.path || this.getPath()),
        Promise.resolve(methodOptions.headers || this.getHeaders()),
        Promise.resolve(methodOptions.params || this.getParams()),
        Promise.resolve(methodOptions.data || this.getData())
      ])
        .then((dataAll: any[]) => {

          if (ret.$resolved) {
            mainObservable = Observable.create((observer: any) => {
              observer.next(null);
            });

            releaseMainDeferredSubscriber();
          }

          let url: string = dataAll[0] + dataAll[1];
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

          let usedPathParams: any = {};

          if (!Array.isArray(data)) {

            data = Object.assign({}, dataAll[4], data);

            let pathParams = url.match(/{([^}]*)}/g) || [];

            for (let i = 0; i < pathParams.length; i++) {

              let pathParam = pathParams[i];

              let pathKey = pathParam.substr(1, pathParam.length - 2);
              let isMandatory = pathKey[0] === '!';
              if (isMandatory) {
                pathKey = pathKey.substr(1);
              }

              let isGetOnly = pathKey[0] === ':';
              if (isGetOnly) {
                pathKey = pathKey.substr(1);
              }

              let value = getValueForPath(pathKey, defPathParams, data, usedPathParams);
              if (isGetOnly) {
                delete data[pathKey];
              }

              if (!value) {
                if (isMandatory) {

                  let consoleMsg = `Mandatory ${pathParam} path parameter is missing`;

                  mainObservable = Observable.create((observer: any) => {
                    observer.error(new Error(consoleMsg));
                  });

                  console.warn(consoleMsg);

                  releaseMainDeferredSubscriber();
                  return;

                }
                url = url.substr(0, url.indexOf(pathParam));
                break;
              }

              // Replacing in the url
              url = url.replace(pathParam, value);
            }

          }



          // Removing double slashed from final url
          url = url.replace(/\/\/+/g, '/');
          if (url.startsWith('http')) {
            url = url.replace(':/', '://');
          }

          // Remove trailing slash
          if (typeof methodOptions.removeTrailingSlash === 'undefined') {
            methodOptions.removeTrailingSlash = this.removeTrailingSlash();
          }
          if (methodOptions.removeTrailingSlash) {
            while (url[url.length - 1] === '/') {
              url = url.substr(0, url.length - 1);
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

              let value: any = searchParams[key];

              if (Array.isArray(value)) {

                for (let arr_value of value) {
                  search.append(key, arr_value);
                }

              } else {

                if (typeof value === 'object') {
                  /// Convert dates to ISO format string
                  if (value instanceof Date) {
                    value = value.toISOString();
                  } else {
                    value = JSON.stringify(value);
                  }
                }
                search.append(key, value);

              }
            }
          }

          // Adding TS if needed
          let tsName = methodOptions.addTimestamp || resourceOptions.addTimestamp;
          if (tsName) {
            if (tsName === true) {
              tsName = 'ts';
            }
            search.append(tsName, '' + new Date().getTime());
          }

          // Removing Content-Type header if no body
          if (!body) {
            headers.delete('content-type');
          }


          // Creating request options
          let requestOptions = new RequestOptions({
            method: methodOptions.method,
            headers: headers,
            body: body,
            url: url,
            search: search
          });

          // Creating request object
          let req = new Request(requestOptions);

          req = methodOptions.requestInterceptor ?
            methodOptions.requestInterceptor(req) :
            this.requestInterceptor(req);

          if (!req) {
            mainObservable = Observable.create((observer: any) => {
              observer.error(new Error('Request is null'));
            });

            console.warn('Request is null');

            releaseMainDeferredSubscriber();
            return;
          }

          // Doing the request
          let requestObservable = this.http.request(req);

          // noinspection TypeScriptValidateTypes
          requestObservable = methodOptions.responseInterceptor ?
            methodOptions.responseInterceptor(requestObservable, req) :
            this.responseInterceptor(requestObservable, req);


          if (methodOptions.isLazy) {
            mainObservable = requestObservable;
          } else {

            mainObservable = Observable.create((subscriber: Subscriber<any>) => {

              let reqSubscr: Subscription = requestObservable.subscribe(
                (resp: any) => {

                  if (resp !== null) {

                    let map: ResourceResponseMap = methodOptions.map ? methodOptions.map : this.map;
                    let filter: ResourceResponseFilter = methodOptions.filter ? methodOptions.filter : this.filter;

                    if (methodOptions.isArray) {
                      if (!Array.isArray(resp)) {
                        console.error('Returned data should be an array. Received', resp);
                      } else {
                        let result = resp.filter(filter).map(map);
                        result = !!resourceModel ? mapToModel.bind(this)(result, resourceModel) : result;
                        Array.prototype.push.apply(ret, result);
                      }
                    } else {
                      if (Array.isArray(resp)) {
                        console.error('Returned data should be an object. Received', resp);
                      } else {
                        if (filter(resp)) {
                          if (!!resourceModel) {
                            (<ResourceModel>ret).$fillFromObject(map(resp));
                          } else {
                            Object.assign(ret, map(resp));
                          }
                        }
                      }
                    }
                  }

                  subscriber.next(resp);

                },
                (err: any) => subscriber.error(err),
                () => {
                  ret.$resolved = true;
                  subscriber.complete();
                  if (callback) {
                    callback(ret);
                  }
                }
              );

              ret.$abortRequest = () => {
                if (ret.$resolved) {
                  return;
                }
                reqSubscr.unsubscribe();
                ret.$resolved = true;
              };

            });

          }

          releaseMainDeferredSubscriber();

        });

      if (resourceModel) {
        ret.$observable = ret.$observable.map((resp: any) => {
          return mapToModel.bind(this)(resp, resourceModel);
        });
      }

      return ret;

    };

  };
}

export function mapToModel(resp: any, model: Type<ResourceModel>) {
  let modelProviders = (<any>Reflect).getMetadata('providers', model) || [];
  let providers = ReflectiveInjector.resolve(modelProviders);
  let injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
  let properties = (<any>Reflect).getMetadata('design:paramtypes', model) || [];
  let injection: any[] = [];
  for (let property of properties) {
    injection.push(injector.get(property));
  }

  let result: any;

  if (Array.isArray(resp)) {
    result = [];
    for (let item of resp) {
      let modelInstance = new model(...injection).$fillFromObject(item);
      modelInstance.$resource = this;
      result.push(modelInstance);
    }
  } else {
    result = new model(...injection).$fillFromObject(resp);
    result.$resource = this;
  }

  return result;
}

function getValueForPath(key: string, params: any, data: any, usedPathParams: any): string {

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
