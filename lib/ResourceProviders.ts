import 'reflect-metadata';
import {Provider, Injector} from '@angular/core';
import {Type} from '@angular/core/src/type';
import {Http} from '@angular/http';
import {Resource} from './Resource';

export class ResourceProviders {

  private static mainProvidersName: string = '__mainProviders';
  private static providers: {[id: string]: Provider[]} = {};

  static add(resource: Type<Resource>, subSet: string = null) {

    if (!subSet) {
      subSet = this.mainProvidersName;
    }

    if (!this.providers[subSet]) {
      this.providers[subSet] = [];
    }

    let deps: any[] = Reflect.getMetadata('design:paramtypes', resource);

    if (deps.length === 0) {
      deps = [Http, Injector];
    }

    this.providers[subSet].push(
      {
        provide: resource,
        useFactory: (...args: any[]) => new resource(...args),
        deps: deps
      }
    );

  }

  static get(subSet: string = null): Provider[] {

    if (!subSet) {
      subSet = this.mainProvidersName;
    }

    return this.providers[subSet] || [];

  }

}
