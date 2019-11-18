import { ModuleWithProviders, NgModule } from '@angular/core';
import { IResourceModuleConfig, ResourceHandler, ResourceModule as ResourceModuleCore } from '@ngx-resource/core';
import { ResourceHandlerFetch } from './ResourceHandlerFetch';


@NgModule()
export class ResourceModule extends ResourceModuleCore {

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders<ResourceModuleCore> {
    return ResourceModuleCore.forRoot({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerFetch}
    });
  }

  /**
   * For child
   */
  static forChild(config: IResourceModuleConfig = {}): ModuleWithProviders<ResourceModuleCore> {
    return ResourceModuleCore.forChild({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerFetch}
    });
  }
}
