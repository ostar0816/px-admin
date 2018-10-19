import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { PyxisNavigationComponent } from './navigation.component';
import { PyxisNavVerticalGroupComponent } from './vertical/nav-group/nav-vertical-group.component';
import { PyxisNavVerticalCollapseComponent } from './vertical/nav-collapse/nav-vertical-collapse.component';
import { PyxisNavVerticalItemComponent } from './vertical/nav-item/nav-vertical-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule,
    MatRippleModule,
  ],
  exports: [
    PyxisNavigationComponent
  ],
  declarations: [
    PyxisNavigationComponent,
    PyxisNavVerticalGroupComponent,    
    PyxisNavVerticalCollapseComponent,    
    PyxisNavVerticalItemComponent,
  ]
})
export class PyxisNavigationModule {
}
