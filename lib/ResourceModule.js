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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var ResourceProviders_1 = require("./ResourceProviders");
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
    ResourceModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule]
        }), 
        __metadata('design:paramtypes', [])
    ], ResourceModule);
    return ResourceModule;
}());
exports.ResourceModule = ResourceModule;
//# sourceMappingURL=ResourceModule.js.map