import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceHandler } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from './ResourceHandlerHttpClient';

export interface IResourceModuleConfig {
  handler?: Provider;
}

@NgModule()
export class ResourceModule {

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: [
        config.handler || {provide: ResourceHandler, useClass: ResourceHandlerHttpClient, deps: [HttpClient]}
      ]
    };
  }

  /**
   * For child
   */
  // tslint:disable-next-line: no-identical-functions
  static forChild(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: [
        config.handler || {provide: ResourceHandler, useClass: ResourceHandlerHttpClient, deps: [HttpClient]}
      ]
    };
  }
}
