import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PyxisConfigService } from '@pyxis/services/config.service';
import { pyxisAnimations } from '@pyxis/animations';

@Component({
  selector: 'pyxis-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  animations: pyxisAnimations
})
export class PyxisComingSoonComponent implements OnInit {
  comingSoonForm: FormGroup;
  comingSoonFormErrors: any;

  constructor(
    private pyxisConfig: PyxisConfigService,
    private formBuilder: FormBuilder
  ) {
    this.pyxisConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.comingSoonFormErrors = {
      email: {}
    };
  }

  ngOnInit() {
    this.comingSoonForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.comingSoonForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  onRegisterFormValuesChanged() {
    for (const field in this.comingSoonFormErrors) {
      if (!this.comingSoonFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.comingSoonFormErrors[field] = {};

      // Get the control
      const control = this.comingSoonForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.comingSoonFormErrors[field] = control.errors;
      }
    }
  }
}
