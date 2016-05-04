import { Component } from '@angular/core';
import { async, describe, expect, inject, it } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Home } from './home';


@Component({
  template: '',
  directives: [Home]
})
class TestComponent {}


describe('Home', () => {
  it('should display a greeting', async(inject([TestComponentBuilder], tcb => {
    tcb.createAsync(Home)
      .then(fixture => {
        fixture.detectChanges();
        let compiled = fixture.nativeElement;
        expect(compiled.querySelector('h3')).toHaveText('Hello world!');
      });
  })));

  it('should display a greeting (overrideTemplate)', async(inject([TestComponentBuilder], tcb => {
    tcb.overrideTemplate(TestComponent, '<home></home>')
      .createAsync(Home)
      .then(fixture => {
        fixture.detectChanges();
        let compiled = fixture.nativeElement;
        expect(compiled.querySelector('h3')).toHaveText('Hello world!');
      });
  })));
});
