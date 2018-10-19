import { NgModule } from '@angular/core';

import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@NgModule({
  imports: [
    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ]
})
export class AuthenticationModule { }
