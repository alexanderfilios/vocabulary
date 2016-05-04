import { async, beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { AuthService } from 'src/core/auth';
import { ProjectService } from 'src/core/project';
import { Projects } from './projects';


describe('Projects', () => {
  beforeEachProviders(() => [
    AuthService,
    ProjectService
  ]);

  it('should display a list of projects', async(inject([TestComponentBuilder], tcb => {
    tcb.createAsync(Projects)
      .then(fixture => {
        fixture.detectChanges();
        let compiled = fixture.nativeElement;

        return fixture.componentInstance.loaded.then(() => {
          fixture.detectChanges();
          expect(compiled.querySelectorAll('li').length).toBe(2);
        });
      });
  })));
});
