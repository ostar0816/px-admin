import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { PyxisConfirmDialogComponent } from '@pyxis/components/confirm-dialog/confirm-dialog.component';

import { MembersService } from '../members.service';

@Component({
  selector: 'pyxis-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class PyxisMembersSelectedBarComponent {
  selectedMembers: string[];
  hasSelectedMembers: boolean;
  isIndeterminate: boolean;
  confirmDialogRef: MatDialogRef<PyxisConfirmDialogComponent>;

  constructor(
    private membersService: MembersService,
    public dialog: MatDialog
  ) {
    this.membersService.onSelectedMembersChanged
      .subscribe(selectedMembers => {
        this.selectedMembers = selectedMembers;
        setTimeout(() => {
          this.hasSelectedMembers = selectedMembers.length > 0;
          this.isIndeterminate = (selectedMembers.length !== this.membersService.members.length && selectedMembers.length > 0);
        }, 0);
      });

  }

  selectAll() {
    this.membersService.selectMembers();
  }

  deselectAll() {
    this.membersService.deselectMembers();
  }

  deleteSelectedMembers() {
    this.confirmDialogRef = this.dialog.open(PyxisConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected members?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.membersService.deleteSelectedMembers();
      }
      this.confirmDialogRef = null;
    });
  }

}
