import { Type } from '@angular/core/src/type';
import { ResourceActionBase } from './Interfaces';
import { Resource } from './Resource';
import { ResourceModel } from './ResourceModel';
export declare function ResourceAction(methodOptions?: ResourceActionBase): (target: Resource, propertyKey: string) => void;
export declare function mapToModel(resp: any, model: Type<ResourceModel>): any;
