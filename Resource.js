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
    Resource.prototype.requestInterceptor = function (req) {
    };
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
        return null;
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
    Resource.prototype.query = function (data) {
        return null;
    };
    Resource.prototype.remove = function (data) {
        return null;
    };
    Resource.prototype.delete = function (data) {
        return null;
    };
    Resource.urlRegex = new RegExp('{.*(.*)}', 'gm');
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
            method: http_1.RequestMethod.Get,
            isArray: true
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
    ], Resource.prototype, "query", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Delete
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
    ], Resource.prototype, "remove", null);
    __decorate([
        ResourceAction({
            method: http_1.RequestMethod.Delete
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', Observable_1.Observable)
    ], Resource.prototype, "delete", null);
    Resource = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Resource);
    return Resource;
}());
exports.Resource = Resource;
function ResourceAction(action) {
    return function (target, propertyKey, descriptor) {
        // console.log('ResourceAction target: ', target);
        // console.log('ResourceAction propertyKey: ', propertyKey);
        // console.log('ResourceAction descriptor: ', descriptor);
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
            var data = args.length ? args[0] : {};
            var params = action.params || this.getParams() || {};
            // Parsing url for params
            url.match(Resource.urlRegex)
                .map(function (param) {
                var key = param.substr(1, param.length - 2);
                var value = null;
                // Do we have mapped path param key
                if (params[key] && params[key][0] == '@') {
                    key = params[key].substr(1);
                }
                // Getting value from data body
                if (data[key] && !(data[key] instanceof Object)) {
                    value = data[key];
                    if (!isGetRequest) {
                        delete data[key];
                    }
                }
                // If we don't have value, check default value
                if (!value && params[key]) {
                    value = params[key];
                }
                // Well, all is bad and setting value to empty string
                value = value || '';
                console.log(param, key, value);
                // Replacing in the url
                url = url.replace(param, value);
            });
            // Default search params
            // TODO generate new data
            var search;
            if (params)
                if (isGetRequest) {
                    search = new http_1.URLSearchParams();
                }
            var requestOptions = new http_1.RequestOptions({
                method: action.method,
                headers: headers,
                body: data ? JSON.stringify(data) : null,
                url: url,
                search: search
            });
            var req = new http_1.Request(requestOptions);
            this.requestInterceptor(req);
            var observable = this.http.request(req);
            observable = this.responseInterceptor(observable);
            return observable;
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
        target.prototype.getUrl = function () {
            return params.url || '';
        };
        target.prototype.getPath = function () {
            return params.path || '';
        };
        target.prototype.getHeaders = function () {
            return params.headers || null;
        };
        target.prototype.getParams = function () {
            return params.params || null;
        };
    };
}
exports.ResourceParams = ResourceParams;
//# sourceMappingURL=Resource.js.map