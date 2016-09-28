import { RequestMethod, Headers, URLSearchParams, RequestOptions, Request } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ReflectiveInjector } from '@angular/core';
export function ResourceAction(action) {
    action = action || {};
    if (action.method === undefined) {
        action.method = RequestMethod.Get;
    }
    return function (target, propertyKey) {
        target[propertyKey] = function (...args) {
            let isGetRequest = action.method === RequestMethod.Get;
            let ret;
            let resourceModel = action.model || this.constructor['model'];
            if (resourceModel && !action.isArray) {
                ret = resourceModel.create({}, false);
            }
            else if (action.isLazy) {
                ret = {};
            }
            else {
                ret = action.isArray ? [] : {};
            }
            let mainDeferredSubscriber = null;
            let mainObservable = null;
            ret.$resolved = false;
            ret.$observable = Observable.create((subscriber) => {
                mainDeferredSubscriber = subscriber;
            }).flatMap(() => mainObservable);
            ret.$abortRequest = () => {
                ret.$resolved = true;
            };
            function releaseMainDeferredSubscriber() {
                mainDeferredSubscriber.next();
                mainDeferredSubscriber.complete();
                mainDeferredSubscriber = null;
            }
            if (!action.isLazy) {
                ret.$observable = ret.$observable.publish();
                ret.$observable.connect();
            }
            Promise.all([
                Promise.resolve(action.url || this.getUrl()),
                Promise.resolve(action.path || this.getPath()),
                Promise.resolve(action.headers || this.getHeaders()),
                Promise.resolve(action.params || this.getParams()),
                Promise.resolve(action.data || this.getData())
            ])
                .then((dataAll) => {
                if (ret.$resolved) {
                    mainObservable = Observable.create((observer) => {
                        observer.next(null);
                    });
                    releaseMainDeferredSubscriber();
                }
                let url = dataAll[0] + dataAll[1];
                let headers = new Headers(dataAll[2]);
                let defPathParams = dataAll[3];
                let data = args.length ? args[0] : null;
                let callback = args.length > 1 ? args[1] : null;
                if (typeof data === 'function') {
                    if (!callback) {
                        callback = data;
                        data = null;
                    }
                    else if (typeof callback !== 'function') {
                        let tmpData = callback;
                        callback = data;
                        data = tmpData;
                    }
                    else {
                        data = null;
                    }
                }
                data = Object.assign({}, dataAll[4], data);
                let pathParams = url.match(/{([^}]*)}/g) || [];
                let usedPathParams = {};
                for (let i = 0; i < pathParams.length; i++) {
                    let pathParam = pathParams[i];
                    let pathKey = pathParam.substr(1, pathParam.length - 2);
                    let isMandatory = pathKey[0] === '!';
                    if (isMandatory) {
                        pathKey = pathKey.substr(1);
                    }
                    let value = getValueForPath(pathKey, defPathParams, data, usedPathParams);
                    if (!value) {
                        if (isMandatory) {
                            let consoleMsg = `Mandatory ${pathParam} path parameter is missing`;
                            mainObservable = Observable.create((observer) => {
                                observer.error(new Error(consoleMsg));
                            });
                            console.warn(consoleMsg);
                            releaseMainDeferredSubscriber();
                            return;
                        }
                        url = url.substr(0, url.indexOf(pathParam));
                        break;
                    }
                    url = url.replace(pathParam, value);
                }
                url = url.replace(/\/\/+/g, '/');
                if (url.startsWith('http')) {
                    url = url.replace(':/', '://');
                }
                if (typeof action.removeTrailingSlash === 'undefined') {
                    action.removeTrailingSlash = this.removeTrailingSlash();
                }
                if (action.removeTrailingSlash) {
                    while (url[url.length - 1] === '/') {
                        url = url.substr(0, url.length - 1);
                    }
                }
                for (let key in defPathParams) {
                    if (defPathParams[key][0] === '@') {
                        delete defPathParams[key];
                    }
                }
                let body = null;
                let searchParams;
                if (isGetRequest) {
                    searchParams = Object.assign({}, defPathParams, data);
                }
                else {
                    if (data) {
                        body = JSON.stringify(data);
                    }
                    searchParams = defPathParams;
                }
                let search = new URLSearchParams();
                for (let key in searchParams) {
                    if (!usedPathParams[key]) {
                        let value = searchParams[key];
                        if (typeof value === 'object') {
                            value = JSON.stringify(value);
                        }
                        search.append(key, value);
                    }
                }
                if (!body) {
                    headers.delete('content-type');
                }
                let requestOptions = new RequestOptions({
                    method: action.method,
                    headers: headers,
                    body: body,
                    url: url,
                    search: search
                });
                let req = new Request(requestOptions);
                req = action.requestInterceptor ?
                    action.requestInterceptor(req) :
                    this.requestInterceptor(req);
                if (!req) {
                    mainObservable = Observable.create((observer) => {
                        observer.error(new Error('Request is null'));
                    });
                    console.warn('Request is null');
                    releaseMainDeferredSubscriber();
                    return;
                }
                let requestObservable = this.http.request(req);
                requestObservable = action.responseInterceptor ?
                    action.responseInterceptor(requestObservable, req) :
                    this.responseInterceptor(requestObservable, req);
                if (action.isLazy) {
                    mainObservable = requestObservable;
                }
                else {
                    mainObservable = Observable.create((subscriber) => {
                        let reqSubscr = requestObservable.subscribe((resp) => {
                            if (resp !== null) {
                                let map = action.map ? action.map : this.map;
                                let filter = action.filter ? action.filter : this.filter;
                                if (action.isArray) {
                                    if (!Array.isArray(resp)) {
                                        console.error('Returned data should be an array. Received', resp);
                                    }
                                    else {
                                        let result = resp.filter(filter).map(map);
                                        result = !!resourceModel ? mapToModel.bind(this)(result, resourceModel) : result;
                                        Array.prototype.push.apply(ret, result);
                                    }
                                }
                                else {
                                    if (Array.isArray(resp)) {
                                        console.error('Returned data should be an object. Received', resp);
                                    }
                                    else {
                                        if (filter(resp)) {
                                            if (!!resourceModel) {
                                                ret.$fillFromObject(map(resp));
                                            }
                                            else {
                                                Object.assign(ret, map(resp));
                                            }
                                        }
                                    }
                                }
                            }
                            subscriber.next(resp);
                        }, (err) => subscriber.error(err), () => {
                            ret.$resolved = true;
                            subscriber.complete();
                            if (callback) {
                                callback(ret);
                            }
                        });
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
                ret.$observable = ret.$observable.map((resp) => {
                    return mapToModel.bind(this)(resp, resourceModel);
                });
            }
            return ret;
        };
    };
}
export function mapToModel(resp, model) {
    let modelProviders = Reflect.getMetadata('providers', model) || [];
    let providers = ReflectiveInjector.resolve(modelProviders);
    let injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    let properties = Reflect.getMetadata('design:paramtypes', model) || [];
    let injection = [];
    for (let property of properties) {
        injection.push(injector.get(property));
    }
    let result;
    if (Array.isArray(resp)) {
        result = [];
        for (let item of resp) {
            let modelInstance = new model(...injection).$fillFromObject(item);
            modelInstance.$resource = this;
            result.push(modelInstance);
        }
    }
    else {
        result = new model(...injection).$fillFromObject(resp);
        result.$resource = this;
    }
    return result;
}
function getValueForPath(key, params, data, usedPathParams) {
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
//# sourceMappingURL=ResourceAction.js.map