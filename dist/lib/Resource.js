"use strict";
var ResourceGlobalConfig_1 = require('./ResourceGlobalConfig');
var Resource = (function () {
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
    Resource.prototype.getUrl = function () {
        return this._url || this._getUrl() || ResourceGlobalConfig_1.ResourceGlobalConfig.url || '';
    };
    Resource.prototype.setUrl = function (url) {
        this._url = url;
    };
    Resource.prototype.getPath = function () {
        return this._path || this._getPath() || ResourceGlobalConfig_1.ResourceGlobalConfig.path || '';
    };
    Resource.prototype.setPath = function (path) {
        this._path = path;
    };
    Resource.prototype.getHeaders = function () {
        return this._headers || this._getHeaders() || ResourceGlobalConfig_1.ResourceGlobalConfig.headers || {};
    };
    Resource.prototype.setHeaders = function (headers) {
        this._headers = headers;
    };
    Resource.prototype.getParams = function () {
        return this._params || this._getParams() || ResourceGlobalConfig_1.ResourceGlobalConfig.params || {};
    };
    Resource.prototype.setParams = function (params) {
        this._params = params;
    };
    Resource.prototype.getData = function () {
        return this._data || this._getData() || ResourceGlobalConfig_1.ResourceGlobalConfig.data || {};
    };
    Resource.prototype.setData = function (data) {
        this._data = data;
    };
    Resource.prototype.requestInterceptor = function (req) {
        return req;
    };
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
}());
exports.Resource = Resource;
