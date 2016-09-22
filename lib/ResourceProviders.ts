import {Provider, Injector} from '@angular/core';
import {Http} from '@angular/http';
import {Resource} from './Resource';

export class ResourceProviders {

  private static mainProvidersName: string = '__mainProviders';
  private static providers: {[id: string]: Provider[]} = {};

  static add(resource: { new (http: Http, injector: Injector): Resource }, subSet:string = null) {

    if (!subSet) {
      subSet = this.mainProvidersName;
    }

    if (!this.providers[subSet]) {
      this.providers[subSet] = [];
    }

    this.providers[subSet].push(
      {
        provide: resource,
        useFactory: (http: Http, injector: Injector) => new resource(http, injector),
        deps: [Http, Injector]
      }
    )

  }

  static get(subSet:string = null): Provider[] {

    if (!subSet) {
      subSet = this.mainProvidersName;
    }

    return this.providers[subSet] || [];

  }

}
