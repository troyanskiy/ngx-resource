"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
require("rxjs/add/operator/map");
require("rxjs/add/operator/publish");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Resource = (function () {
    function Resource(http) {
        this.http = http;
    }
    Resource.prototype.requestInterceptor = function (req) { };
    Resource.prototype.responseInterceptor = function (observable) {
        return observable.map(function (res) { return res._body ? res.json() : null; });
    };
    Resource.prototype.removeTrailingSlash = function () {
        return true;
    };
    Resource.prototype.getUrl = function () {
        return '';
    };
    Resource.prototype.getPath = function () {
        return '';
    };
    Resource.prototype.getHeaders = function () {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    };
    Resource.prototype.getParams = function () {
        return null;
    };
    Resource.prototype.getData = function () {
        return null;
    };
    Resource.prototype.get = function (data, callback) {
        return null;
    };
    Resource.prototype.query = function (data, callback) {
        return null;
    };
    Resource.prototype.save = function (data, callback) {
        return null;
    };
    Resource.prototype.update = function (data, callback) {
        return null;
    };
    Resource.prototype.remove = function (data, callback) {
        return null;
    };
    Resource.prototype.delete = function (data, callback) {
        return this.remove(data, callback);
    };
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Get
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Function]), 
        __metadata('design:returntype', Object)
    ], Resource.prototype, "get", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Get,
            isArray: true
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Function]), 
        __metadata('design:returntype', Object)
    ], Resource.prototype, "query", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Post
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Function]), 
        __metadata('design:returntype', Object)
    ], Resource.prototype, "save", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Put
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Function]), 
        __metadata('design:returntype', Object)
    ], Resource.prototype, "update", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Delete
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, Function]), 
        __metadata('design:returntype', Object)
    ], Resource.prototype, "remove", null);
    Resource = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Resource);
    return Resource;
}());
exports.Resource = Resource;
function parseUrl(url) {
    var params = [];
    var index = url.indexOf('{');
    var lastIndex;
    while (index > -1) {
        lastIndex = url.indexOf('}', index);
        if (lastIndex == -1) {
            return params;
        }
        lastIndex++;
        params.push(url.substring(index, lastIndex));
        index = url.indexOf('{', lastIndex);
    }
    return params;
}
function ResourceAction(action) {
    return function (target, propertyKey, descriptor) {
        var actionImplementation = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var isGetRequest = action.method === http_1.RequestMethod.Get;
            var ret;
            if (action.isLazy) {
                ret = {};
            }
            else {
                ret = action.isArray ? [] : {};
            }
            var mainDeferredSubscriber = null;
            var mainObservable = null;
            ret.$resolved = false;
            ret.$observable = Observable_1.Observable.create(function (subscriber) {
                mainDeferredSubscriber = subscriber;
            }).flatMap(function () { return mainObservable; });
            if (!action.isLazy) {
                ret.$observable = ret.$observable.publish();
                ret.$observable.connect();
            }
            Promise.all([
                Promise.resolve(action.url || this.getUrl()),
                Promise.resolve(action.path || this.getPath()),
                Promise.resolve(action.headers || this.getHeaders())
            ])
                .then(function (dataAll) {
                var url = dataAll[0] + dataAll[1];
                var headers = new http_1.Headers(dataAll[2]);
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
                var params = Object.assign({}, action.params || _this.getParams());
                // Setting default data parameters
                var defData = action.data || _this.getData();
                if (defData) {
                    if (!data) {
                        data = defData;
                    }
                    else {
                        data = Object.assign(defData, data);
                    }
                }
                // Splitting map params
                var mapParam = {};
                for (var key in params) {
                    if (typeof params[key] == 'string' && params[key][0] == '@') {
                        mapParam[key] = params[key];
                        delete params[key];
                    }
                }
                var usedPathParams = {};
                // Parsing url for params
                var pathParams = parseUrl(url);
                var _loop_1 = function(i) {
                    var param = pathParams[i];
                    var key = param.substr(1, param.length - 2);
                    var value = null;
                    var isMandatory = key[0] == '!';
                    if (isMandatory) {
                        key = key.substr(1);
                    }
                    // Do we have mapped path param key
                    if (mapParam[key]) {
                        key = mapParam[key].substr(1);
                    }
                    // Getting value from data body
                    if (data && data[key] && (typeof data[key] != 'object')) {
                        // if (data && data[key] && !(data[key] instanceof Object)) {
                        value = data[key];
                        usedPathParams[key] = value;
                    }
                    // Getting default value from params
                    if (!value && params[key] && (typeof params[key] != 'object')) {
                        // if (!value && params[key] && !(params[key] instanceof Object)) {
                        value = params[key];
                        usedPathParams[key] = value;
                    }
                    // Well, all is bad and setting value to empty string
                    if (!value) {
                        // Checking if it's mandatory param
                        if (isMandatory) {
                            mainObservable = Observable_1.Observable.create(function (observer) {
                                observer.onError(new Error('Mandatory ' + param + ' path parameter is missing'));
                            });
                            mainDeferredSubscriber.next();
                            mainDeferredSubscriber.complete();
                            mainDeferredSubscriber = null;
                            return { value: void 0 };
                        }
                        url = url.substr(0, url.indexOf(param));
                        return "break";
                    }
                    // Replacing in the url
                    url = url.replace(param, value);
                };
                for (var i = 0; i < pathParams.length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object") return state_1.value;
                    if (state_1 === "break") break;
                }
                // Removing double slashed from final url
                var urlParts = url.split('//').filter(function (val) { return val !== ''; });
                url = urlParts[0];
                if (urlParts.length > 1) {
                    url += '//' + urlParts.slice(1).join('/');
                }
                // Remove trailing slash
                if (typeof action.removeTrailingSlash === "undefined") {
                    action.removeTrailingSlash = _this.removeTrailingSlash();
                }
                if (action.removeTrailingSlash) {
                    while (url[url.length - 1] == '/') {
                        url = url.substr(0, url.length - 1);
                    }
                }
                // Default search params or data
                var body = null;
                var searchParams;
                if (isGetRequest) {
                    // GET
                    searchParams = Object.assign({}, params, data);
                }
                else {
                    // NON GET
                    if (data) {
                        body = JSON.stringify(data);
                    }
                    searchParams = params;
                }
                // Setting search params
                var search = new http_1.URLSearchParams();
                for (var key in searchParams) {
                    if (!usedPathParams[key]) {
                        var value = searchParams[key];
                        if (typeof value == 'object') {
                            // if (value instanceof Object) {
                            value = JSON.stringify(value);
                        }
                        search.append(key, value);
                    }
                }
                if (!body) {
                    headers.delete('content-type');
                }
                // Creating request options
                var requestOptions = new http_1.RequestOptions({
                    method: action.method,
                    headers: headers,
                    body: body,
                    url: url,
                    search: search
                });
                // Creating request object
                var req = new http_1.Request(requestOptions);
                if (action.requestInterceptor) {
                    action.requestInterceptor(req);
                }
                else {
                    _this.requestInterceptor(req);
                }
                // Doing the request
                var requestObservable = _this.http.request(req);
                requestObservable = action.responseInterceptor ?
                    action.responseInterceptor(requestObservable, req) : _this.responseInterceptor(requestObservable, req);
                if (action.isLazy) {
                    mainObservable = requestObservable;
                }
                else {
                    mainObservable = Observable_1.Observable.create(function (subscriber) {
                        requestObservable.subscribe(function (resp) {
                            if (resp !== null) {
                                if (action.isArray) {
                                    if (!Array.isArray(resp)) {
                                        console.error('Returned data should be an array. Received', resp);
                                    }
                                    else {
                                        Array.prototype.push.apply(ret, resp);
                                    }
                                }
                                else {
                                    if (Array.isArray(resp)) {
                                        console.error('Returned data should be an object. Received', resp);
                                    }
                                    else {
                                        Object.assign(ret, resp);
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
                    });
                }
                mainDeferredSubscriber.next();
                mainDeferredSubscriber.complete();
                mainDeferredSubscriber = null;
            });
            return ret;
        };
        if (descriptor) {
            // attached to member function, go with descriptor
            descriptor.value = actionImplementation;
        }
        else {
            // attached to member property, go with propertyKey
            target[propertyKey] = actionImplementation;
        }
    };
}
exports.ResourceAction = ResourceAction;
exports.RESOURCE_PROVIDERS = [];
exports.RESOURCE_PROVIDERS_SUBSET = {};
var ResourceProviders = (function () {
    function ResourceProviders() {
    }
    ResourceProviders.main = function () {
        return exports.RESOURCE_PROVIDERS;
    };
    ResourceProviders.subSet = function (name) {
        return exports.RESOURCE_PROVIDERS_SUBSET[name] || [];
    };
    return ResourceProviders;
}());
exports.ResourceProviders = ResourceProviders;
function ResourceParams(params) {
    return function (target) {
        var providersList = null;
        if (params.add2Provides !== false) {
            if (params.providersSubSet) {
                if (!exports.RESOURCE_PROVIDERS_SUBSET[params.providersSubSet]) {
                    exports.RESOURCE_PROVIDERS_SUBSET[params.providersSubSet] = [];
                }
                providersList = exports.RESOURCE_PROVIDERS_SUBSET[params.providersSubSet];
            }
            else {
                providersList = exports.RESOURCE_PROVIDERS;
            }
            providersList.push({
                provide: target,
                useFactory: function (http) { return new target(http); },
                deps: [http_1.Http]
            });
        }
        if (typeof params.removeTrailingSlash !== 'undefined') {
            target.prototype.removeTrailingSlash = function () {
                return !!params.removeTrailingSlash;
            };
        }
        if (params.url) {
            target.prototype.getUrl = function () {
                return params.url;
            };
        }
        if (params.path) {
            target.prototype.getPath = function () {
                return params.path;
            };
        }
        if (params.headers) {
            target.prototype.getHeaders = function () {
                return params.headers;
            };
        }
        if (params.params) {
            target.prototype.getParams = function () {
                return params.params;
            };
        }
        if (params.data) {
            target.prototype.getData = function () {
                return params.data;
            };
        }
        if (params.requestInterceptor) {
            target.prototype.requestInterceptor = params.requestInterceptor;
        }
        if (params.responseInterceptor) {
            target.prototype.responseInterceptor = params.responseInterceptor;
        }
    };
}
exports.ResourceParams = ResourceParams;
//# sourceMappingURL=index.js.map