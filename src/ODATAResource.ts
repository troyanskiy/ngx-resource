import { Injectable, Injector } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { Resource} from './Resource';
import { ResourceParamsBase, ResourceMethod } from './Interfaces';
import { ResourceAction } from './ResourceAction';
import { ResourceParams } from './ResourceParams';
import { RequestMethod } from '@angular/http';

/**
 * A ODATA object for querying entities.
 */
export interface ODATAQuery {
	$filter?: string;
	$search?: string;
	$expand?: string;
	$limit?: number;
}

/** A ODATA object for querying a single entity. */
export interface SingleODATAQuery extends ODATAQuery {
	id: any;
}

/** A Resource base class for ODATA entities. To create a resource is just
 * enough to extend this class and all the base ODATA functionalities will be present.
 */
export abstract class ODATAResource<R> extends Resource {
	@ResourceAction({
		path: '/{!id}'
	})
	get: ResourceMethod<SingleODATAQuery, R>;

	@ResourceAction({
		method: RequestMethod.Post
	})
	save: ResourceMethod<R, R>;

	@ResourceAction({
		params: {"$filter": "@$filter", "$search": "@$search", "$expand": "@$expand", "$limit": "@$limit", "query": "@query"},
		isArray: true
	})
	search: ResourceMethod<ODATAQuery, R[]>;

	getUrl(): string | Promise<string> {
		return super.getUrl() + "/" + this.getEntitySetName();
	}

	getEntityName(): string {
		return null;
	}

	private getEntitySetName() {
		return this.getEntityName() + "s";
	}
}

export interface ODATAResourceParamsBase extends ResourceParamsBase {
	/** The entity associated with this resource. */
	entity: any;
	/** The entity name in case it is different than the entity.
	 * It is good to specify it as the entity could be minified.
	 */
	name?: string;
}

/**
 * A ODATA annotation for a resource for a ODATA entity resource extending {@link ODATAResource}.
 */
export function ODATAResourceParams(params: ODATAResourceParamsBase) {
	const injectable = Injectable();
	const zuper = ResourceParams(params);

	return function (target: Type<Resource>) {
		injectable(target);
		zuper(target);
		target.prototype.getEntityName = function() {
			if (params.name) {
				return params.name;
			}
			return typeof params.entity === "string" ? params.entity : params.entity.name;
		};
	};
}
