import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrudObsTestComponent } from './crud-obs-test.component';

describe('CrudObsTestComponent', () => {
  let component: CrudObsTestComponent;
  let fixture: ComponentFixture<CrudObsTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudObsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudObsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
