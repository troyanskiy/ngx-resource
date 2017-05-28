import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Type } from '@angular/core/src/type';

import { Resource } from './Resource';
import { ResourceMethod, ResourceParamsBase } from './Interfaces';
import { ResourceAction } from './ResourceAction';
import { ResourceParams } from './ResourceParams';

/**
 * A ODATA object for querying entities.
 */
export interface IResourceODATAQuery {
  $filter?: string;
  $search?: string;
  $expand?: string;
  $limit?: number;
}

/** A ODATA object for querying a single entity. */
export interface IResourceODATAQuerySingle extends IResourceODATAQuery {
  id: any;
}

/** A Resource base class for ODATA entities. To create a resource is just
 * enough to extend this class and all the base ODATA functionalities will be present.
 */
export abstract class ResourceODATA<R> extends Resource {
  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<IResourceODATAQuerySingle, R>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<R, R>;

  @ResourceAction({
    params: {
      "$filter": "@$filter",
      "$search": "@$search",
      "$expand": "@$expand",
      "$limit": "@$limit",
      "query": "@query"
    },
    isArray: true
  })
  search: ResourceMethod<IResourceODATAQuery, R[]>;

  $getUrl(): string | Promise<string> {
    return super.$getUrl() + "/" + this.getEntitySetName();
  }

  getEntityName(): string {
    return null;
  }

  private getEntitySetName() {
    return this.getEntityName() + "s";
  }
}

export interface ResourceODATAParamsBase extends ResourceParamsBase {
  /** The entity associated with this resource. */
  entity: any;
  /** The entity name in case it is different than the entity.
   * It is good to specify it as the entity could be minified.
   */
  name?: string;
}

/**
 * A ODATA annotation for a resource for a ODATA entity resource extending {@link ResourceODATA}.
 */
export function ResourceODATAParams(params: ResourceODATAParamsBase) {
  const injectable = Injectable();
  const zuper = ResourceParams(params);

  return function (target: Type<Resource>) {
    injectable(target);
    zuper(target);
    target.prototype.getEntityName = function () {
      if (params.name) {
        return params.name;
      }
      return typeof params.entity === "string" ? params.entity : params.entity.name;
    };
  };
}
