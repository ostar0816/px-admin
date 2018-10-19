import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Member } from '../member.model';
import { MembersService } from '../members.service';

@Component({
  selector: 'pyxis-members-member-form-dialog',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PyxisMembersMemberFormDialogComponent {
  dialogTitle: string;
  memberForm: FormGroup;
  action: string;
  member: Member;
  selectedFile: File = null;
  selectedFileName: string;

  constructor(
    public dialogRef: MatDialogRef<PyxisMembersMemberFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private membersService: MembersService
  ) {
    this.action = data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Member';
      this.member = data.member;
    }
    else {
      this.dialogTitle = 'New Member';
      this.member = new Member({});
    }

    this.memberForm = this.createMemberForm();
  }

  createMemberForm() {
    return this.formBuilder.group({
      _id: [this.member._id],
      firstName: [this.member.firstName],
      lastName: [this.member.lastName],
      avatar: [this.member.avatar],
      position: [this.member.position]
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    this.membersService.uploadImage(this.selectedFile, this.member).subscribe(res => {
      if (res['result']['success']) {
        this.member.avatar = res['data'];

        this.memberForm.setValue({
          _id: this.member._id,
          firstName: this.member.firstName,
          lastName: this.member.lastName,
          avatar: this.member.avatar,
          position: this.member.position
        });
      }
    });
  }
}
