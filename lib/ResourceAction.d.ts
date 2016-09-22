import { ResourceActionBase } from './Interfaces';
import { Resource } from './Resource';
import { ResourceModel } from './ResourceModel';
import { Type } from '@angular/core/src/type';
export declare function ResourceAction(action?: ResourceActionBase): (target: Resource, propertyKey: string) => void;
export declare function mapToModel(resp: any, model: Type<ResourceModel>): any;
