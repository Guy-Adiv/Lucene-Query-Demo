import { Component, OnInit } from '@angular/core';
import * as luceneParser from 'lucene';
import { lucene as luceneBuilder} from 'lucene-query-string-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'lucene-demo';

  constructor() {

  }

  ngOnInit(): void {
    /* console.log(luceneBuilder.and('fds', 'aaa'));
    console.log(luceneBuilder.or('fds', 'aaa'));
    console.log(luceneBuilder.not('fds', 'aaa')); */
    this.test1();
  }

  test1() {
    console.log(luceneBuilder);
    const findUserLuceneQueryString = luceneBuilder.builder((data: any) => {

      // just to make the example more readable;
      const _ = luceneBuilder;

      const query =  _.group(_.and(
        _.field('eye-color', _.term(data.eye.color)),
        _.field('age', _.range(data.age.min, data.age.max))
      ));

      return query;
    });

    const luceneQueryString = findUserLuceneQueryString({
      eye: { color: 'brown'},
      age: {
        min: '10',
        max: '20'
      }
    });

    const expectedResult = '( eye-color: "brown" AND age: { 10 TO 20 } )';
    console.log('result', luceneQueryString);
    console.log('expected:', expectedResult);
    const result = luceneQueryString === expectedResult; // => true

    console.log(result);
              // '( eye-color: "brown" AND age: "{ 10 TO 20 }" )'
    const q = '( eye-color: "brown" AND age: "{ 10 TO 20 }" )';
    const ast = luceneParser.parse(q);
    console.log('query object: ', ast);
    console.log('parsed: ', luceneParser.toString(ast));
    console.log('JSON ', JSON.stringify(ast));
  }
}
