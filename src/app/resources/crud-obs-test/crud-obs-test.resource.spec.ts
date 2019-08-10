import { TestBed } from '@angular/core/testing';

import { CrudObsTestResource } from './crud-obs-test.resource';

describe('CrudObsTestResource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudObsTestResource = TestBed.get(CrudObsTestResource);
    expect(service).toBeTruthy();
  });
});
