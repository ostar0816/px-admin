import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';
import { PyxisConfirmDialogModule } from '@pyxis/components';

import { AuthGuardService } from 'app/service/auth-guard.service';

import { TeamComponent } from './team.component';
import { MembersService } from './members.service';
import { PyxisMembersMemberListComponent } from './member-list/member-list.component';
import { PyxisMembersSelectedBarComponent } from './selected-bar/selected-bar.component';
import { PyxisMembersMemberFormDialogComponent } from './member-form/member-form.component';

const routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: TeamComponent,
    resolve: {
      members: MembersService
    }
  }
];

@NgModule({
  declarations: [
    TeamComponent,
    PyxisMembersMemberListComponent,
    PyxisMembersSelectedBarComponent,
    PyxisMembersMemberFormDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CdkTableModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,

    PyxisSharedModule,
    PyxisConfirmDialogModule
  ],
  providers: [
    MembersService,
    AuthGuardService,
  ],
  entryComponents: [PyxisMembersMemberFormDialogComponent]
})
export class TeamModule { }
