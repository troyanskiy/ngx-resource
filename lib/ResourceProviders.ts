import {Provider} from '@angular/core';
import {Http} from '@angular/http';
import {Resource} from './Resource';

export class ResourceProviders {

  private static mainProvidersName: string = '__mainProviders';
  private static providers: {[id: string]: Provider[]} = {};

  static add(resource: { new (http: Http): Resource }, subSet:string = null) {

    if (!subSet) {
      subSet = this.mainProvidersName;
    }

    if (!this.providers[subSet]) {
      this.providers[subSet] = [];
    }

    this.providers[subSet].push(
      {
        provide: resource,
        useFactory: (http: Http) => new resource(http),
        deps: [Http]
      }
    )

  }

  static get(subSet:string = null): Provider[] {

    if (!subSet) {
      subSet = this.mainProvidersName;
    }

    return this.providers[subSet];

  }

}
