import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "environments/environment";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) { }

  login(email: string, password: string) {
    return this.http.post(
      this.toApiUrl('admin/login'),
      { email: email, password: password },
      {
        headers: new HttpHeaders({
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        })
      }
    );
  }

  logout() {
    if (this.isAuthenticated) {
      this.removeLoginData();
      this.router.navigate(['auth/login']);
    }
  }

  saveLoginData(loginData) {
    localStorage.setItem('name', loginData.admin.firstName + ' ' + loginData.admin.lastName);
    localStorage.setItem('email', loginData.admin.email);
    localStorage.setItem('token', loginData.token);
  }

  removeLoginData() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }

  getUserName() {
    return localStorage.getItem('name');
  }

  getUserEmail() {
    return localStorage.getItem('email');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();

    const jwtHelper = new JwtHelperService();

    return !jwtHelper.isTokenExpired(token);
  }

  toApiUrl(href): string {
    return environment.apiBaseUrl + href;
  }
}