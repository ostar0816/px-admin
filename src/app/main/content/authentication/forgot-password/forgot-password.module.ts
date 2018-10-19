import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';

import { PyxisForgotPasswordComponent } from './forgot-password.component';

const routes = [
  {
    path: 'forgot-password',
    component: PyxisForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    PyxisForgotPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    PyxisSharedModule,
  ]
})
export class ForgotPasswordModule { }
