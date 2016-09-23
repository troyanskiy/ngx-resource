import { Provider } from "@angular/core";
import { Type } from "@angular/core/src/type";
import { Resource } from "./Resource";
export declare class ResourceProviders {
    private static mainProvidersName;
    private static providers;
    static add(resource: Type<Resource>, subSet?: string): void;
    static get(subSet?: string): Provider[];
}
