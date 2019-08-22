import { Resource } from './Resource';
import { IResourceAction, ResourceRequestMethod } from './Declarations';


export function ResourceAction(methodOptions?: IResourceAction) {

  methodOptions = methodOptions || {};

  if (methodOptions.method === undefined) {
    methodOptions.method = ResourceRequestMethod.Get;
  }

  // tslint:disable-next-line: only-arrow-functions
  return function(target: Resource, propertyKey: string) {

    (target as any)[propertyKey] = function(...args: any[]): any {

      const callbacks: any = args.filter((arg: any) => typeof arg === 'function');
      const data: any = args.filter((arg: any) => typeof arg !== 'function');

      const [body, query, params] = data;
      const [onSuccess, onError] = callbacks;

      const actionOptions: IResourceAction = {...this.getResourceOptions(), ...methodOptions};

      return this.$restAction({actionAttributes: {body, query, params, onSuccess, onError}, actionOptions});

    };

  };

}
