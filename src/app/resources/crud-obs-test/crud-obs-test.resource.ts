import { Injectable } from '@angular/core';
import { ResourceCRUDObservable, ResourceParams } from '@ngx-resource/core';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: '/api/crud-test'
})
export class CrudObsTestResource extends ResourceCRUDObservable<any, any, any, any> {

}
