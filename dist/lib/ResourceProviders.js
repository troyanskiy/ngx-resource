import { Injector } from '@angular/core';
import { Http } from '@angular/http';
export class ResourceProviders {
    static add(resource, subSet = null) {
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        if (!this.providers[subSet]) {
            this.providers[subSet] = [];
        }
        let deps = Reflect.getMetadata('design:paramtypes', resource);
        if (deps.length === 0) {
            deps = [Http, Injector];
        }
        this.providers[subSet].push({
            provide: resource,
            useFactory: (...args) => new resource(...args),
            deps: deps
        });
    }
    static get(subSet = null) {
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        return this.providers[subSet] || [];
    }
}
ResourceProviders.mainProvidersName = '__mainProviders';
ResourceProviders.providers = {};
//# sourceMappingURL=ResourceProviders.js.map