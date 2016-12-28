import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarRoutes } from './components/bar/bar.routing';
import { FooRoutes } from './components/foo/foo.routing';
import { HomeRoutes } from './components/home/home.routing';
import { AddRoutes } from "./components/add/add.routing";

const appRoutes: Routes = [

  ...HomeRoutes,
  ...BarRoutes,
  ...FooRoutes,
  ...AddRoutes

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
