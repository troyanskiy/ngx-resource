import { IResourceHandlerResponse, IResourceRequest } from './Declarations';
import { ResourceHandler } from './ResourceHandler';

export class ResourceHandlerNoop extends ResourceHandler {
  handle(req: IResourceRequest): IResourceHandlerResponse {
    throw new Error('ResourceHandler is not provided');
  }
}
