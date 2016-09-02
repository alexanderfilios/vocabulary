import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared';
import { ProjectsService } from './projects-service';
import { ProjectListComponent } from './components/project-list/project-list';
import { ProjectsPage } from './components/projects-page';


const routes: Routes = [
  {path: 'projects', component: ProjectsPage}
];


@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectsPage
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsModule {}


export { ProjectsService };
