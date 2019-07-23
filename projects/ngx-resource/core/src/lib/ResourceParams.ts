import { IResourceParams } from './Declarations';

export function ResourceParams(params: IResourceParams = {}) {

  // tslint:disable-next-line: only-arrow-functions
  return function(target: any) {

    target.prototype.getResourceOptions = () => params;

  };
}
