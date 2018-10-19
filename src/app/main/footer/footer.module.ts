import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';

import { FooterComponent } from 'app/main/footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,

    PyxisSharedModule,
  ],
  exports: [
    FooterComponent,
  ]
})
export class FooterModule {
}
