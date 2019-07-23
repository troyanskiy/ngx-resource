import {
  IResourceHandlerResponse,
  IResourceRequest,
  IResourceResponse,
  ResourceHandler,
  ResourceRequestBodyType,
  ResourceRequestMethod,
  ResourceResponseBodyType
} from '@ngx-resource/core';
import { is } from 'tslint-sonarts/lib/utils/nodes';


declare const cordova: any;

export class ResourceHandlerCordovaAdvancedHttp extends ResourceHandler {

  private http: any = null;

  private methodWithBody = ['post', 'put', 'patch'];

  private initDeferResolve: any = null;
  private initDeferPromise: Promise<any> | null = null;

  constructor() {
    super();

    this.initDeferPromise = new Promise<any>((resolve) => {
      this.initDeferResolve = resolve;
    });

    this.initHttp();
  }

  initHttp(http?: any) {

    if (http) {
      this.http = http;
      this.resolveDeferInit();
    } else {
      this.initHttpPlugin();
    }

  }

  handle(req: IResourceRequest): IResourceHandlerResponse {

    if (this.initDeferPromise) {
      return {
        promise: this.initDeferPromise
          .then(() => this.handle(req))
          // tslint:disable-next-line: no-non-null-assertion
          .then((r: IResourceHandlerResponse) => r.promise!)
      };
    }


    if (!this.http) {
      return this.createErrorResponse('Http is not defined');
    }

    if (req.requestBodyType === void 0) {
      req.requestBodyType = ResourceRequestBodyType.FORM_DATA;
    }

    this.setDataSerializer(req.requestBodyType);

    const methodName = this.mapMethodName(req.method);

    if (methodName === null) {
      return this.createErrorResponse('Request method is not supported');
    }

    let url = req.url || '';
    let second = req.body;

    if (req.query) {
      this.prepareQuery(req.query);
    }

    if (this.methodWithBody.indexOf(methodName) > -1) {
      if (req.query) {
        url = this.createUrlWithQuery(url, req.query);
      }
    } else {
      second = req.query;
    }


    const promise = new Promise((resolve, reject) => {
      try {
        this.http[methodName](url, second, req.headers, resolve, reject);
      } catch (e) {
        console.error(`Http plugin call failed with: ${e.message}`, e);
        reject({status: -1, headers: [{error: e.message}]});
      }
    })
      .catch((resp: any) => this.createResponse(resp, req, true))
      .then((resp: any) => this.createResponse(resp, req));

    return {promise};

  }

  private initHttpPlugin() {
    if (this.tryToSetPlugin()) {
      this.resolveDeferInit();
    } else {
      document.addEventListener('deviceready', () => {
        if (!this.tryToSetPlugin()) {
          console.warn('Can not set http plugin after device ready');
        }
        this.resolveDeferInit();
      }, false);
    }
  }

  private tryToSetPlugin(): boolean {

    if (!this.http && cordova && cordova.plugin && cordova.plugin.http) {
      this.http = cordova.plugin.http;
    }

    return !!this.http;
  }

  private resolveDeferInit() {
    this.initDeferResolve();
    this.initDeferResolve = null;
    this.initDeferPromise = null;
  }

  private createResponse(resp: any, req: IResourceRequest, isError: boolean = false): Promise<IResourceResponse> {

    return new Promise((resolve, reject) => {

      const ret: IResourceResponse = {
        status: resp.status,
        body: resp.data || resp.error,
        headers: resp.headers
      };

      this.prepareResponseBody(ret, req, isError, resolve, reject);

      if (isError) {
        reject(ret);
      } else {
        resolve(ret);
      }

    });

  }


  private createErrorResponse(msg: string) {
    return {
      promise: Promise.reject(new Error(msg))
    };
  }

  private setDataSerializer(requestBodyType: ResourceRequestBodyType) {
    switch (requestBodyType) {
      case ResourceRequestBodyType.JSON:
        this.http.setDataSerializer('json');
        break;

      case ResourceRequestBodyType.FORM_DATA:
        this.http.setDataSerializer('urlencoded');
        break;

      case ResourceRequestBodyType.TEXT:
        this.http.setDataSerializer('utf8');
        break;

      default:
        return this.createErrorResponse('Supported only json, FormData or text types');
    }
  }

  private mapMethodName(method?: ResourceRequestMethod): string | null {

    switch (method) {
      case ResourceRequestMethod.Post:
        return 'post';

      case ResourceRequestMethod.Get:
        return 'get';

      case ResourceRequestMethod.Put:
        return 'put';

      case ResourceRequestMethod.Patch:
        return 'patch';

      case ResourceRequestMethod.Delete:
        return 'delete';

      case ResourceRequestMethod.Head:
        return 'head';

      default:
        return null;

    }
  }

  private prepareQuery(query: any) {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        query[key] = query[key].toString();
      }
    }
  }

  private createUrlWithQuery(url: string, query: { [key: string]: string }): string {
    const params: string = Object.keys(query)
      .map((key: string) => `${key}=${query[key]}`)
      .join('&');

    return url + (url.indexOf('?') === -1 ? '?' : '&') + encodeURI(params);
  }

  private prepareResponseBody(ret: IResourceResponse,
                              req: IResourceRequest,
                              isError: boolean = false,
                              resolve: any,
                              reject: any) {

    if (ret.body) {

      switch (req.responseBodyType) {

        case ResourceResponseBodyType.Json:
          try {
            ret.body = JSON.parse(ret.body);
          } catch (e) {
            // noop
          }

          break;

        case ResourceResponseBodyType.Blob:
          ret.body = new Blob([ret.body], {type: 'text/plain'});

          break;

        case ResourceResponseBodyType.ArrayBuffer:
          const fileReader = new FileReader();

          fileReader.onload = function() {
            ret.body = this.result;

            if (isError) {
              reject(ret);
            } else {
              resolve(ret);
            }
          };

          fileReader.onerror = () => {
            reject({
              status: 0,
              body: null,
              headers: {}
            });
          };

          fileReader.readAsArrayBuffer(
            new Blob([ret.body], {
              type: 'text/plain'
            })
          );

          return;

      }
    }
  }

}
