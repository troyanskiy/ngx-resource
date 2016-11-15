!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], ["e","a","4","9"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic("2", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {})(this);

  return _retrieveGlobal();
});
$__System.register("3", ["4", "5", "6"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Resource_1, ResourceAction_1;
    var __extends, __decorate, __metadata, ResourceCRUD;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Resource_1_1) {
                Resource_1 = Resource_1_1;
            },
            function (ResourceAction_1_1) {
                ResourceAction_1 = ResourceAction_1_1;
            }],
        execute: function() {
            __extends = (this && this.__extends) || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
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
            exports_1("ResourceCRUD", ResourceCRUD = (function (_super) {
                __extends(ResourceCRUD, _super);
                function ResourceCRUD() {
                    _super.apply(this, arguments);
                }
                // Alias to save
                ResourceCRUD.prototype.create = function (data, callback) {
                    return this.save(data, callback);
                };
                __decorate([
                    ResourceAction_1.ResourceAction({
                        isArray: true
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUD.prototype, "query", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        path: '/{!id}'
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUD.prototype, "get", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        method: http_1.RequestMethod.Post
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUD.prototype, "save", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        method: http_1.RequestMethod.Put,
                        path: '/{!id}'
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUD.prototype, "update", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        method: http_1.RequestMethod.Delete,
                        path: '/{!id}'
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUD.prototype, "remove", void 0);
                return ResourceCRUD;
            }(Resource_1.Resource)));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VDUlVELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb3VyY2VDUlVELmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFBSSxTQUFTLEVBS1QsVUFBVSxFQU1WLFVBQVUsRUFNSCxZQUFZOzs7Ozs7Ozs7Ozs7O1lBakJuQixTQUFTLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELGdCQUFnQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6RixDQUFDLENBQUM7WUFDRSxVQUFVLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSTtnQkFDakYsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM3SCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQztvQkFBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0gsSUFBSTtvQkFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEosTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDO1lBQ0UsVUFBVSxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQztvQkFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0csQ0FBQyxDQUFDO1lBSVMsMEJBQUEsWUFBWSxHQUFHLENBQUMsVUFBVSxNQUFNO2dCQUN2QyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQztvQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFDRCxnQkFBZ0I7Z0JBQ2hCLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVE7b0JBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDO2dCQUNGLFVBQVUsQ0FBQztvQkFDUCwrQkFBYyxDQUFDO3dCQUNYLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixDQUFDO29CQUNGLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2lCQUN0QyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLFVBQVUsQ0FBQztvQkFDUCwrQkFBYyxDQUFDO3dCQUNYLElBQUksRUFBRSxRQUFRO3FCQUNqQixDQUFDO29CQUNGLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2lCQUN0QyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLFVBQVUsQ0FBQztvQkFDUCwrQkFBYyxDQUFDO3dCQUNYLE1BQU0sRUFBRSxvQkFBYSxDQUFDLElBQUk7cUJBQzdCLENBQUM7b0JBQ0YsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3RDLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsVUFBVSxDQUFDO29CQUNQLCtCQUFjLENBQUM7d0JBQ1gsTUFBTSxFQUFFLG9CQUFhLENBQUMsR0FBRzt3QkFDekIsSUFBSSxFQUFFLFFBQVE7cUJBQ2pCLENBQUM7b0JBQ0YsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3RDLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsVUFBVSxDQUFDO29CQUNQLCtCQUFjLENBQUM7d0JBQ1gsTUFBTSxFQUFFLG9CQUFhLENBQUMsTUFBTTt3QkFDNUIsSUFBSSxFQUFFLFFBQVE7cUJBQ2pCLENBQUM7b0JBQ0YsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3RDLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QixDQUFDLENBQUMsbUJBQVEsQ0FBQyxDQUFDLENBQUEsQ0FBQzs7OztBQUNiLDA1RUFBMDVFIn0=
$__System.register("5", ["7"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResourceGlobalConfig_1;
    var Resource;
    return {
        setters:[
            function (ResourceGlobalConfig_1_1) {
                ResourceGlobalConfig_1 = ResourceGlobalConfig_1_1;
            }],
        execute: function() {
            exports_1("Resource", Resource = (function () {
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
                    return observable.map(function (res) { return res._body ? res.json() : null; });
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
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBQ1csUUFBUTs7Ozs7OztZQUFSLHNCQUFBLFFBQVEsR0FBRyxDQUFDO2dCQUNuQixrQkFBa0IsSUFBSSxFQUFFLFFBQVE7b0JBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztvQkFDbkQsQ0FBQztnQkFDTCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUc7b0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSwyQ0FBb0IsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUN6RSxDQUFDLENBQUM7Z0JBQ0Y7OzttQkFHRztnQkFDSCxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUc7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNwQixDQUFDLENBQUM7Z0JBQ0Y7OzttQkFHRztnQkFDSCxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FB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
$__System.register("8", ["4", "5", "6"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Resource_1, ResourceAction_1;
    var __extends, __decorate, __metadata, ResourceCRUDBase;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Resource_1_1) {
                Resource_1 = Resource_1_1;
            },
            function (ResourceAction_1_1) {
                ResourceAction_1 = ResourceAction_1_1;
            }],
        execute: function() {
            __extends = (this && this.__extends) || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
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
            exports_1("ResourceCRUDBase", ResourceCRUDBase = (function (_super) {
                __extends(ResourceCRUDBase, _super);
                function ResourceCRUDBase() {
                    _super.apply(this, arguments);
                }
                // Alias to save
                ResourceCRUDBase.prototype.create = function (data, callback) {
                    return this.save(data, callback);
                };
                __decorate([
                    ResourceAction_1.ResourceAction({
                        isArray: true
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUDBase.prototype, "query", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction(),
                    __metadata('design:type', Function)
                ], ResourceCRUDBase.prototype, "get", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        method: http_1.RequestMethod.Post
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUDBase.prototype, "save", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        method: http_1.RequestMethod.Put
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUDBase.prototype, "update", void 0);
                __decorate([
                    ResourceAction_1.ResourceAction({
                        method: http_1.RequestMethod.Delete
                    }),
                    __metadata('design:type', Function)
                ], ResourceCRUDBase.prototype, "remove", void 0);
                return ResourceCRUDBase;
            }(Resource_1.Resource)));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VDUlVEQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlc291cmNlQ1JVREJhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQUFJLFNBQVMsRUFLVCxVQUFVLEVBTVYsVUFBVSxFQU1ILGdCQUFnQjs7Ozs7Ozs7Ozs7OztZQWpCdkIsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN0RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekYsQ0FBQyxDQUFDO1lBQ0UsVUFBVSxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUk7Z0JBQ2pGLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMs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
$__System.register("7", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResourceGlobalConfig;
    return {
        setters:[],
        execute: function() {
            exports_1("ResourceGlobalConfig", ResourceGlobalConfig = (function () {
                function ResourceGlobalConfig() {
                }
                ResourceGlobalConfig.url = null;
                ResourceGlobalConfig.path = null;
                ResourceGlobalConfig.headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };
                ResourceGlobalConfig.params = null;
                ResourceGlobalConfig.data = null;
                return ResourceGlobalConfig;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VHbG9iYWxDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZXNvdXJjZUdsb2JhbENvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFBVyxvQkFBb0I7Ozs7WUFBcEIsa0NBQUEsb0JBQW9CLEdBQUcsQ0FBQztnQkFDL0I7Z0JBQ0EsQ0FBQztnQkFDRCxvQkFBb0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxvQkFBb0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQyxvQkFBb0IsQ0FBQyxPQUFPLEdBQUc7b0JBQzNCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDLENBQUM7Z0JBQ0Ysb0JBQW9CLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkMsb0JBQW9CLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQzs7OztBQUNMLHNtQ0FBc21DIn0=
$__System.register("6", ["4", "9", "a"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Rx_1, core_1;
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
                    }
                    else {
                        resourceModel = methodOptions.model || this.constructor['model'];
                    }
                }
                if (resourceModel && !methodOptions.isArray) {
                    ret = resourceModel.create({}, false);
                }
                else if (methodOptions.isLazy) {
                    ret = {};
                }
                else {
                    ret = methodOptions.isArray ? [] : {};
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
                Promise.all([
                    Promise.resolve(methodOptions.url || this.getUrl()),
                    Promise.resolve(methodOptions.path || this.getPath()),
                    Promise.resolve(methodOptions.headers || this.getHeaders()),
                    Promise.resolve(methodOptions.params || this.getParams()),
                    Promise.resolve(methodOptions.data || this.getData())
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
                    var usedPathParams = {};
                    if (!Array.isArray(data)) {
                        data = Object.assign({}, dataAll[4], data);
                        var pathParams = url.match(/{([^}]*)}/g) || [];
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
                            if (typeof state_1 === "object")
                                return state_1.value;
                            if (state_1 === "break")
                                break;
                        }
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
                    }
                    else {
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
                            }
                            else {
                                if (typeof value === 'object') {
                                    /// Convert dates to ISO format string
                                    if (value instanceof Date) {
                                        value = value.toISOString();
                                    }
                                    else {
                                        value = JSON.stringify(value);
                                    }
                                }
                                search.append(key, value);
                            }
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
                    req = methodOptions.requestInterceptor ?
                        methodOptions.requestInterceptor(req) :
                        _this.requestInterceptor(req);
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
                    requestObservable = methodOptions.responseInterceptor ?
                        methodOptions.responseInterceptor(requestObservable, req) :
                        _this.responseInterceptor(requestObservable, req);
                    if (methodOptions.isLazy) {
                        mainObservable = requestObservable;
                    }
                    else {
                        mainObservable = Rx_1.Observable.create(function (subscriber) {
                            var reqSubscr = requestObservable.subscribe(function (resp) {
                                if (resp !== null) {
                                    var map = methodOptions.map ? methodOptions.map : _this.map;
                                    var filter = methodOptions.filter ? methodOptions.filter : _this.filter;
                                    if (methodOptions.isArray) {
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
    exports_1("ResourceAction", ResourceAction);
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
    exports_1("mapToModel", mapToModel);
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
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VBY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZXNvdXJjZUFjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBR0Esd0JBQStCLGFBQWE7UUFDeEMsYUFBYSxHQUFHLGFBQWEsSUFBSSxFQUFFLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsb0JBQWEsQ0FBQyxHQUFHLENBQUM7UUFDN0MsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN2QyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsTUFBTSxFQUFFLFdBQVc7WUFDaEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHO2dCQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQ2pELElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEtBQUssb0JBQWEsQ0FBQyxHQUFHLENBQUM7Z0JBQzlELElBQUksR0FBRyxDQUFDO2dCQUNSLElBQUksYUFBYSxDQUFDO2dCQUNsQixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMs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
$__System.register("b", ["6"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResourceAction_1;
    var ResourceModel;
    function ResourceModelParams(params) {
        return function (target) {
            var providers = [];
            if (params) {
                providers = params.providers || [];
            }
            Reflect.defineMetadata('providers', providers, target);
        };
    }
    exports_1("ResourceModelParams", ResourceModelParams);
    return {
        setters:[
            function (ResourceAction_1_1) {
                ResourceAction_1 = ResourceAction_1_1;
            }],
        execute: function() {
            exports_1("ResourceModel", ResourceModel = (function () {
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
                    }
                    else {
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
                        return this;
                    }
                    var data = (method_name === 'remove') ? { id: this[this.$primaryKey] } : this.$getData();
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
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlc291cmNlTW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVVXLGFBQWE7SUFUeEIsNkJBQW9DLE1BQU07UUFDdEMsTUFBTSxDQUFDLFVBQVUsTUFBTTtZQUNuQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVCxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUNELE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUM7SUFDTixDQUFDO0lBUkQscURBUUMsQ0FBQTs7Ozs7OztZQUNVLDJCQUFBLGFBQWEsR0FBRyxDQUFDO2dCQUN4QjtvQkFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxhQUFhLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxFQUFFLE1BQU07b0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFBQyxDQUFDO29CQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQUMsQ0FBQztvQkFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7b0JBQ3pFLENBQUM7b0JBQ0QsSUFBSSxNQUFNLEdBQUcsMkJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENB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
$__System.register("c", ["a", "4"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1;
    var ResourceProviders;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            exports_1("ResourceProviders", ResourceProviders = (function () {
                function ResourceProviders() {
                }
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
                            return new (resource.bind.apply(resource, [void 0].concat(args)))();
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
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VQcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZXNvdXJjZVByb3ZpZGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBRVcsaUJBQWlCOzs7Ozs7Ozs7O1lBQWpCLCtCQUFBLGlCQUFpQixHQUFHLENBQUM7Z0JBQzVCO2dCQUNBLENBQUM7Z0JBQ0QsaUJBQWlCLENBQUMsR0FBRyxHQUFHLFVBQVUsUUFBUSxFQUFFLE1BQU07b0JBQzlDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFBQyxDQUFDO29CQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztvQkFDcEMsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDaEMsQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksR0FBRyxDQUFDLFdBQUksRUFBRSxlQUFRLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztvQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDeEIsT0FBTyxFQUFFLFFBQVE7d0JBQ2pCLFVBQVUsRUFBRTs0QkFDUixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7NEJBQ2QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0NBQzNDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUNqQyxDQUFDOzRCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3hFLENBQUM7d0JBQ0QsSUFBSSxFQUFFLElBQUk7cUJBQ2IsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQztnQkFDRixpQkFBaUIsQ0FBQyxHQUFHLEdBQUcsVUFBVSxNQUFNO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQUMsQ0FBQztvQkFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNWLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN4QyxDQUFDLENBQUM7Z0JBQ0YsaUJBQWlCLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ3hELGlCQUFpQixDQUFDLFNBQVMsR0FBRztvQkFDMUIsZUFBZSxFQUFFLEVBQUU7aUJBQ3RCLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQzs7OztBQUNMLDh0R0FBOHRHIn0=
$__System.register("d", ["c"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResourceProviders_1;
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
    exports_1("ResourceParams", ResourceParams);
    return {
        setters:[
            function (ResourceProviders_1_1) {
                ResourceProviders_1 = ResourceProviders_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VQYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJSZXNvdXJjZVBhcmFtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQ0Esd0JBQStCLE1BQU07UUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxVQUFVLE1BQU07WUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRztnQkFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLHFDQUFpQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHO29CQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDO1lBQ04sQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHO29CQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDO1lBQ04sQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHO29CQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDdkIsQ0FBQyxDQUFDO1lBQ04sQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRztvQkFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQzFCLENBQUMsQ0FBQztZQUNOLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUc7b0JBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN6QixDQUFDLENBQUM7WUFDTixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUc7b0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN2QixDQUFDLENBQUM7WUFDTixDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQXhDRCwyQ0F3Q0MsQ0FBQTs7Ozs7Ozs7OztBQUNELDhzSEFBOHNIIn0=
$__System.register("1", ["a", "e", "4", "c", "2", "5", "6", "3", "8", "7", "b", "d"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, http_1, ResourceProviders_1;
    var ResourceModule;
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
                ResourceModule.decorators = [
                    { type: core_1.NgModule, args: [{
                                imports: [common_1.CommonModule, http_1.HttpModule]
                            },] },
                ];
                /** @nocollapse */
                ResourceModule.ctorParameters = [];
                return ResourceModule;
            }()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXJlc291cmNlLXJlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzItcmVzb3VyY2UtcmVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBYVcsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQWQsNEJBQUEsY0FBYyxHQUFHLENBQUM7Z0JBQ3pCO2dCQUNBLENBQUM7Z0JBQ0QsY0FBYyxDQUFDLE9BQU8sR0FBRztvQkFDckIsTUFBTSxDQUFDO3dCQUNILFFBQVEsRUFBRSxjQUFjO3dCQUN4QixTQUFTLEVBQUUscUNBQWlCLENBQUMsU0FBUyxDQUFDLHFDQUFpQixDQUFDLGlCQUFpQixDQUFDO3FCQUM5RSxDQUFDO2dCQUNOLENBQUMsQ0FBQztnQkFDRixjQUFjLENBQUMsUUFBUSxHQUFHLFVBQVUsTUFBTTtvQkFDdEMsTUFBTSxDQUFDO3dCQUNILFFBQVEsRUFBRSxjQUFjO3dCQUN4QixTQUFTLEVBQUUscUNBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLHFDQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO3FCQUM1RixDQUFDO2dCQUNOLENBQUMsQ0FBQztnQkFDRixjQUFjLENBQUMsVUFBVSxHQUFHO29CQUN4QixFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0NBQ2IsT0FBTyxFQUFFLENBQUMscUJBQVksRUFBRSxpQkFBVSxDQUFDOzZCQUN0QyxFQUFFLEVBQUU7aUJBQ2hCLENBQUM7Z0JBQ0Ysa0JBQWtCO2dCQUNsQixjQUFjLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUMxQixDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUM7Ozs7QUFDTCwwbEdBQTBsRyJ9
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@angular/common","@angular/core","@angular/http","rxjs/Rx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/http"), require("rxjs/Rx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});