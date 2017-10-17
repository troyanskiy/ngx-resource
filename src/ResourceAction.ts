import { RequestMethod } from '@angular/http';

import {
  ResourceActionBase,
  ResourceResult
} from './Interfaces';
import { Resource } from './Resource';
import { ResourceModel } from './ResourceModel';


export function ResourceAction(methodOptions?: ResourceActionBase) {

  methodOptions = methodOptions || {};

  if (methodOptions.method === undefined) {
    methodOptions.method = RequestMethod.Get;
  }

  return function (target: Resource, propertyKey: string) {

    (<any>target)[propertyKey] = function (...args: any[]): ResourceResult<any> | ResourceModel<Resource> {

      let data: any = null;
      let params: any = null;
      let callback: any = null;
      let onError: any = null;

      args.forEach((arg: any) => {

        if (typeof arg === 'function') {
          if (callback) {
            onError = arg;
          } else {
            callback = arg;
          }
        } else {
          if (data) {
            params = arg;
          } else {
            data = arg;
          }
        }

      });

      const options = Object.assign({}, this.getResourceOptions(), methodOptions);

      return this.$resourceAction(data, params, callback, onError, options);

    };

  };

}
