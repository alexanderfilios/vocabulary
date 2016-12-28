import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooComponent } from './components/foo/foo.component';
import { BarComponent } from './components/bar/bar.component';

import { routing }       from './app.routing';
import { AddComponent } from "./components/add/add.component";

import {TermModel} from "./shared/models/term-model";
import {TermService} from "./shared/services/term-service";
import {LoggerService} from "./shared/services/logger-service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  declarations: [
    AppComponent,
    BarComponent,
    FooComponent,
    HomeComponent,
    AddComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
      TermModel, TermService, LoggerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
