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
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var Observable_1 = require("rxjs/Observable");
var Resource = (function () {
    function Resource(http) {
        this.http = http;
    }
    Resource.prototype.requestInterceptor = function (req) { };
    Resource.prototype.responseInterceptor = function (observable) {
        observable.map(function (res) { return res.json(); });
        return observable;
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
    Resource.prototype.get = function (data) {
        return null;
    };
    Resource.prototype.save = function (data) {
        return null;
    };
    Resource.prototype.update = function (data) {
        return null;
    };
    Resource.prototype.remove = function (data) {
        return null;
    };
    Resource.prototype.delete = function (data) {
        return this.remove(data);
    };
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Get
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
    ], Resource.prototype, "get", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Post
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
    ], Resource.prototype, "save", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Put
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
    ], Resource.prototype, "update", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Delete
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
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
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log(args);
            var isGetRequest = action.method === http_1.RequestMethod.Get;
            // Creating URL
            var url = (action.url ? action.url : this.getUrl()) +
                (action.path ? action.path : this.getPath());
            // Creating Headers
            var headers = new http_1.Headers(action.headers || this.getHeaders());
            // Setting data
            var data = args.length ? args[0] : null;
            var params = Object.assign({}, action.params || this.getParams() || null);
            var mapParam = {};
            // Merging default params with data
            for (var key in params) {
                if (typeof params[key] == 'string' && params[key][0] == '@') {
                    mapParam[key] = params[key];
                    delete params[key];
                }
            }
            var usedPathParams = {};
            // Parsing url for params
            parseUrl(url)
                .map(function (param) {
                var key = param.substr(1, param.length - 2);
                var value = null;
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
                value = value || '';
                // Replacing in the url
                url = url.replace(param, value);
            });
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
            var requestOptions = new http_1.RequestOptions({
                method: action.method,
                headers: headers,
                body: body,
                url: url,
                search: search
            });
            var req = new http_1.Request(requestOptions);
            if (action.requestInterceptor) {
                action.requestInterceptor(req);
            }
            else {
                this.requestInterceptor(req);
            }
            var observable = this.http.request(req);
            return action.responseInterceptor ?
                action.responseInterceptor(observable) : this.responseInterceptor(observable);
        };
    };
}
exports.ResourceAction = ResourceAction;
exports.RESOURCE_PROVIDERS = [];
function ResourceParams(params) {
    return function (target) {
        exports.RESOURCE_PROVIDERS.push(core_1.provide(target, {
            useFactory: function (http) { return new target(http); },
            deps: [http_1.Http]
        }));
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
        if (params.requestInterceptor) {
            target.prototype.requestInterceptor = params.requestInterceptor;
        }
        if (params.responseInterceptor) {
            target.prototype.responseInterceptor = params.responseInterceptor;
        }
    };
}
exports.ResourceParams = ResourceParams;
//# sourceMappingURL=Resource.js.map