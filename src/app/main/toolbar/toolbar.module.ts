import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';

import { PyxisSharedModule } from '@pyxis/shared.module';

import { ToolbarComponent } from 'app/main/toolbar/toolbar.component';
import { AuthService } from 'app/service/auth.service';

import { PyxisSearchBarModule } from '@pyxis/components';

@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [
    RouterModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,

    PyxisSharedModule,
    PyxisSearchBarModule,    
  ],
  exports: [
    ToolbarComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class ToolbarModule {
}
