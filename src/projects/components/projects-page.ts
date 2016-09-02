import { Component } from '@angular/core';
import { ProjectsService } from '../projects-service';


@Component({
  template: `
    <project-list [projects]="projectsService.projects"></project-list>
  `
})

export class ProjectsPage {
  constructor(public projectsService: ProjectsService) {}
}
