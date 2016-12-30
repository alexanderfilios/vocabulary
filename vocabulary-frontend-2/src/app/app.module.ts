import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { TagInputModule } from "ng2-tag-input";

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';

import { routing }       from './app.routing';
import { AddComponent } from "./components/add/add.component";

import { TermModel } from "./shared/models/term-model";
import { TermService } from "./shared/services/term-service";
import { LoggerService } from "./shared/services/logger-service";
import { DictionaryLinkPipe } from "./shared/pipes/dictionary-link.pipe";
import {ViewComponent} from "./components/view/view.component";
import {SafePipe} from "./shared/pipes/safe-pipe";


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    TagInputModule,
    routing,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DictionaryLinkPipe,
    SafePipe,
    AddComponent,
    ViewComponent
  ],
  providers: [
    { provide: 'Window', useValue: window },
      TermModel, TermService, LoggerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
