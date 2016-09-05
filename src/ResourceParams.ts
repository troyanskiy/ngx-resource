import {ResourceParamsBase} from './Interfaces';
import {Resource} from './Resource';
import {Http} from '@angular/http';
import {ResourceProviders} from './ResourceProviders';


export function ResourceParams(params: ResourceParamsBase) {

  return function(target: { new (http: Http): Resource }) {

    if (params.add2Provides !== false) {
      ResourceProviders.add(target, params.providersSubSet);
    }

    if (typeof params.removeTrailingSlash !== 'undefined') {
      target.prototype.removeTrailingSlash = function() {
        return !!params.removeTrailingSlash;
      };
    }

    if (params.url) {
      target.prototype._getUrl = function() {
        return params.url;
      };
    }

    if (params.path) {
      target.prototype._getPath = function() {
        return params.path;
      };
    }

    if (params.headers) {
      target.prototype._getHeaders = function() {
        return params.headers;
      };
    }

    if (params.params) {
      target.prototype._getParams = function() {
        return params.params;
      };
    }

    if (params.data) {
      target.prototype._getData = function() {
        return params.data;
      };
    }

  };
}
