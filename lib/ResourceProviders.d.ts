import { Provider } from '@angular/core';
import { Http } from '@angular/http';
import { Resource } from './Resource';
export declare class ResourceProviders {
    private static mainProvidersName;
    private static providers;
    static add(resource: {
        new (http: Http): Resource;
    }, subSet?: string): void;
    static get(subSet?: string): Provider[];
}
