import { NgModule } from '@angular/core';

import { 
  MatButtonModule, 
  MatIconModule 
} from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';
import { PyxisNavigationModule } from '@pyxis/components/navigation/navigation.module';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    MatButtonModule,
    MatIconModule,

    PyxisSharedModule,
    PyxisNavigationModule,
  ],
  exports: [
    NavbarComponent
  ]  
})
export class NavbarModule { }
