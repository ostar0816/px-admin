import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { PyxisSearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [
    PyxisSearchBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    PyxisSearchBarComponent,
  ]
})
export class PyxisSearchBarModule {
}
