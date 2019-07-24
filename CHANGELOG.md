## 5.4.4

### Bug fix

* Fixes Angular Universal compatibility

## 5.4.3

### Bug fix

* Remove `id` from body of delete request

## 5.4.2

### Improvement

* Added new query mapping method `ResourceQueryMappingMethod.None` in order
to have query params as is (not converted)

## 5.4.1

### Improvement

* Added fourth optional generic type for query result
`ResourceCRUD<TQuery, TShort, TFull, TQueryResult = TShort[]>`

## 5.4.0

### Improvement

* Added `patch` method to CRUD resource

## 5.3.0

### Improvement

* Implemented new ResourceAction flag `asResourceResponse` which will
make reshource method to return IResourceResponse object instead of just body.

  * Interfaces for auto complition
    * `IResourceMethodStrictFull<IB, IQ, IP, O>` 
    * `IResourceMethodFull<IB, O>`
    * `IResourceMethodResultStrictFull<IB, IQ, IP, O>`
    * `IResourceMethodResultFull<IB, O>`

## 5.2.2

### Bugs fixed

* Remove body from DELETE requests #20

## 5.2.0

### Improvement

* Added static fields to `ResourceModel` in order to define custom resource method names
``` typescript
  protected static methodQuery: string = 'query';
  protected static methodGet: string = 'get';
  protected static methodCreate: string = 'create';
  protected static methodUpdate: string = 'update';
  protected static methodRemove: string = 'remove';
```
  
## 5.1.0

### Improvement

* Added static methods `ResourceModel` in order to not inject resources (need to inject once to create instance into
your `AppComponent` (first loaded component)
  * `get(id: string): Promise<any>`
  * `query(query?: any): Promise<any[]>`
  * `remove(id: string): Promise<void>`

## 5.0.0

### Breaking changes

* Use npm `@ngx-resource/core` instead of `rest-core`
* All `Rest` names and file refactored to `Resource`

## 0.2.0

### Bug Fixes

* Default query parameter build method set to `RestGlobalConfig`

### Improvements

* Added flag `queryMappingMethod` to `RestParams` and `RestAction` to define 
query parameter build method per Rest class or per method.

### Breaking Changes

* `getParamsMappingType` property renamed to `queryMappingMethod` in `RestGlobalConfig`
* `RestGetParamsMappingType` enum renamed to `RestQueryMappingMethod`

## 0.1.2 Release
