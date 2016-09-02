import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';


@Component({
  template: ''
})
class TestComponent {}


describe('HomePage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage,
        TestComponent
      ]
    });
  });

  it('should display a greeting', async(() => {
    TestBed.compileComponents()
      .then(() => {
        let fixture = TestBed.createComponent(HomePage);
        fixture.detectChanges();

        let compiled = fixture.nativeElement;

        expect(compiled.querySelector('h3').textContent).toBe('Hello Angular! :)');
      });
  }));
});
