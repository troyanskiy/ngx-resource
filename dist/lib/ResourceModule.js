"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var ResourceProviders_1 = require('./ResourceProviders');
var ResourceModule = (function () {
    function ResourceModule() {
    }
    ResourceModule.forRoot = function () {
        return {
            ngModule: ResourceModule,
            providers: [ResourceProviders_1.ResourceProviders.get()]
        };
    };
    ResourceModule.forChild = function (subSet) {
        return {
            ngModule: ResourceModule,
            providers: [ResourceProviders_1.ResourceProviders.get(subSet)]
        };
    };
    ResourceModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, http_1.HttpModule]
                },] },
    ];
    ResourceModule.ctorParameters = [];
    return ResourceModule;
}());
exports.ResourceModule = ResourceModule;
//# sourceMappingURL=ResourceModule.js.map