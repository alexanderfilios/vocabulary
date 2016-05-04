import { Component } from '@angular/core';
import { Route, RouteConfig, RouterLink, RouterOutlet } from '@angular/router-deprecated';
import { Home } from 'src/views/home';
import { Projects } from 'src/views/projects';


@RouteConfig([
  new Route({path: '/', component: Home, name: 'Home'}),
  new Route({path: '/projects', component: Projects, name: 'Projects'})
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
