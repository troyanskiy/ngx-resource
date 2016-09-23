import { Type } from '@angular/core/src/type';
import { ResourceParamsBase } from './Interfaces';
import { Resource } from './Resource';
export declare function ResourceParams(params?: ResourceParamsBase): (target: Type<Resource>) => void;
