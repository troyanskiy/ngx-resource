import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from '../ng2-resource-rest';

interface IQueryInput {
  page?: number;
  perPage?: number;
  dateFrom?: string;
  dateTo?: string;
  isRead?: string;
}

interface INewsShort {
  id: number;
  title: string;
  text: string;
}

interface INews extends INewsShort {
  image?: string;
  fullText: string;
}

interface IComment {
  id: number;
  news_id: number;
  text: string;
}

var newsCollection = [
  {id: 1, fullText: 'First News'},
  {id: 2, fullText: 'Second News'},
];

var commentsCollection = [
  {id: 1, news_id: 1, text: 'First News Comment'},
  {id: 2, news_id: 2, fullText: 'Second News Comment'},
];

function customMockFunction(resourceActionName: string, pathParams: any, data: any, method: RequestMethod) {
  return {key1: 'value1', key2: 'value2'}
}

@Injectable()
@ResourceParams({
  url: 'https://domain.net/api/news',
  mockCollection: newsCollection
})
export class NewsRes extends Resource {

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<IQueryInput, INewsShort[]>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{id: any}, INews>;

  @ResourceAction({
    path: '/{!id}/comments',
    isArray: true,
    mockCollection: {collection: commentsCollection, lookupParams: {id: 'news_id'}}
  })
  comments: ResourceMethod<{id: any}, IComment[]>;

  @ResourceAction({
    path: '/{!id}/something',
    mockCollection: customMockFunction
  })
  something: ResourceMethod<{id: any}, any>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<INews, INews>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!id}'
  })
  update: ResourceMethod<INews, INews>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;
}
