import { Headers, Request, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import {
  ResourceActionBase, ResourceResponseFilter, ResourceResponseInitResult, ResourceResponseMap,
  ResourceResult
} from './Interfaces';
import { Resource } from './Resource';
import { ResourceModel } from './ResourceModel';
import { ConnectableObservable, Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { ResourceGlobalConfig, TGetParamsMappingType } from './ResourceGlobalConfig';



export function ResourceAction(methodOptions?: ResourceActionBase) {

  methodOptions = methodOptions || {};

  if (methodOptions.method === undefined) {
    methodOptions.method = RequestMethod.Get;
  }

  return function (target: Resource, propertyKey: string) {

    (<any>target)[propertyKey] = function (...args: any[]): ResourceResult<any> | ResourceModel<Resource> {

      let data = args.length ? args[0] : null;
      let params = args.length > 1 ? args[1] : null;
      let callback = args.length > 2 ? args[2] : null;

      if (typeof data === 'function') {
        callback = data;
        data = null;
      } else if (typeof params === 'function') {
        callback = params;
        params = null;
      }

      let resourceOptions = this.getResourceOptions();

      let isGetRequest = methodOptions.method === RequestMethod.Get;

      let ret: ResourceResult<any> | ResourceModel<Resource> = null;

      let map: ResourceResponseMap = methodOptions.map ? methodOptions.map : this.map;
      let filter: ResourceResponseFilter = methodOptions.filter ? methodOptions.filter : this.filter;
      let initObject: ResourceResponseInitResult = methodOptions.initResultObject ?
        methodOptions.initResultObject : this.initResultObject;

      if (methodOptions.isLazy) {
        ret = {};
      } else {

        if (methodOptions.isArray) {
          ret = [];
        } else {

          if (data.$resource === this) {
            // Setting data to ret
            ret = data;
            data = data.toJSON();
          } else {
            ret = initObject();
          }

        }
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
      ret.$resource = this;


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
        Promise.resolve(methodOptions.url || this.getUrl(methodOptions)),
        Promise.resolve(methodOptions.path || this.getPath(methodOptions)),
        Promise.resolve(methodOptions.headers || this.getHeaders(methodOptions)),
        Promise.resolve(methodOptions.params || this.getParams(methodOptions)),
        Promise.resolve(methodOptions.data || this.getData(methodOptions))
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

          let usedPathParams: any = {};

          if (!Array.isArray(data) || params) {

            if (!Array.isArray(data)) {
              data = Object.assign({}, dataAll[4], data);
            }

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

              let value = getValueForPath(pathKey, defPathParams, params || data, usedPathParams);
              if (isGetOnly && !params) {
                delete data[pathKey];
              }

              if (isNullOrUndefined(value)) {
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
              let _body: any = {};
              if (methodOptions.rootNode) {
                _body[`${methodOptions.rootNode}`] = data;
              } else {
                _body = data;
              }
              body = JSON.stringify(_body);
            }
            searchParams = defPathParams;
          }


          // Setting search params
          let search: URLSearchParams = new URLSearchParams();

          if (!params) {
            for (let key in searchParams) {
              if (searchParams.hasOwnProperty(key) && !usedPathParams[key]) {
                let value: any = searchParams[key];
                appendSearchParams(search, key, value);
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
            search: search,
            withCredentials: methodOptions.withCredentials || resourceOptions.withCredentials
          });


          // Creating request object
          let req = new Request(requestOptions);

          req = methodOptions.requestInterceptor ?
            methodOptions.requestInterceptor(req, methodOptions) :
            this.requestInterceptor(req, methodOptions);

          if (!req) {
            mainObservable = Observable.create((observer: any) => {
              observer.error(new Error('Request is null'));
            });

            console.warn('Request is null');

            releaseMainDeferredSubscriber();
            return;
          }

          // Doing the request
          let requestObservable = this._request(req, methodOptions);


          if (methodOptions.isLazy) {

            mainObservable = requestObservable;

          } else {

            mainObservable = Observable.create((subscriber: Subscriber<any>) => {

              let reqSubscr: Subscription = requestObservable.subscribe(
                (resp: any) => {

                  if (resp !== null) {

                    if (methodOptions.isArray) {

                      // Expecting array

                      if (!Array.isArray(resp)) {
                        console.error('Returned data should be an array. Received', resp);
                      } else {

                        ret.push(
                          ...resp
                            .filter(filter)
                            .map(map)
                            .map((respItem: any) => {
                              respItem.$resource = this;
                              return setDataToObject(initObject(), respItem);
                            })
                        );

                      }

                    } else {

                      // Expecting object

                      if (Array.isArray(resp)) {
                        console.error('Returned data should be an object. Received', resp);
                      } else {

                        if (filter(resp)) {

                          setDataToObject(ret, map(resp));

                        }

                      }
                    }
                  }

                  ret.$resolved = true;
                  subscriber.next(ret);

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

      return ret;

    };

  };

}


export function setDataToObject(ret: any, resp: any): any {

  if (ret.$setData) {
    ret.$setData(resp);
  } else {
    Object.assign(ret, resp);
  }

  return ret;

}

export function appendSearchParams(search: URLSearchParams, key: string, value: any): void {
  /// Convert dates to ISO format string
  if (value instanceof Date) {
    search.append(key, value.toISOString());
    return;
  }

  if (typeof value === 'object') {

    switch (ResourceGlobalConfig.getParamsMappingType) {

      case TGetParamsMappingType.Plain:

        if (Array.isArray(value)) {
          for (let arr_value of value) {
            search.append(key, arr_value);
          }
        } else {
          search.append(key, JSON.stringify(value));
        }
        break;

      case TGetParamsMappingType.Bracket:
        /// Convert object and arrays to query params
        for (let k in value) {
          if (value.hasOwnProperty(k)) {
            appendSearchParams(search, key + '[' + k + ']', value[k]);
          }
        }
        break;
    }

    return;
  }


  search.append(key, value);

}

function getValueForPath(key: string, params: any, data: any, usedPathParams: any): string {

  if (!isNullOrUndefined(data[key]) && typeof data[key] !== 'object') {
    usedPathParams[key] = true;
    return data[key];
  }

  if (isNullOrUndefined(params[key])) {
    return null;
  }

  if (params[key][0] === '@') {
    return getValueForPath(params[key].substr(1), params, data, usedPathParams);
  }

  usedPathParams[key] = true;
  return params[key];

}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

