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
require("rxjs/Rx");
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var Observable_1 = require("rxjs/Observable");
var Resource = (function () {
    function Resource(http) {
        this.http = http;
    }
    Resource.prototype.requestInterceptor = function (req) { };
    Resource.prototype.responseInterceptor = function (observable) {
        return observable.map(function (res) { return res.json(); });
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
// export class ObservableResource<T> extends Observable<T> {
//
// 	returnArray: boolean = false;
//
// 	$ng1() {}
//
// }
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
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var isGetRequest = action.method === http_1.RequestMethod.Get;
            // Creating URL
            var url = (action.url ? action.url : this.getUrl()) +
                (action.path ? action.path : this.getPath());
            // Creating Headers
            var headers = new http_1.Headers(action.headers || this.getHeaders());
            // Setting data
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
            var params = Object.assign({}, action.params || this.getParams());
            // Setting default data parameters
            var defData = action.data || this.getData();
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
                if (data && data[key] && !(data[key] instanceof Object)) {
                    value = data[key];
                    usedPathParams[key] = value;
                }
                // Getting default value from params
                if (!value && params[key] && !(params[key] instanceof Object)) {
                    value = params[key];
                    usedPathParams[key] = value;
                }
                // Well, all is bad and setting value to empty string
                if (!value) {
                    // Checking if it's mandatory param
                    if (isMandatory) {
                        return { value: Observable_1.Observable.create(function (observer) {
                            observer.onError(new Error('Mandatory ' + param + ' path parameter is missing'));
                        }) };
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
            // Removing doulble slashed from final url
            var urlParts = url.split('//').filter(function (val) { return val !== ''; });
            url = urlParts[0];
            if (urlParts.length > 1) {
                url += '//' + urlParts.slice(1).join('/');
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
                    if (value instanceof Object) {
                        value = JSON.stringify(value);
                    }
                    search.append(key, value);
                }
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
                this.requestInterceptor(req);
            }
            // Doing the request
            var observable = this.http.request(req);
            observable = action.responseInterceptor ?
                action.responseInterceptor(observable) : this.responseInterceptor(observable);
            var ret;
            if (action.isPending) {
                ret = {};
            }
            else {
                ret = action.isArray ? [] : {};
            }
            ret.$resolved = false;
            ret.$observable = observable;
            if (action.isPending != null) {
                console.warn('isPending is deprecated. Please use isLazy instead');
                if (action.isLazy == null) {
                    action.isLazy = action.isPending;
                }
            }
            if (!action.isLazy) {
                ret.$observable = ret.$observable.publish();
                ret.$observable.connect();
                ret.$observable.subscribe(function (resp) {
                    if (action.isArray) {
                        if (!Array.isArray(resp)) {
                            console.error('Returned data should be an array. Received', resp);
                            return;
                        }
                        Array.prototype.push.apply(ret, resp);
                    }
                    else {
                        if (Array.isArray(resp)) {
                            console.error('Returned data should be an object. Received', resp);
                            return;
                        }
                        Object.assign(ret, resp);
                    }
                }, function (err) { }, function () {
                    ret.$resolved = true;
                    if (callback) {
                        callback(ret);
                    }
                });
            }
            return ret;
        };
    };
}
exports.ResourceAction = ResourceAction;
exports.RESOURCE_PROVIDERS = [];
function ResourceProvide() {
    return function () {
        console.warn('ResourceProvide decorator is deprecated.');
    };
}
exports.ResourceProvide = ResourceProvide;
function ResourceParams(params) {
    return function (target) {
        if (params.add2Provides !== false) {
            exports.RESOURCE_PROVIDERS.push(core_1.provide(target, {
                useFactory: function (http) { return new target(http); },
                deps: [http_1.Http]
            }));
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