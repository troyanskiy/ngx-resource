import { Component, OnInit } from '@angular/core';
import { CrudObsTestResource } from '../../resources/crud-obs-test/crud-obs-test.resource';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud-obs-test',
  templateUrl: './crud-obs-test.component.html',
  styleUrls: ['./crud-obs-test.component.scss']
})
export class CrudObsTestComponent implements OnInit {

  query$: Observable<any[]>;
  getOne$: Observable<any>;

  constructor(private testResource: CrudObsTestResource) {
    this.query$ = this.testResource.query();
    this.getOne$ = this.testResource.get({id: Math.ceil(Math.random() * 50)});
  }

  ngOnInit() {

  }

}
