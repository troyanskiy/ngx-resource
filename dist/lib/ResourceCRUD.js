"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var Resource_1 = require('./Resource');
var ResourceAction_1 = require('./ResourceAction');
var ResourceCRUD = (function (_super) {
    __extends(ResourceCRUD, _super);
    function ResourceCRUD() {
        _super.apply(this, arguments);
    }
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
}(Resource_1.Resource));
exports.ResourceCRUD = ResourceCRUD;
