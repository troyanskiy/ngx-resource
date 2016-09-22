import { Http } from '@angular/http';
import { Injector } from '@angular/core';
import { ResourceParamsBase } from './Interfaces';
import { Resource } from './Resource';
export declare function ResourceParams(params?: ResourceParamsBase): (target: new (http: Http, injector: Injector) => Resource) => void;
