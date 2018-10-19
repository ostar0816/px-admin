import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { PyxisMatchMediaService } from '@pyxis/services/match-media.service';
import { PyxisMatSidenavHelperService } from '@pyxis/directives/pyxis-mat-sidenav/pyxis-mat-sidenav.service';

@Directive({
  selector: '[pyxisMatSidenavHelper]'
})
export class PyxisMatSidenavHelperDirective implements OnInit, OnDestroy {
  matchMediaSubscription: Subscription;
  @HostBinding('class.mat-is-locked-open') isLockedOpen = true;
  @Input('pyxisMatSidenavHelper') id: string;
  @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

  constructor(
    private pyxisMatSidenavService: PyxisMatSidenavHelperService,
    private pyxisMatchMedia: PyxisMatchMediaService,
    private observableMedia: ObservableMedia,
    private matSidenav: MatSidenav
  ) {
  }

  ngOnInit() {
    this.pyxisMatSidenavService.setSidenav(this.id, this.matSidenav);

    if (this.observableMedia.isActive(this.matIsLockedOpenBreakpoint)) {
      this.isLockedOpen = true;
      this.matSidenav.mode = 'side';
      this.matSidenav.toggle(true);
    }
    else {
      this.isLockedOpen = false;
      this.matSidenav.mode = 'over';
      this.matSidenav.toggle(false);
    }

    this.matchMediaSubscription = this.pyxisMatchMedia.onMediaChange.subscribe(() => {
      if (this.observableMedia.isActive(this.matIsLockedOpenBreakpoint)) {
        this.isLockedOpen = true;
        this.matSidenav.mode = 'side';
        this.matSidenav.toggle(true);
      }
      else {
        this.isLockedOpen = false;
        this.matSidenav.mode = 'over';
        this.matSidenav.toggle(false);
      }
    });
  }

  ngOnDestroy() {
    this.matchMediaSubscription.unsubscribe();
  }
}

@Directive({
  selector: '[pyxisMatSidenavToggler]'
})
export class PyxisMatSidenavTogglerDirective {
  @Input('pyxisMatSidenavToggler') id;

  constructor(private pyxisMatSidenavService: PyxisMatSidenavHelperService) {
  }

  @HostListener('click')
  onClick() {
    this.pyxisMatSidenavService.getSidenav(this.id).toggle();
  }
}
