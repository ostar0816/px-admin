import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';

import { PyxisLoginComponent } from './login.component';
import { AuthService } from 'app/service/auth.service';

const routes = [
  {
    path: 'login',
    component: PyxisLoginComponent
  }
];

@NgModule({
  declarations: [
    PyxisLoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    PyxisSharedModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
