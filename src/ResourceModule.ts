import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {ResourceProviders} from './ResourceProviders';


@NgModule({
  imports: [CommonModule, HttpModule],
  providers: [
    ResourceProviders.get()
  ]
})
export class ResourceModule {}
