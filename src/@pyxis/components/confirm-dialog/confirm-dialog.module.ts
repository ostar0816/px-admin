import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { PyxisConfirmDialogComponent } from '@pyxis/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    PyxisConfirmDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    PyxisConfirmDialogComponent
  ],
})
export class PyxisConfirmDialogModule {
}
