import { TestBed, inject, async } from '@angular/core/testing';
import { ResourceModule, ResourceGlobalConfig } from '../ngx-resource';
import { NewsRes } from './test.resource'


describe('MockingTest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ResourceModule.forRoot()
      ]
    });
    ResourceGlobalConfig.mockResponses = true; // !!!
  });

  it('should mock query', async(inject([NewsRes], (testres: NewsRes) => {
    testres.query().$observable.subscribe((_news) => {
      expect(_news.map(_item => {return {id: _item.id, fullText: _item.fullText} })).toEqual([
        {id: 1, fullText: 'First News'},
        {id: 2, fullText: 'Second News'},
      ]);
    });
  })));

  it('should mock get', async(inject([NewsRes], (testres: NewsRes) => {
    testres.get({id: 1}).$observable.subscribe((news) => {
      expect(news.fullText).toEqual('First News');
    });
  })));

  it('should mock update', async(inject([NewsRes], (testres: NewsRes) => {
    testres.update({
      id: 2, title: 'Second',
      text: 'Second News',
      fullText: 'Second News Updated'}
    ).$observable.subscribe((news: any) => {
      expect(news.fullText).toEqual('Second News Updated');
    });
    testres.get({id: 2}).$observable.subscribe((news) => {
      expect(news.fullText).toEqual('Second News Updated');
    });
  })));

  it('should mock save', async(inject([NewsRes], (testres: NewsRes) => {
    testres.save({
      id: 3, title: 'Third',
      text: 'Third News',
      fullText: 'Third News'}
    ).$observable.subscribe((news: any) => {
      expect(news.fullText).toEqual('Third News');
    });
    testres.get({id: 3}).$observable.subscribe((news) => {
      expect(news.fullText).toEqual('Third News');
    });

  })));

  it('should mock delete', async(inject([NewsRes], (testres: NewsRes) => {
    testres.remove({id: 1}).$observable.toPromise();
    testres.query().$observable.subscribe((news: any[]) => {
      expect(news.find((itm) => itm.id === 1)).toBeUndefined();
    });
  })));

  it('should mock comments', async(inject([NewsRes], (testres: NewsRes) => {
    testres.comments({id: 1}).$observable.subscribe((comments: any[]) => {
      expect(comments.length).toEqual(1);
      expect(comments[0].text).toEqual('First News Comment');
    });
  })));

  it('should use custom mock function', async(inject([NewsRes], (testres: NewsRes) => {
    testres.something({id: 1}).$observable.subscribe((something: any) => {
      expect(something.key1).toEqual('value1');
      expect(something.key2).toEqual('value2');
    });
  })));

});
