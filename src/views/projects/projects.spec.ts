import { describe, expect, it, beforeEachProviders, injectAsync, TestComponentBuilder } from 'angular2/testing';
import { AuthService } from 'src/core/auth';
import { ProjectService } from 'src/core/project';
import { Projects } from './projects';


describe('Projects', () => {
  beforeEachProviders(() => [
    AuthService,
    ProjectService
  ]);

  it('should display a list of projects', injectAsync([TestComponentBuilder], tcb => {
    return new Promise(resolve => {
      tcb.createAsync(Projects)
        .then(fixture => {
          fixture.detectChanges();
          let compiled = fixture.nativeElement;

          return fixture.componentInstance.loaded.then(() => {
            fixture.detectChanges();
            expect(compiled.querySelectorAll('li').length).toBe(2);
            resolve();
          });
        });
    });
  }));
});
