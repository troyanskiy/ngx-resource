import { Injector, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ResourceHandlerNoop } from './ResourceHandlerNoop';
import { ResourceHandler } from './ResourceHandler';

export interface IResourceModuleConfig {
  handler?: Provider;
}

@NgModule()
export class ResourceModule {

  static injector: Injector;

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: [
        config.handler || {provide: ResourceHandler, useClass: ResourceHandlerNoop}
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
        config.handler || {provide: ResourceHandler, useClass: ResourceHandlerNoop}
      ]
    };
  }

  constructor(injector: Injector) {
    ResourceModule.injector = injector;
  }

}
