"use strict";
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var core_1 = require('@angular/core');
function ResourceAction(action) {
    action = action || {};
    if (action.method === undefined) {
        action.method = http_1.RequestMethod.Get;
    }
    return function (target, propertyKey) {
        target[propertyKey] = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var isGetRequest = action.method === http_1.RequestMethod.Get;
            var ret;
            var resourceModel = action.model || this.constructor['model'];
            if (resourceModel && !action.isArray) {
                ret = resourceModel.create({}, false);
            }
            else if (action.isLazy) {
                ret = {};
            }
            else {
                ret = action.isArray ? [] : {};
            }
            var mainDeferredSubscriber = null;
            var mainObservable = null;
            ret.$resolved = false;
            ret.$observable = Rx_1.Observable.create(function (subscriber) {
                mainDeferredSubscriber = subscriber;
            }).flatMap(function () { return mainObservable; });
            ret.$abortRequest = function () {
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
                .then(function (dataAll) {
                if (ret.$resolved) {
                    mainObservable = Rx_1.Observable.create(function (observer) {
                        observer.next(null);
                    });
                    releaseMainDeferredSubscriber();
                }
                var url = dataAll[0] + dataAll[1];
                var headers = new http_1.Headers(dataAll[2]);
                var defPathParams = dataAll[3];
                var data = args.length ? args[0] : null;
                var callback = args.length > 1 ? args[1] : null;
                if (typeof data === 'function') {
                    if (!callback) {
                        callback = data;
                        data = null;
                    }
                    else if (typeof callback !== 'function') {
                        var tmpData = callback;
                        callback = data;
                        data = tmpData;
                    }
                    else {
                        data = null;
                    }
                }
                data = Object.assign({}, dataAll[4], data);
                var pathParams = url.match(/{([^}]*)}/g) || [];
                var usedPathParams = {};
                var _loop_1 = function(i) {
                    var pathParam = pathParams[i];
                    var pathKey = pathParam.substr(1, pathParam.length - 2);
                    var isMandatory = pathKey[0] === '!';
                    if (isMandatory) {
                        pathKey = pathKey.substr(1);
                    }
                    var isGetOnly = pathKey[0] === ':';
                    if (isGetOnly) {
                        pathKey = pathKey.substr(1);
                    }
                    var value = getValueForPath(pathKey, defPathParams, data, usedPathParams);
                    if (isGetOnly) {
                        delete [data[pathKey]];
                    }
                    if (!value) {
                        if (isMandatory) {
                            var consoleMsg_1 = "Mandatory " + pathParam + " path parameter is missing";
                            mainObservable = Rx_1.Observable.create(function (observer) {
                                observer.error(new Error(consoleMsg_1));
                            });
                            console.warn(consoleMsg_1);
                            releaseMainDeferredSubscriber();
                            return { value: void 0 };
                        }
                        url = url.substr(0, url.indexOf(pathParam));
                        return "break";
                    }
                    url = url.replace(pathParam, value);
                };
                for (var i = 0; i < pathParams.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object") return state_1.value;
                    if (state_1 === "break") break;
                }
                url = url.replace(/\/\/+/g, '/');
                if (url.startsWith('http')) {
                    url = url.replace(':/', '://');
                }
                if (typeof action.removeTrailingSlash === 'undefined') {
                    action.removeTrailingSlash = _this.removeTrailingSlash();
                }
                if (action.removeTrailingSlash) {
                    while (url[url.length - 1] === '/') {
                        url = url.substr(0, url.length - 1);
                    }
                }
                for (var key in defPathParams) {
                    if (defPathParams[key][0] === '@') {
                        delete defPathParams[key];
                    }
                }
                var body = null;
                var searchParams;
                if (isGetRequest) {
                    searchParams = Object.assign({}, defPathParams, data);
                }
                else {
                    if (data) {
                        body = JSON.stringify(data);
                    }
                    searchParams = defPathParams;
                }
                var search = new http_1.URLSearchParams();
                for (var key in searchParams) {
                    if (!usedPathParams[key]) {
                        var value = searchParams[key];
                        if (typeof value === 'object') {
                            value = JSON.stringify(value);
                        }
                        search.append(key, value);
                    }
                }
                if (!body) {
                    headers.delete('content-type');
                }
                var requestOptions = new http_1.RequestOptions({
                    method: action.method,
                    headers: headers,
                    body: body,
                    url: url,
                    search: search
                });
                var req = new http_1.Request(requestOptions);
                req = action.requestInterceptor ?
                    action.requestInterceptor(req) :
                    _this.requestInterceptor(req);
                if (!req) {
                    mainObservable = Rx_1.Observable.create(function (observer) {
                        observer.error(new Error('Request is null'));
                    });
                    console.warn('Request is null');
                    releaseMainDeferredSubscriber();
                    return;
                }
                var requestObservable = _this.http.request(req);
                requestObservable = action.responseInterceptor ?
                    action.responseInterceptor(requestObservable, req) :
                    _this.responseInterceptor(requestObservable, req);
                if (action.isLazy) {
                    mainObservable = requestObservable;
                }
                else {
                    mainObservable = Rx_1.Observable.create(function (subscriber) {
                        var reqSubscr = requestObservable.subscribe(function (resp) {
                            if (resp !== null) {
                                var map = action.map ? action.map : _this.map;
                                var filter = action.filter ? action.filter : _this.filter;
                                if (action.isArray) {
                                    if (!Array.isArray(resp)) {
                                        console.error('Returned data should be an array. Received', resp);
                                    }
                                    else {
                                        var result = resp.filter(filter).map(map);
                                        result = !!resourceModel ? mapToModel.bind(_this)(result, resourceModel) : result;
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
                        }, function (err) { return subscriber.error(err); }, function () {
                            ret.$resolved = true;
                            subscriber.complete();
                            if (callback) {
                                callback(ret);
                            }
                        });
                        ret.$abortRequest = function () {
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
                ret.$observable = ret.$observable.map(function (resp) {
                    return mapToModel.bind(_this)(resp, resourceModel);
                });
            }
            return ret;
        };
    };
}
exports.ResourceAction = ResourceAction;
function mapToModel(resp, model) {
    var modelProviders = Reflect.getMetadata('providers', model) || [];
    var providers = core_1.ReflectiveInjector.resolve(modelProviders);
    var injector = core_1.ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    var properties = Reflect.getMetadata('design:paramtypes', model) || [];
    var injection = [];
    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
        var property = properties_1[_i];
        injection.push(injector.get(property));
    }
    var result;
    if (Array.isArray(resp)) {
        result = [];
        for (var _a = 0, resp_1 = resp; _a < resp_1.length; _a++) {
            var item = resp_1[_a];
            var modelInstance = new (model.bind.apply(model, [void 0].concat(injection)))().$fillFromObject(item);
            modelInstance.$resource = this;
            result.push(modelInstance);
        }
    }
    else {
        result = new (model.bind.apply(model, [void 0].concat(injection)))().$fillFromObject(resp);
        result.$resource = this;
    }
    return result;
}
exports.mapToModel = mapToModel;
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