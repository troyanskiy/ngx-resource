import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResourceModuleConfig, ResourceHandler, ResourceModule as ResourceModuleCore } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from './ResourceHandlerHttpClient';

@NgModule()
export class ResourceModule extends ResourceModuleCore {

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders<ResourceModuleCore> {
    return ResourceModuleCore.forRoot({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerHttpClient, deps: [HttpClient]}
    });
  }

  /**
   * For child
   */
  static forChild(config: IResourceModuleConfig = {}): ModuleWithProviders<ResourceModuleCore> {
    return ResourceModuleCore.forChild({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerHttpClient, deps: [HttpClient]}
    });
  }
}
