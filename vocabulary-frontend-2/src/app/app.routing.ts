import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './components/home/home.routing';
import { AddRoutes } from "./components/add/add.routing";
import { ViewRoutes } from "./components/view/view.routing";
import {ViewPdfRoutes} from "./components/pdf/view-pdf.routing";

const appRoutes: Routes = [

    ...HomeRoutes,
    ...AddRoutes,
    ...ViewRoutes,
    ...ViewPdfRoutes

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
