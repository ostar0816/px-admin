import { NgModule } from '@angular/core';

import { PyxisIfOnDomDirective } from '@pyxis/directives/pyxis-if-on-dom/pyxis-if-on-dom.directive';
import { PyxisPerfectScrollbarDirective } from '@pyxis/directives/pyxis-perfect-scrollbar/pyxis-perfect-scrollbar.directive';
import { PyxisMatSidenavHelperDirective, PyxisMatSidenavTogglerDirective } from '@pyxis/directives/pyxis-mat-sidenav/pyxis-mat-sidenav.directive';

@NgModule({
  declarations: [
    PyxisIfOnDomDirective,
    PyxisMatSidenavHelperDirective,
    PyxisMatSidenavTogglerDirective,
    PyxisPerfectScrollbarDirective
  ],
  imports: [],
  exports: [
    PyxisIfOnDomDirective,
    PyxisMatSidenavHelperDirective,
    PyxisMatSidenavTogglerDirective,
    PyxisPerfectScrollbarDirective
  ]
})
export class PyxisDirectivesModule {
}
