import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { pyxisAnimations } from '@pyxis/animations';
import { PyxisConfigService } from '@pyxis/services/config.service';

import { PyxisMembersMemberFormDialogComponent } from './member-form/member-form.component';
import { MembersService } from './members.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: pyxisAnimations
})
export class TeamComponent implements OnInit {

  hasSelectedMembers: boolean;
  searchInput: FormControl;
  dialogRef: any;
  onSelectedMembersChangedSubscription: Subscription;

  constructor(
    private membersService: MembersService,
    public dialog: MatDialog,
    private pyxisConfig: PyxisConfigService
  ) {
    this.searchInput = new FormControl('');

    this.pyxisConfig.setConfig({
      layout: {
        navigation: 'left',
        toolbar: 'below',
        footer: 'below'
      }
    });
  }

  newMember() {
    this.dialogRef = this.dialog.open(PyxisMembersMemberFormDialogComponent, {
      panelClass: 'member-form-dialog',
      data: {
        action: 'new'
      }
    });

    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }

      this.membersService.addMember(response.getRawValue());

    });
  }

  ngOnInit() {
    this.onSelectedMembersChangedSubscription =
      this.membersService.onSelectedMembersChanged
        .subscribe(selectedMembers => {
          this.hasSelectedMembers = selectedMembers.length > 0;
        });

    this.searchInput.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.membersService.onSearchTextChanged.next(searchText);
      });
  }

  ngOnDestroy() {
    this.onSelectedMembersChangedSubscription.unsubscribe();
  }
}
