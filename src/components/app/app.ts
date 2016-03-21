import { Component } from 'angular2/core';
import { RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';
import { Home } from '../home/home';
import { Projects } from '../projects/projects';


@RouteConfig([
  {path: '/', component: Home, as: 'Home'},
  {path: '/projects', component: Projects, as: 'Projects'}
])

@Component({
  directives: [
    RouterLink,
    RouterOutlet
  ],
  selector: 'app',
  template: `
    <header>
      <a [routerLink]="['/Home']">Home</a> | <a [routerLink]="['/Projects']">Projects</a>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
    
    <div class="vendor-widget">
      Vendor widget styled via src/assets/vendor.css
      <img src="images/image.png" />
    </div>
  `
})

export class App {}
