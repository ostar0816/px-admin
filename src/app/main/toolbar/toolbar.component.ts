import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { PyxisConfigService } from '@pyxis/services/config.service';
import { PyxisSidebarService } from '@pyxis/components/sidebar/sidebar.service';

import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {
  selectedLanguage: any;
  showLoadingBar: boolean;
  horizontalNav: boolean;
  noNav: boolean;
  adminName: string;

  constructor(
    private router: Router,
    private pyxisConfig: PyxisConfigService,
    private sidebarService: PyxisSidebarService,
    private authService: AuthService
  ) {
    this.adminName = this.authService.getUserName();    
  }

  toggleSidebarOpened(key) {
    this.sidebarService.getSidebar(key).toggleOpen();
  }

  onLogOut() {
    this.authService.logout();
  }

}
