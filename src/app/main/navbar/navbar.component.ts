import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PyxisSidebarService } from '@pyxis/components/sidebar/sidebar.service';
import { PyxisNavigationService } from '@pyxis/components/navigation/navigation.service';

import { navigation } from 'app/navigation/navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnDestroy {
  @Input() layout;
  navigation: any;
  navigationServiceWatcher: Subscription;

  constructor(
    private sidebarService: PyxisSidebarService,
    private navigationService: PyxisNavigationService
  ) {
    this.navigation = navigation;
    this.layout = 'vertical';
  }

  ngOnDestroy() {
    if (this.navigationServiceWatcher) {
      this.navigationServiceWatcher.unsubscribe();
    }
  }

  toggleSidebarOpened(key) {
    this.sidebarService.getSidebar(key).toggleOpen();
  }

  toggleSidebarFolded(key) {
    this.sidebarService.getSidebar(key).toggleFold();
  }
}
