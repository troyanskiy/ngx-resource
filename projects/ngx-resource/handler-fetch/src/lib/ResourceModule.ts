import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ResourceHandler, ResourceModule as ResourceModuleCore } from '@ngx-resource/core';
import { ResourceHandlerFetch } from './ResourceHandlerFetch';

export interface IResourceModuleConfig {
  handler?: Provider;
}

@NgModule()
export class ResourceModule extends ResourceModuleCore {

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return ResourceModuleCore.forRoot({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerFetch}
    });
  }

  /**
   * For child
   */
  static forChild(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return ResourceModuleCore.forChild({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerFetch}
    });
  }
}
