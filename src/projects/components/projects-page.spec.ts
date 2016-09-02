import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/shared';
import { ProjectsService } from '../projects-service';
import { ProjectListComponent } from './project-list/project-list';
import { ProjectsPage } from './projects-page';


describe('ProjectsPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectListComponent,
        ProjectsPage
      ],
      imports: [
        SharedModule
      ],
      providers: [
        ProjectsService
      ]
    });
  });

  it('should display a list of projects', done => {
    TestBed.compileComponents()
      .then(() => {
        let fixture = TestBed.createComponent(ProjectsPage);
        fixture.detectChanges();

        let compiled = fixture.nativeElement;

        fixture.componentInstance.projectsService.projects.subscribe(() => {
          fixture.detectChanges();
          expect(compiled.querySelectorAll('li').length).toBe(3);
          done();
        });
      });
  });
});
