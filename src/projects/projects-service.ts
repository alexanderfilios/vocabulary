import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'src/shared';


@Injectable()
export class ProjectsService {
  projects: Observable<any[]>;

  constructor(api: ApiService) {
    this.projects = api.fetchProjects();
  }
}
