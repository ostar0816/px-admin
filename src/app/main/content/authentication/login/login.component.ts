import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PyxisConfigService } from '@pyxis/services/config.service';
import { pyxisAnimations } from '@pyxis/animations';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'pyxis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: pyxisAnimations
})
export class PyxisLoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private pyxisConfig: PyxisConfigService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.pyxisConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  onLogin(formValue: any) {
    this.authService.login(formValue.email, formValue.password).subscribe(
      res => {
        if (res['result']['success']) {
          this.authService.saveLoginData(res['data']);
          this.router.navigate(['article-management', 'categories']);
        }
      }
    );
  }
}
