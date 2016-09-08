"use strict";
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
            useFactory: function (http) { return new resource(http); },
            deps: [http_1.Http]
        });
    };
    ResourceProviders.get = function (subSet) {
        if (subSet === void 0) { subSet = null; }
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        return this.providers[subSet];
    };
    ResourceProviders.mainProvidersName = '__mainProviders';
    ResourceProviders.providers = {};
    return ResourceProviders;
}());
exports.ResourceProviders = ResourceProviders;
//# sourceMappingURL=ResourceProviders.js.map