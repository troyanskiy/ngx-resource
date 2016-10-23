!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], ["e","a","4","9"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic("2", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {})(this);

  return _retrieveGlobal();
});
$__System.registerDynamic("3", ["4", "5", "6"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var http_1 = $__require("4");
    var Resource_1 = $__require("5");
    var ResourceAction_1 = $__require("6");
    var ResourceCRUD = function (_super) {
        __extends(ResourceCRUD, _super);
        function ResourceCRUD() {
            _super.apply(this, arguments);
        }
        // Alias to save
        ResourceCRUD.prototype.create = function (data, callback) {
            return this.save(data, callback);
        };
        __decorate([ResourceAction_1.ResourceAction({
            isArray: true
        })], ResourceCRUD.prototype, "query");
        __decorate([ResourceAction_1.ResourceAction({
            path: '/{!id}'
        })], ResourceCRUD.prototype, "get");
        __decorate([ResourceAction_1.ResourceAction({
            method: http_1.RequestMethod.Post
        })], ResourceCRUD.prototype, "save");
        __decorate([ResourceAction_1.ResourceAction({
            method: http_1.RequestMethod.Put,
            path: '/{!id}'
        })], ResourceCRUD.prototype, "update");
        __decorate([ResourceAction_1.ResourceAction({
            method: http_1.RequestMethod.Delete,
            path: '/{!id}'
        })], ResourceCRUD.prototype, "remove");
        return ResourceCRUD;
    }(Resource_1.Resource);
    exports.ResourceCRUD = ResourceCRUD;
    return module.exports;
});
$__System.registerDynamic('5', ['7'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var ResourceGlobalConfig_1 = $__require('7');
    var Resource = function () {
        function Resource(http, injector) {
            this.http = http;
            this.injector = injector;
            this._url = null;
            this._path = null;
            this._headers = null;
            this._params = null;
            this._data = null;
            if (this.constructor.model) {
                this.constructor.model.resourceInstance = this;
            }
        }
        /**
         * Get main url of the resource
         * @returns {string|Promise<string>}
         */
        Resource.prototype.getUrl = function () {
            return this._url || this._getUrl() || ResourceGlobalConfig_1.ResourceGlobalConfig.url || '';
        };
        /**
         * Set resource url
         * @param url
         */
        Resource.prototype.setUrl = function (url) {
            this._url = url;
        };
        /**
         * Get path of the resource
         * @returns {string|Promise<string>}
         */
        Resource.prototype.getPath = function () {
            return this._path || this._getPath() || ResourceGlobalConfig_1.ResourceGlobalConfig.path || '';
        };
        /**
         * Set resource path
         * @param path
         */
        Resource.prototype.setPath = function (path) {
            this._path = path;
        };
        /**
         * Get headers
         * @returns {any|Promise<any>}
         */
        Resource.prototype.getHeaders = function () {
            return this._headers || this._getHeaders() || ResourceGlobalConfig_1.ResourceGlobalConfig.headers || {};
        };
        /**
         * Set resource headers
         * @param headers
         */
        Resource.prototype.setHeaders = function (headers) {
            this._headers = headers;
        };
        /**
         * Get default params
         * @returns {any|Promise<any>|{}}
         */
        Resource.prototype.getParams = function () {
            return this._params || this._getParams() || ResourceGlobalConfig_1.ResourceGlobalConfig.params || {};
        };
        /**
         * Set default resource params
         * @param params
         */
        Resource.prototype.setParams = function (params) {
            this._params = params;
        };
        /**
         * Get default data
         * @returns {any|Promise<any>|{}}
         */
        Resource.prototype.getData = function () {
            return this._data || this._getData() || ResourceGlobalConfig_1.ResourceGlobalConfig.data || {};
        };
        /**
         * Set default resource params
         * @param data
         */
        Resource.prototype.setData = function (data) {
            this._data = data;
        };
        /**
         * That is called before executing request
         * @param req
         */
        Resource.prototype.requestInterceptor = function (req) {
            return req;
        };
        /**
         * Request observable interceptor
         * @param observable
         * @returns {Observable<any>}
         */
        Resource.prototype.responseInterceptor = function (observable, req) {
            return observable.map(function (res) {
                return res._body ? res.json() : null;
            });
        };
        Resource.prototype.removeTrailingSlash = function () {
            return true;
        };
        Resource.prototype.map = function (item) {
            return item;
        };
        Resource.prototype.filter = function (item) {
            return true;
        };
        Resource.prototype._getUrl = function () {
            return null;
        };
        Resource.prototype._getPath = function () {
            return null;
        };
        Resource.prototype._getHeaders = function () {
            return null;
        };
        Resource.prototype._getParams = function () {
            return null;
        };
        Resource.prototype._getData = function () {
            return null;
        };
        Resource.prototype._getResourceOptions = function () {
            return null;
        };
        return Resource;
    }();
    exports.Resource = Resource;
    return module.exports;
});
$__System.registerDynamic("8", ["4", "5", "6"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var http_1 = $__require("4");
    var Resource_1 = $__require("5");
    var ResourceAction_1 = $__require("6");
    var ResourceCRUDBase = function (_super) {
        __extends(ResourceCRUDBase, _super);
        function ResourceCRUDBase() {
            _super.apply(this, arguments);
        }
        // Alias to save
        ResourceCRUDBase.prototype.create = function (data, callback) {
            return this.save(data, callback);
        };
        __decorate([ResourceAction_1.ResourceAction({
            isArray: true
        })], ResourceCRUDBase.prototype, "query");
        __decorate([ResourceAction_1.ResourceAction()], ResourceCRUDBase.prototype, "get");
        __decorate([ResourceAction_1.ResourceAction({
            method: http_1.RequestMethod.Post
        })], ResourceCRUDBase.prototype, "save");
        __decorate([ResourceAction_1.ResourceAction({
            method: http_1.RequestMethod.Put
        })], ResourceCRUDBase.prototype, "update");
        __decorate([ResourceAction_1.ResourceAction({
            method: http_1.RequestMethod.Delete
        })], ResourceCRUDBase.prototype, "remove");
        return ResourceCRUDBase;
    }(Resource_1.Resource);
    exports.ResourceCRUDBase = ResourceCRUDBase;
    return module.exports;
});
$__System.registerDynamic('7', [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var ResourceGlobalConfig = function () {
        function ResourceGlobalConfig() {}
        ResourceGlobalConfig.url = null;
        ResourceGlobalConfig.path = null;
        ResourceGlobalConfig.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        ResourceGlobalConfig.params = null;
        ResourceGlobalConfig.data = null;
        return ResourceGlobalConfig;
    }();
    exports.ResourceGlobalConfig = ResourceGlobalConfig;
    return module.exports;
});
$__System.registerDynamic('6', ['4', '9', 'a'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var http_1 = $__require('4');
    var Rx_1 = $__require('9');
    var core_1 = $__require('a');
    function ResourceAction(methodOptions) {
        methodOptions = methodOptions || {};
        if (methodOptions.method === undefined) {
            methodOptions.method = http_1.RequestMethod.Get;
        }
        if (methodOptions.useModel === undefined) {
            methodOptions.useModel = true;
        }
        return function (target, propertyKey) {
            target[propertyKey] = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var resourceOptions = this._getResourceOptions();
                var isGetRequest = methodOptions.method === http_1.RequestMethod.Get;
                var ret;
                var resourceModel;
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
                var mainDeferredSubscriber = null;
                var mainObservable = null;
                ret.$resolved = false;
                ret.$observable = Rx_1.Observable.create(function (subscriber) {
                    mainDeferredSubscriber = subscriber;
                }).flatMap(function () {
                    return mainObservable;
                });
                ret.$abortRequest = function () {
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
                    ret.$observable.connect();
                }
                Promise.all([Promise.resolve(methodOptions.url || this.getUrl()), Promise.resolve(methodOptions.path || this.getPath()), Promise.resolve(methodOptions.headers || this.getHeaders()), Promise.resolve(methodOptions.params || this.getParams()), Promise.resolve(methodOptions.data || this.getData())]).then(function (dataAll) {
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
                        } else if (typeof callback !== 'function') {
                            var tmpData = callback;
                            callback = data;
                            data = tmpData;
                        } else {
                            data = null;
                        }
                    }
                    data = Object.assign({}, dataAll[4], data);
                    var pathParams = url.match(/{([^}]*)}/g) || [];
                    var usedPathParams = {};
                    var _loop_1 = function (i) {
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
                            delete data[pathKey];
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
                        // Replacing in the url
                        url = url.replace(pathParam, value);
                    };
                    for (var i = 0; i < pathParams.length; i++) {
                        var state_1 = _loop_1(i);
                        if (typeof state_1 === "object") return state_1.value;
                        if (state_1 === "break") break;
                    }
                    // Removing double slashed from final url
                    url = url.replace(/\/\/+/g, '/');
                    if (url.startsWith('http')) {
                        url = url.replace(':/', '://');
                    }
                    // Remove trailing slash
                    if (typeof methodOptions.removeTrailingSlash === 'undefined') {
                        methodOptions.removeTrailingSlash = _this.removeTrailingSlash();
                    }
                    if (methodOptions.removeTrailingSlash) {
                        while (url[url.length - 1] === '/') {
                            url = url.substr(0, url.length - 1);
                        }
                    }
                    // Remove mapped params
                    for (var key in defPathParams) {
                        if (defPathParams[key][0] === '@') {
                            delete defPathParams[key];
                        }
                    }
                    // Default search params or data
                    var body = null;
                    var searchParams;
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
                    var search = new http_1.URLSearchParams();
                    for (var key in searchParams) {
                        if (!usedPathParams[key]) {
                            var value = searchParams[key];
                            if (Array.isArray(value)) {
                                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                                    var arr_value = value_1[_i];
                                    search.append(key, arr_value);
                                }
                                continue;
                            } else if (typeof value === 'object') {
                                // if (value instanceof Object) {
                                value = JSON.stringify(value);
                                search.append(key, value);
                                continue;
                            }
                            search.append(key, value);
                        }
                    }
                    // Adding TS if needed
                    var tsName = methodOptions.addTimestamp || resourceOptions.addTimestamp;
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
                    var requestOptions = new http_1.RequestOptions({
                        method: methodOptions.method,
                        headers: headers,
                        body: body,
                        url: url,
                        search: search
                    });
                    // Creating request object
                    var req = new http_1.Request(requestOptions);
                    req = methodOptions.requestInterceptor ? methodOptions.requestInterceptor(req) : _this.requestInterceptor(req);
                    if (!req) {
                        mainObservable = Rx_1.Observable.create(function (observer) {
                            observer.error(new Error('Request is null'));
                        });
                        console.warn('Request is null');
                        releaseMainDeferredSubscriber();
                        return;
                    }
                    // Doing the request
                    var requestObservable = _this.http.request(req);
                    // noinspection TypeScriptValidateTypes
                    requestObservable = methodOptions.responseInterceptor ? methodOptions.responseInterceptor(requestObservable, req) : _this.responseInterceptor(requestObservable, req);
                    if (methodOptions.isLazy) {
                        mainObservable = requestObservable;
                    } else {
                        mainObservable = Rx_1.Observable.create(function (subscriber) {
                            var reqSubscr = requestObservable.subscribe(function (resp) {
                                if (resp !== null) {
                                    var map = methodOptions.map ? methodOptions.map : _this.map;
                                    var filter = methodOptions.filter ? methodOptions.filter : _this.filter;
                                    if (methodOptions.isArray) {
                                        if (!Array.isArray(resp)) {
                                            console.error('Returned data should be an array. Received', resp);
                                        } else {
                                            var result = resp.filter(filter).map(map);
                                            result = !!resourceModel ? mapToModel.bind(_this)(result, resourceModel) : result;
                                            Array.prototype.push.apply(ret, result);
                                        }
                                    } else {
                                        if (Array.isArray(resp)) {
                                            console.error('Returned data should be an object. Received', resp);
                                        } else {
                                            if (filter(resp)) {
                                                if (!!resourceModel) {
                                                    ret.$fillFromObject(map(resp));
                                                } else {
                                                    Object.assign(ret, map(resp));
                                                }
                                            }
                                        }
                                    }
                                }
                                subscriber.next(resp);
                            }, function (err) {
                                return subscriber.error(err);
                            }, function () {
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
                var modelInstance = new model(...injection).$fillFromObject(item);
                modelInstance.$resource = this;
                result.push(modelInstance);
            }
        } else {
            result = new model(...injection).$fillFromObject(resp);
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
    return module.exports;
});
$__System.registerDynamic('b', ['6'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var ResourceAction_1 = $__require('6');
    function ResourceModelParams(params) {
        return function (target) {
            var providers = [];
            if (params) {
                providers = params.providers || [];
            }
            Reflect.defineMetadata('providers', providers, target);
        };
    }
    exports.ResourceModelParams = ResourceModelParams;
    var ResourceModel = function () {
        function ResourceModel() {
            this.$primaryKey = 'id';
        }
        ResourceModel.create = function (data, commit) {
            if (data === void 0) {
                data = {};
            }
            if (commit === void 0) {
                commit = true;
            }
            if (!this.resourceInstance) {
                console.error('You should first instantiate Resource by injecting.');
            }
            var result = ResourceAction_1.mapToModel.bind(this.resourceInstance)(data, this);
            if (commit) {
                result = result.$save();
            }
            return result;
        };
        ResourceModel.prototype.$fillFromObject = function (_object) {
            for (var propName in _object) {
                this[propName] = _object[propName];
            }
            return this;
        };
        ResourceModel.prototype.$getData = function () {
            var _object = {};
            for (var propName in this) {
                if (!(this[propName] instanceof Function) && !(propName.charAt(0) === '$')) {
                    _object[propName] = this[propName];
                }
            }
            return _object;
        };
        ResourceModel.prototype.$save = function () {
            if (this[this.$primaryKey]) {
                return this.$update();
            } else {
                return this.$create();
            }
        };
        ResourceModel.prototype.$update = function () {
            return this.$resource_method('update');
        };
        ResourceModel.prototype.$remove = function () {
            return this.$resource_method('remove');
        };
        ResourceModel.prototype.$resource_method = function (method_name) {
            var _this = this;
            var _method = this.$resource[method_name];
            if (!_method) {
                console.error("Your Resource has no implemented " + method_name + " method.");
                return;
            }
            var data = method_name === 'remove' ? { id: this[this.$primaryKey] } : this.$getData();
            var result = _method.bind(this.$resource)(data);
            this.$resolved = result.$resolved;
            this.$observable = result.$observable;
            this.$abortRequest = result.$abortRequest;
            this.$observable.subscribe(function (resp) {
                _this.$fillFromObject(resp.$getData());
            });
            return this;
        };
        ResourceModel.prototype.$create = function () {
            return this.$resource_method('create');
        };
        return ResourceModel;
    }();
    exports.ResourceModel = ResourceModel;
    return module.exports;
});
$__System.registerDynamic('c', ['a', '4'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('a');
    var http_1 = $__require('4');
    var ResourceProviders = function () {
        function ResourceProviders() {}
        ResourceProviders.add = function (resource, subSet) {
            if (subSet === void 0) {
                subSet = null;
            }
            if (!subSet) {
                subSet = this.mainProvidersName;
            }
            if (!this.providers[subSet]) {
                this.providers[subSet] = [];
            }
            var deps = Reflect.getMetadata('design:paramtypes', resource);
            if (deps.length === 0) {
                deps = [http_1.Http, core_1.Injector];
            }
            this.providers[subSet].push({
                provide: resource,
                useFactory: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return new resource(...args);
                },
                deps: deps
            });
        };
        ResourceProviders.get = function (subSet) {
            if (subSet === void 0) {
                subSet = null;
            }
            if (!subSet) {
                subSet = this.mainProvidersName;
            }
            return this.providers[subSet] || [];
        };
        ResourceProviders.mainProvidersName = '__mainProviders';
        ResourceProviders.providers = {
            __mainProviders: []
        };
        return ResourceProviders;
    }();
    exports.ResourceProviders = ResourceProviders;
    return module.exports;
});
$__System.registerDynamic('d', ['c'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var ResourceProviders_1 = $__require('c');
    function ResourceParams(params) {
        if (params === void 0) {
            params = {};
        }
        return function (target) {
            target.prototype._getResourceOptions = function () {
                return params;
            };
            if (params.add2Provides !== false) {
                ResourceProviders_1.ResourceProviders.add(target, params.providersSubSet);
            }
            if (typeof params.removeTrailingSlash !== 'undefined') {
                target.prototype.removeTrailingSlash = function () {
                    return !!params.removeTrailingSlash;
                };
            }
            if (params.url) {
                target.prototype._getUrl = function () {
                    return params.url;
                };
            }
            if (params.path) {
                target.prototype._getPath = function () {
                    return params.path;
                };
            }
            if (params.headers) {
                target.prototype._getHeaders = function () {
                    return params.headers;
                };
            }
            if (params.params) {
                target.prototype._getParams = function () {
                    return params.params;
                };
            }
            if (params.data) {
                target.prototype._getData = function () {
                    return params.data;
                };
            }
        };
    }
    exports.ResourceParams = ResourceParams;
    return module.exports;
});
$__System.register("1", ["a", "e", "4", "c", "2", "5", "6", "3", "8", "7", "b", "d"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, http_1, ResourceProviders_1;
    var __decorate, __metadata, ResourceModule;
    var exportedNames_1 = {
        'ResourceModule': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ResourceProviders_1_1) {
                ResourceProviders_1 = ResourceProviders_1_1;
                exportStar_1(ResourceProviders_1_1);
            },
            function (Interfaces_1_1) {
                exportStar_1(Interfaces_1_1);
            },
            function (Resource_1_1) {
                exportStar_1(Resource_1_1);
            },
            function (ResourceAction_1_1) {
                exportStar_1(ResourceAction_1_1);
            },
            function (ResourceCRUD_1_1) {
                exportStar_1(ResourceCRUD_1_1);
            },
            function (ResourceCRUDBase_1_1) {
                exportStar_1(ResourceCRUDBase_1_1);
            },
            function (ResourceGlobalConfig_1_1) {
                exportStar_1(ResourceGlobalConfig_1_1);
            },
            function (ResourceModel_1_1) {
                exportStar_1(ResourceModel_1_1);
            },
            function (ResourceParams_1_1) {
                exportStar_1(ResourceParams_1_1);
            }],
        execute: function() {
            __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };
            __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(k, v);
            };
            exports_1("ResourceModule", ResourceModule = (function () {
                function ResourceModule() {
                }
                ResourceModule.forRoot = function () {
                    return {
                        ngModule: ResourceModule,
                        providers: ResourceProviders_1.ResourceProviders.providers[ResourceProviders_1.ResourceProviders.mainProvidersName]
                    };
                };
                ResourceModule.forChild = function (subSet) {
                    return {
                        ngModule: ResourceModule,
                        providers: ResourceProviders_1.ResourceProviders.providers[subSet] ? ResourceProviders_1.ResourceProviders.providers[subSet] : []
                    };
                };
                ResourceModule = __decorate([
                    core_1.NgModule({
                        imports: [common_1.CommonModule, http_1.HttpModule]
                    }),
                    __metadata('design:paramtypes', [])
                ], ResourceModule);
                return ResourceModule;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXJlc291cmNlLXJlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzItcmVzb3VyY2UtcmVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBQUksVUFBVSxFQU1WLFVBQVUsRUFnQkgsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBdEJyQixVQUFVLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSTtnQkFDakYsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM3SCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQztvQkFBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0gsSUFBSTtvQkFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEosTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDO1lBQ0UsVUFBVSxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQztvQkFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0csQ0FBQyxDQUFDO1lBY1MsNEJBQUEsY0FBYyxHQUFHLENBQUM7Z0JBQ3pCO2dCQUNBLENBQUM7Z0JBQ0QsY0FBYyxDQUFDLE9BQU8sR0FBRztvQkFDckIsTUFBTSxDQUFDO3dCQUNILFFBQVEsRUFBRSxjQUFjO3dCQUN4QixTQUFTLEVBQUUscUNBQWlCLENBQUMsU0FBUyxDQUFDLHFDQUFpQixDQUFDLGlCQUFpQixDQUFDO3FCQUM5RSxDQUFDO2dCQUNOLENBQUMsQ0FBQztnQkFDRixjQUFjLENBQUMsUUFBUSxHQUFHLFVBQVUsTUFBTTtvQkFDdEMsTUFBTSxDQUFDO3dCQUNILFFBQVEsRUFBRSxjQUFjO3dCQUN4QixTQUFTLEVBQUUscUNBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLHFDQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO3FCQUM1RixDQUFDO2dCQUNOLENBQUMsQ0FBQztnQkFDRixjQUFjLEdBQUcsVUFBVSxDQUFDO29CQUN4QixlQUFRLENBQUM7d0JBQ0wsT0FBTyxFQUFFLENBQUMscUJBQVksRUFBRSxpQkFBVSxDQUFDO3FCQUN0QyxDQUFDO29CQUNGLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7aUJBQ3RDLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDMUIsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDOzs7O0FBQ0wsa3BGQUFrcEYifQ==
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/common","@angular/core","@angular/http","rxjs/Rx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/http"), require("rxjs/Rx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});