import { addProviders, inject, TestComponentBuilder } from '@angular/core/testing';
import { ApiService } from 'src/core/api';
import { ProjectService } from 'src/core/projects';
import { ProjectsPage } from './projects-page';


describe('ProjectsPage', () => {
  let builder;

  beforeEach(() => {
    addProviders([
      ApiService,
      ProjectService
    ]);

    inject([TestComponentBuilder], tcb => {
      builder = tcb;
    })();
  });

  it('should display a list of projects', done => {
    builder
      .createAsync(ProjectsPage)
      .then(fixture => {
        fixture.detectChanges();
        let compiled = fixture.nativeElement;

        fixture.componentInstance.projectService.projects.subscribe(() => {
          fixture.detectChanges();
          expect(compiled.querySelectorAll('li').length).toBe(3);
          done();
        });
      });
  });
});
