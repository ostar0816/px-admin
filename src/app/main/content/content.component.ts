import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { pyxisAnimations } from '@pyxis/animations/index';
import { PyxisConfigService } from '@pyxis/services/config.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: pyxisAnimations
})
export class ContentComponent implements OnDestroy {
  onConfigChanged: Subscription;
  pyxisSettings: any;

  @HostBinding('@routerTransitionUp') routeAnimationUp = false;
  @HostBinding('@routerTransitionDown') routeAnimationDown = false;
  @HostBinding('@routerTransitionRight') routeAnimationRight = false;
  @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
  @HostBinding('@routerTransitionFade') routeAnimationFade = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pyxisConfig: PyxisConfigService
  ) {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe((event) => {
        switch (this.pyxisSettings.routerAnimation) {
          case 'fadeIn':
            this.routeAnimationFade = !this.routeAnimationFade;
            break;
          case 'slideUp':
            this.routeAnimationUp = !this.routeAnimationUp;
            break;
          case 'slideDown':
            this.routeAnimationDown = !this.routeAnimationDown;
            break;
          case 'slideRight':
            this.routeAnimationRight = !this.routeAnimationRight;
            break;
          case 'slideLeft':
            this.routeAnimationLeft = !this.routeAnimationLeft;
            break;
        }
      });

    this.onConfigChanged =
      this.pyxisConfig.onConfigChanged
        .subscribe(
          (newSettings) => {
            this.pyxisSettings = newSettings;
          }
        );
  }

  ngOnDestroy() {
    this.onConfigChanged.unsubscribe();
  }
}
