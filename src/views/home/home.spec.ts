import { Component } from 'angular2/core';
import { describe, expect, it, injectAsync, TestComponentBuilder } from 'angular2/testing';
import { Home } from './home';


@Component({
  template: '',
  directives: [Home]
})
class TestComponent {}


describe('Home', () => {
  it('should display a greeting', injectAsync([TestComponentBuilder], tcb => {
    return new Promise(resolve => {
      tcb.createAsync(Home)
        .then(fixture => {
          fixture.detectChanges();
          let compiled = fixture.nativeElement;
          expect(compiled.querySelector('h3')).toHaveText('Hello world!');
          resolve();
        });
    });
  }));

  it('should display a greeting (overrideTemplate)', injectAsync([TestComponentBuilder], tcb => {
    return new Promise(resolve => {
      tcb.overrideTemplate(TestComponent, '<home></home>')
        .createAsync(Home)
        .then(fixture => {
          fixture.detectChanges();
          let compiled = fixture.nativeElement;
          expect(compiled.querySelector('h3')).toHaveText('Hello world!');
          resolve();
        });
    });
  }));
});
