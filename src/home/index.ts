import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared';
import { HomePage } from './components/home-page';


const routes: Routes = [
  {path: '', component: HomePage}
];


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule {}
