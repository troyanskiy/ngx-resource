import { ModuleWithProviders, NgModule } from '@angular/core';
import { IResourceModuleConfig, ResourceHandler, ResourceModule as ResourceModuleCore } from '@ngx-resource/core';
import { ResourceHandlerCordovaAdvancedHttp } from './ResourceHandlerCordovaAdvancedHttp';


@NgModule()
export class ResourceModule extends ResourceModuleCore {

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders<ResourceModuleCore> {
    return ResourceModuleCore.forRoot({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerCordovaAdvancedHttp}
    });
  }

  /**
   * For child
   */
  static forChild(config: IResourceModuleConfig = {}): ModuleWithProviders<ResourceModuleCore> {
    return ResourceModuleCore.forChild({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerCordovaAdvancedHttp}
    });
  }
}
