import { Type } from "@angular/core/src/type";
import { Observable } from 'rxjs';
import { ResourceModelParamsBase } from "./Interfaces";
import { Resource } from "./Resource";
export declare function ResourceModelParams(params?: ResourceModelParamsBase): (target: Type<ResourceModel>) => void;
export declare class ResourceModel {
    $resolved: boolean;
    $observable: Observable<any>;
    $abortRequest: () => void;
    $primaryKey: string;
    $resource: Resource;
    static resourceClass: Type<Resource>;
    static create(data?: any, commit?: boolean): any;
    private _resource_method(method_name);
    private _create();
    fillFromObject(_object: any): this;
    getData(): {};
    save(): void;
    update(): void;
    remove(): void;
}
