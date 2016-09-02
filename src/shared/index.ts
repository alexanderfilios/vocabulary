import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiService } from './services/api-service';


@NgModule({
  exports: [
    CommonModule
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule {}


export { ApiService };
