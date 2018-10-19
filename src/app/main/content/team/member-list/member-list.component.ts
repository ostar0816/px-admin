import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, _MatFormFieldMixinBase } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { pyxisAnimations } from '@pyxis/animations';
import { PyxisConfirmDialogComponent } from '@pyxis/components/confirm-dialog/confirm-dialog.component';

import { PyxisMembersMemberFormDialogComponent } from '../member-form/member-form.component';
import { MembersService } from '../members.service';

@Component({
  selector: 'pyxis-members-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: pyxisAnimations
})
export class PyxisMembersMemberListComponent implements OnInit, OnDestroy {
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

  members: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['checkbox', 'avatar', 'name', 'position', 'buttons'];
  selectedMembers: any[];
  checkboxes: {};

  onMembersChangedSubscription: Subscription;
  onSelectedMembersChangedSubscription: Subscription;
  onUserDataChangedSubscription: Subscription;

  dialogRef: any;

  confirmDialogRef: MatDialogRef<PyxisConfirmDialogComponent>;

  constructor(
    private membersService: MembersService,
    public dialog: MatDialog
  ) {
    this.onMembersChangedSubscription =
      this.membersService.onMembersChanged.subscribe(members => {

        this.members = members;

        this.checkboxes = {};
        members.map(member => {
          this.checkboxes[member.id] = false;
        });
      });

    this.onSelectedMembersChangedSubscription =
      this.membersService.onSelectedMembersChanged.subscribe(selectedMembers => {
        for (const id in this.checkboxes) {
          if (!this.checkboxes.hasOwnProperty(id)) {
            continue;
          }

          this.checkboxes[id] = selectedMembers.includes(id);
        }
        this.selectedMembers = selectedMembers;
      });

    this.onUserDataChangedSubscription =
      this.membersService.onUserDataChanged.subscribe(user => {
        this.user = user;
      });

  }

  ngOnInit() {
    this.dataSource = new FilesDataSource(this.membersService);
  }

  ngOnDestroy() {
    this.onMembersChangedSubscription.unsubscribe();
    this.onSelectedMembersChangedSubscription.unsubscribe();
    this.onUserDataChangedSubscription.unsubscribe();
  }

  editMember(member) {
    this.dialogRef = this.dialog.open(PyxisMembersMemberFormDialogComponent, {
      panelClass: 'member-form-dialog',
      data: {
        member: member,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }

      const actionType: string = response[0];
      const formData: FormGroup = response[1];

      switch (actionType) {
        case 'save': {
          this.membersService.updateMember(formData.getRawValue());
          break;
        }
        case 'delete': {
          this.deleteMember(member);
          break;
        }
      }
    });
  }

  deleteMember(member) {
    this.confirmDialogRef = this.dialog.open(PyxisConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this member?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.membersService.deleteMember(member);
      }
      this.confirmDialogRef = null;
    });
  }

  onSelectedChange(memberId) {
    this.membersService.toggleSelectedMember(memberId);
  }

  toggleStar(memberId) {
    if (this.user.starred.includes(memberId)) {
      this.user.starred.splice(this.user.starred.indexOf(memberId), 1);
    }
    else {
      this.user.starred.push(memberId);
    }

    this.membersService.updateUserData(this.user);
  }
}

export class FilesDataSource extends DataSource<any>
{
  constructor(private membersService: MembersService) {
    super();
  }

  connect(): Observable<any[]> {
    return this.membersService.onMembersChanged;
  }

  disconnect() {
  }
}
