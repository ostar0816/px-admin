import { Component } from '@angular/core';

import { PyxisSplashScreenService } from '@pyxis/services/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private pyxisSplashScreen: PyxisSplashScreenService
  ) {}
}
