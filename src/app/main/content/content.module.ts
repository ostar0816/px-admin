import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PyxisSharedModule } from '@pyxis/shared.module';

import { ContentComponent } from './content.component';

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    RouterModule,
    PyxisSharedModule,
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule { }
