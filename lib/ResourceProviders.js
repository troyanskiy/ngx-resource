"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ResourceProviders = (function () {
    function ResourceProviders() {
    }
    ResourceProviders.add = function (resource, subSet) {
        if (subSet === void 0) { subSet = null; }
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        if (!this.providers[subSet]) {
            this.providers[subSet] = [];
        }
        this.providers[subSet].push({
            provide: resource,
            useFactory: function (http, injector) { return new resource(http, injector); },
            deps: [http_1.Http, core_1.Injector]
        });
    };
    ResourceProviders.get = function (subSet) {
        if (subSet === void 0) { subSet = null; }
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        return this.providers[subSet] || [];
    };
    ResourceProviders.mainProvidersName = '__mainProviders';
    ResourceProviders.providers = {};
    return ResourceProviders;
}());
exports.ResourceProviders = ResourceProviders;
//# sourceMappingURL=ResourceProviders.js.map