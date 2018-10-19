import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { PYXIS_CONFIG, PyxisConfigService } from '@pyxis/services/config.service';
import { PyxisSplashScreenService } from '@pyxis/services/splash-screen.service';
import { PyxisSidebarService } from '@pyxis/components/sidebar/sidebar.service';
import { PyxisMatchMediaService } from '@pyxis/services/match-media.service';
import { PyxisNavigationService } from '@pyxis/components/navigation/navigation.service';

@NgModule({
  entryComponents: [],
  providers: [
    PyxisConfigService,
    PyxisSplashScreenService,
    PyxisSidebarService,
    PyxisMatchMediaService,
    PyxisNavigationService,
  ]
})
export class PyxisModule {
  constructor(@Optional() @SkipSelf() parentModule: PyxisModule) {
    if (parentModule) {
      throw new Error('PyxisModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: PyxisModule,
      providers: [
        {
          provide: PYXIS_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
