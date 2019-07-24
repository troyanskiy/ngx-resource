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

      const body: any = data[0];
      const query: any = data[1];
      const params: any = data[2];
      const onSuccess: any = callbacks[0];
      const onError: any = callbacks[1];


      const actionOptions: IResourceAction = {...this.getResourceOptions(), ...methodOptions};

      return this.$restAction({actionAttributes: {body, query, params, onSuccess, onError}, actionOptions});

    };

  };

}
