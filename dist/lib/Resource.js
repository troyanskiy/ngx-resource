import { ResourceGlobalConfig } from './ResourceGlobalConfig';
export class Resource {
    constructor(http, injector) {
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
    getUrl() {
        return this._url || this._getUrl() || ResourceGlobalConfig.url || '';
    }
    setUrl(url) {
        this._url = url;
    }
    getPath() {
        return this._path || this._getPath() || ResourceGlobalConfig.path || '';
    }
    setPath(path) {
        this._path = path;
    }
    getHeaders() {
        return this._headers || this._getHeaders() || ResourceGlobalConfig.headers || {};
    }
    setHeaders(headers) {
        this._headers = headers;
    }
    getParams() {
        return this._params || this._getParams() || ResourceGlobalConfig.params || {};
    }
    setParams(params) {
        this._params = params;
    }
    getData() {
        return this._data || this._getData() || ResourceGlobalConfig.data || {};
    }
    setData(data) {
        this._data = data;
    }
    requestInterceptor(req) {
        return req;
    }
    responseInterceptor(observable, req) {
        return observable.map(res => res._body ? res.json() : null);
    }
    removeTrailingSlash() {
        return true;
    }
    map(item) {
        return item;
    }
    filter(item) {
        return true;
    }
    _getUrl() {
        return null;
    }
    _getPath() {
        return null;
    }
    _getHeaders() {
        return null;
    }
    _getParams() {
        return null;
    }
    _getData() {
        return null;
    }
}
//# sourceMappingURL=Resource.js.map