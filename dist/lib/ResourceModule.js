import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ResourceProviders } from './ResourceProviders';
export class ResourceModule {
    static forRoot() {
        return {
            ngModule: ResourceModule,
            providers: [ResourceProviders.get()]
        };
    }
    static forChild(subSet) {
        return {
            ngModule: ResourceModule,
            providers: [ResourceProviders.get(subSet)]
        };
    }
}
ResourceModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpModule]
            },] },
];
ResourceModule.ctorParameters = [];
//# sourceMappingURL=ResourceModule.js.map