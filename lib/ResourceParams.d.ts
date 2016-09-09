import { Http } from '@angular/http';
import { ResourceParamsBase } from './Interfaces';
import { Resource } from './Resource';
export declare function ResourceParams(params?: ResourceParamsBase): (target: new (http: Http) => Resource) => void;
