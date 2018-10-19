import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';

import { PyxisResetPasswordComponent } from './reset-password.component';

const routes = [
  {
    path: 'reset-password',
    component: PyxisResetPasswordComponent
  }
];

@NgModule({
  declarations: [
    PyxisResetPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    PyxisSharedModule
  ]
})
export class ResetPasswordModule { }
