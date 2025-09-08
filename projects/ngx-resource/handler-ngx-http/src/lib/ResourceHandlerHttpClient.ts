import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, last, map } from 'rxjs/operators';
import {
  IResourceHandlerResponse,
  IResourceRequest,
  IResourceResponse,
  ResourceHandler,
  ResourceRequestMethod,
  ResourceResponseBodyType
} from '@ngx-resource/core';

@Injectable()
export class ResourceHandlerHttpClient extends ResourceHandler {

  constructor(private http: HttpClient) {
    super();
  }

  handle(req: IResourceRequest): IResourceHandlerResponse {

    const request = this.prepareRequest(req);

    return {
      observable: this.http.request(request)
        .pipe(
          last(),
          map((resp: HttpResponse<any>) => this.handleResponse(req, resp)),
          catchError((resp: HttpErrorResponse) => {
            throw this.handleResponse(req, resp);
          })
        )
    };

  }


  protected prepareRequest(req: IResourceRequest): HttpRequest<any> {

    let method = 'GET';

    switch (req.method) {

      case ResourceRequestMethod.Get:
        method = 'GET';
        break;

      case ResourceRequestMethod.Post:
        method = 'POST';
        break;

      case ResourceRequestMethod.Put:
        method = 'PUT';
        break;

      case ResourceRequestMethod.Delete:
        method = 'DELETE';
        break;

      case ResourceRequestMethod.Head:
        method = 'HEAD';
        break;

      case ResourceRequestMethod.Options:
        method = 'OPTIONS';
        break;

      case ResourceRequestMethod.Patch:
        method = 'PATCH';

    }

    const init: IHttpRequestInit = {
      withCredentials: req.withCredentials
    };

    switch (req.responseBodyType) {

      case ResourceResponseBodyType.Json:
        init.responseType = 'json';
        break;

      case ResourceResponseBodyType.ArrayBuffer:
        init.responseType = 'arraybuffer';
        break;

      case ResourceResponseBodyType.Blob:
        init.responseType = 'blob';
        break;

      default:
        init.responseType = 'text';

    }

    if (req.headers) {
      init.headers = new HttpHeaders(req.headers);
    }

    if (req.query) {
      init.params = new HttpParams({fromObject: req.query});
    }

    return new HttpRequest(method, req.url || '', req.body, init);

  }

  protected handleResponse(req: IResourceRequest, response: HttpResponse<any> | HttpErrorResponse): IResourceResponse {

    const headers: any = {};
    const keys = response.headers?.keys();

    if (keys) {
      keys.forEach((key: string) => {
        headers[key] = response.headers.getAll(key);
      });
    }

    return {
      status: response.status,
      body: (response as HttpResponse<any>).body || (response as HttpErrorResponse).error,
      headers
    };
  }

}

export type THttpRequestInitResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface IHttpRequestInit {
  headers?: HttpHeaders;
  params?: HttpParams;
  responseType?: THttpRequestInitResponseType;
  withCredentials?: boolean;
}
