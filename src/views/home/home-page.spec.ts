import { Component } from '@angular/core';
import { inject, TestComponentBuilder } from '@angular/core/testing';
import { HomePage } from './home-page';


@Component({
  template: '',
  directives: [HomePage]
})
class TestComponent {}


describe('HomePage', () => {
  let builder;

  beforeEach(() => {
    inject([TestComponentBuilder], tcb => {
      builder = tcb;
    })();
  });

  it('should display a greeting', () => {
    builder.createAsync(HomePage)
      .then(fixture => {
        fixture.detectChanges();
        let compiled = fixture.nativeElement;
        expect(compiled.querySelector('h3').textContent).toBe('Hello Angular! :)');
      });
  });

  it('should display a greeting (overrideTemplate)', () => {
    builder
      .overrideTemplate(TestComponent, '<home></home>')
      .createAsync(HomePage)
      .then(fixture => {
        fixture.detectChanges();
        let compiled = fixture.nativeElement;
        expect(compiled.querySelector('h3').textContent).toBe('Hello Angular! :)');
      });
  });
});
