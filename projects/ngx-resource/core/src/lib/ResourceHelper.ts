import {
  IResourceAction,
  IResourceActionAttributes,
  IResourceActionInner,
  IResourceParamsBase,
  IResourceRequest,
  ResourceQueryMappingMethod,
  ResourceRequestBodyType
} from './Declarations';

export class ResourceHelper {

  static cleanDataFields: string[] = [
    '$resolved',
    '$promise',
    '$abort',
    '$resource'
  ];


  private static isBrowser: boolean | null = null;

  static isRunningInBrowser(): boolean {

    if (this.isBrowser !== null) {
      return this.isBrowser;
    }

    try {
      this.isBrowser = !!window;
    } catch (e) {
      this.isBrowser = false;
    }

    return this.isBrowser;
  }

  static getRealTypeOf(data: any): ResourceRequestBodyType {
    if (!data) {
      return ResourceRequestBodyType.NONE;
    }

    if (this.isRunningInBrowser()) {
      if (FormData && data instanceof FormData) {
        return ResourceRequestBodyType.FORM_DATA;
      }

      if (Blob && data instanceof Blob) {
        return ResourceRequestBodyType.BLOB;
      }
    }

    if (data instanceof ArrayBuffer) {
      return ResourceRequestBodyType.ARRAY_BUFFER;
    }

    if (['string', 'number'].indexOf(typeof data) > -1) {
      return ResourceRequestBodyType.TEXT;
    }

    return ResourceRequestBodyType.JSON;
  }

  static defaults(dst: any, src: any): any {

    if (!dst) {
      dst = {};
    }

    Object.keys(src)
      .forEach((key: string) => {
        if (dst[key] === undefined) {
          dst[key] = src[key];
        }
      });

    return dst;

  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  static cleanData(obj: any): any {

    if (Array.isArray(obj)) {
      return this.cleanDataArray(obj);
    } else {
      return this.cleanDataObject(obj);
    }

  }

  static cleanDataArray(obj: any[]): any[] {

    obj = obj.filter(value => typeof value !== 'function');

    return obj;

  }

  static cleanDataObject(obj: any): any {
    const cleanedObj: any = {};

    for (const propName in obj) {

      if (typeof obj[propName] !== 'function' && this.cleanDataFields.indexOf(propName) === -1) {
        cleanedObj[propName] = obj[propName];
      }

    }

    return cleanedObj;
  }

  static defineReturnDataPropertiesResolvedAbort(returnData: any) {
    Object.defineProperty(returnData, '$resolved', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: false
    });

    Object.defineProperty(returnData, '$abort', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: () => {
        // does nothing for now
      }
    });
  }

  static defineReturnDataPropertiesPromise(returnData: any, value: any) {
    Object.defineProperty(returnData, '$promise', {
      enumerable: false,
      configurable: true,
      writable: true,
      value
    });
  }

  static getRequestOptionsOrThrow(options: IResourceActionInner): IResourceRequest {
    const value = this.getResourceActionInnerOrThrow(options, 'requestOptions');

    return value;
  }

  // tslint:disable-next-line: no-identical-functions
  static getResolvedOptionsOrThrow(options: IResourceActionInner): IResourceParamsBase {
    const value = this.getResourceActionInnerOrThrow(options, 'resolvedOptions');

    return value;
  }

  // tslint:disable-next-line: no-identical-functions
  static getActionAttributesOrThrow(options: IResourceActionInner): IResourceActionAttributes {
    const value = this.getResourceActionInnerOrThrow(options, 'actionAttributes');

    return value;
  }

  // tslint:disable-next-line: no-identical-functions
  static getActionOptionsOrThrow(options: IResourceActionInner): IResourceAction {
    const value = this.getResourceActionInnerOrThrow(options, 'actionOptions');

    return value;
  }

  static setRequestOptionsUrlParams(requestOptions: IResourceRequest,
                                    resolvedOptions: IResourceParamsBase,
                                    actionAttributes: IResourceActionAttributes,
                                    usedInPath: { [key: string]: boolean }) {

    if (!requestOptions.url) {
      throw new Error('setRequestOptionsUrlParams options.requestOptions.url missing');
    }

    const params = this.defaults(actionAttributes.params, resolvedOptions.params);
    const pathParams = requestOptions.url.match(/{([^}]*)}/g) || [];

    for (const pathParam of pathParams) {

      let pathKey = pathParam.substr(1, pathParam.length - 2);
      const isMandatory = pathKey[0] === '!';
      if (isMandatory) {
        pathKey = pathKey.substr(1);
      }

      const onlyPathParam = pathKey[0] === ':';
      if (onlyPathParam) {
        pathKey = pathKey.substr(1);
      }

      if (actionAttributes.query && actionAttributes.query === actionAttributes.params) {
        usedInPath[pathKey] = true;
      }

      const value = params[pathKey];

      if (onlyPathParam) {
        delete params[pathKey];
      }

      // Replacing in the url
      requestOptions.url = this.setRequestOptionsUrlParamsNewUrl(value, isMandatory, pathParam, requestOptions);

    }
  }

  static setRequestOptionsUrlParamsNewUrl(value: any,
                                          isMandatory: boolean,
                                          pathParam: string,
                                          requestOptions: IResourceRequest): string {

    if (!requestOptions.url) {
      throw new Error('setRequestOptionsUrlParamsNewUrl requestOptions.url missing');
    }

    if (this.isNullOrUndefined(value)) {
      if (isMandatory) {
        const consoleMsg = `Mandatory ${pathParam} path parameter is missing`;
        console.warn(consoleMsg);

        throw new Error(consoleMsg);
      }

      return requestOptions.url.substr(0, requestOptions.url.indexOf(pathParam));

    }

    return requestOptions.url.replace(pathParam, value);
  }

  static createRequestOptionsFormDataBody(body: any, actionOptions: IResourceAction): FormData {

    const newBody = new FormData();

    Object.keys(body).forEach((key: string) => {

      const value = body[key];

      if (body.hasOwnProperty(key) && typeof value !== 'function') {

        const isArrayOfFiles = value instanceof Array && value.reduce((acc, elem) => acc && elem instanceof File, true);

        if (isArrayOfFiles) {
          value.forEach((f: File, index: number) => {
            newBody.append(`${key}[${index}]`, f, f.name);
          });
        } else if (value instanceof File) {
          newBody.append(key, value, value.name);
        } else if (!actionOptions.rootNode) {
          newBody.append(key, value);
        }
      }

    });

    if (actionOptions.rootNode) {
      newBody.append(actionOptions.rootNode, JSON.stringify(body));
    }

    return newBody;

  }

  static appendQueryParams(query: { [prop: string]: string | any[] },
                           key: string,
                           value: any,
                           queryMappingMethod?: ResourceQueryMappingMethod): void {

    if (value instanceof Date) {
      query[key] = value.toISOString();

      return;
    }

    if (typeof value === 'object') {

      switch (queryMappingMethod) {

        case ResourceQueryMappingMethod.Plain:
          this.appendQueryParamsMappingMethodPlain(query, key, value);

          return;

        case ResourceQueryMappingMethod.Bracket:
          /// Convert object and arrays to query params
          this.appendQueryParamsMappingMethodBracket(query, key, value, queryMappingMethod);

          return;

        case ResourceQueryMappingMethod.JQueryParamsBracket:
          /// Convert object and arrays to query params according to $.params
          this.appendQueryParamsMappingMethodJQueryParamsBracket(query, key, value, queryMappingMethod);

          return;

      }

    }

    query[key] = value;

  }

  static appendQueryParamsMappingMethodPlain(query: { [prop: string]: any }, key: string, value: any) {

    if (Array.isArray(value)) {
      query[key] = value.join(',');
    } else {

      if (value && typeof value === 'object') {
        /// Convert dates to ISO format string
        if (value instanceof Date) {
          value = value.toISOString();
        } else {
          value = JSON.stringify(value);
        }
      }

      query[key] = value;
    }
  }

  static appendQueryParamsMappingMethodBracket(query: { [prop: string]: any },
                                               key: string,
                                               value: any,
                                               queryMappingMethod: ResourceQueryMappingMethod) {

    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        this.appendQueryParams(query, `${key}[${k}]`, value[k], queryMappingMethod);
      }
    }

  }

  static appendQueryParamsMappingMethodJQueryParamsBracket(query: { [prop: string]: any },
                                                           key: string,
                                                           value: any,
                                                           queryMappingMethod: ResourceQueryMappingMethod) {

    for (const k in value) {
      if (value.hasOwnProperty(k)) {
        let path = `${key}[${k}]`;

        if (Array.isArray(value) && typeof value[k] !== 'object') {
          path = `${key}[]`;
        }
        this.appendQueryParams(query, path, value[k], queryMappingMethod);
      }
    }

  }


  private static getResourceActionInnerOrThrow(options: IResourceActionInner, param: string): any {
    if (options[param]) {
      return options[param];
    }

    throw new Error('getResourceActionInnerOrThrow options.' + param + ' missing');
  }

}
