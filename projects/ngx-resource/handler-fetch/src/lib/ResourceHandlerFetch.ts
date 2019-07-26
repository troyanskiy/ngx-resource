import {
  IResourceHandlerResponse,
  IResourceRequest,
  ResourceHandler,
  ResourceRequestMethod,
  ResourceResponseBodyType
} from '@ngx-resource/core';

export const REQUEST_METHOD_MAP = {
  [ResourceRequestMethod.Get]: 'GET',
  [ResourceRequestMethod.Post]: 'POST',
  [ResourceRequestMethod.Put]: 'PUT',
  [ResourceRequestMethod.Patch]: 'PATCH',
  [ResourceRequestMethod.Delete]: 'DELETE',
  [ResourceRequestMethod.Options]: 'OPTIONS',
  [ResourceRequestMethod.Head]: 'HEAD',
};

export class ResourceHandlerFetch extends ResourceHandler {

  handle(req: IResourceRequest): IResourceHandlerResponse {

    const url = this.createUrl(req);
    const requestInit = this.createRequestInit(req);

    return {
      promise: fetch(url, requestInit).then(async (res: Response) => {
        return {
          headers: res.headers,
          status: res.status,
          body: await this.getBody(req, res)
        };
      }),
    };
  }

  private createUrl(req: IResourceRequest): string {

    let {url} = req;

    if (typeof url !== 'string') {
      throw new Error('Url us missing');
    }

    if (req.query) {

      const queryGroups: string[] = [];

      for (const key in req.query) {
        if (req.query.hasOwnProperty(key)) {
          queryGroups.push('key=' + encodeURIComponent(req.query[key]));
        }
      }

      if (queryGroups.length) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + queryGroups.join('&');
      }

    }

    return url;
  }

  private createRequestInit(req: IResourceRequest): RequestInit {
    const requestInit: RequestInit = {};

    req.method = req.method || ResourceRequestMethod.Get;

    requestInit.method = REQUEST_METHOD_MAP[req.method];
    requestInit.headers = req.headers;

    if (req.method !== ResourceRequestMethod.Get && req.body) {
      requestInit.body = req.body;
    }

    return requestInit;
  }

  private getBody(req: IResourceRequest, res: Response): any {
    switch (req.responseBodyType) {
      case ResourceResponseBodyType.ArrayBuffer:
        return res.arrayBuffer();

      case ResourceResponseBodyType.Blob:
        return res.blob();

      case ResourceResponseBodyType.Json:
        return res.json();

      case ResourceResponseBodyType.Text:
      default:
        return res.text();

    }
  }


}
