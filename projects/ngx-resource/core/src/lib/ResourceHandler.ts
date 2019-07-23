import { IResourceHandlerResponse, IResourceRequest } from './Declarations';

export abstract class ResourceHandler {
  abstract handle(req: IResourceRequest): IResourceHandlerResponse;
}
