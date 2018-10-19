import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'pyxis-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class PyxisConfirmDialogComponent {
  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<PyxisConfirmDialogComponent>) {
  }

}
