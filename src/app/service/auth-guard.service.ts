import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }

    return true;
  }
}