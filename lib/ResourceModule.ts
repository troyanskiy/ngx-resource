import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {ResourceProviders} from "./ResourceProviders";


@NgModule({
  imports: [CommonModule, HttpModule]
})
export class ResourceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: [ResourceProviders.get()]
    };
  }

  static forChild(subSet: string): ModuleWithProviders {
    return {
      ngModule: ResourceModule,
      providers: [ResourceProviders.get(subSet)]
    };
  }

}
