var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RequestMethod } from '@angular/http';
import { Resource } from './Resource';
import { ResourceAction } from './ResourceAction';
export class ResourceCRUD extends Resource {
    create(data, callback) {
        return this.save(data, callback);
    }
}
__decorate([
    ResourceAction({
        isArray: true
    }), 
    __metadata('design:type', Function)
], ResourceCRUD.prototype, "query", void 0);
__decorate([
    ResourceAction({
        path: '/{!id}'
    }), 
    __metadata('design:type', Function)
], ResourceCRUD.prototype, "get", void 0);
__decorate([
    ResourceAction({
        method: RequestMethod.Post
    }), 
    __metadata('design:type', Function)
], ResourceCRUD.prototype, "save", void 0);
__decorate([
    ResourceAction({
        method: RequestMethod.Put,
        path: '/{!id}'
    }), 
    __metadata('design:type', Function)
], ResourceCRUD.prototype, "update", void 0);
__decorate([
    ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    }), 
    __metadata('design:type', Function)
], ResourceCRUD.prototype, "remove", void 0);
//# sourceMappingURL=ResourceCRUD.js.map