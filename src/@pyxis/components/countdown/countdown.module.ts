import { NgModule } from '@angular/core';

import { PyxisCountdownComponent } from '@pyxis/components/countdown/countdown.component';

@NgModule({
  declarations: [
    PyxisCountdownComponent
  ],
  exports: [
    PyxisCountdownComponent
  ],
})
export class PyxisCountdownModule {
}
