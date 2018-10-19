import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';
import { PyxisSidebarModule } from '@pyxis/components';

import { ToolbarModule } from './toolbar/toolbar.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { ContentModule } from './content/content.module';

import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    RouterModule,

    MatSidenavModule,

    PyxisSharedModule,
    PyxisSidebarModule,

    ToolbarModule,
    NavbarModule,
    FooterModule,
    ContentModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
