import { Component, ElementRef, HostBinding, Inject, OnDestroy, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs/Subscription';

import { PyxisConfigService } from '@pyxis/services/config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnDestroy {
  onConfigChanged: Subscription;
  pyxisSettings: any;
  @HostBinding('attr.pyxis-layout-mode') layoutMode;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private pyxisConfig: PyxisConfigService,
    private platform: Platform,
    @Inject(DOCUMENT) private document: any
  ) {
    this.onConfigChanged = this.pyxisConfig.onConfigChanged.subscribe(
      (newSettings) => {
        this.pyxisSettings = newSettings;
        this.layoutMode = this.pyxisSettings.layout.mode;
      }
    );

    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.className += ' is-mobile';
    }
  }

  ngOnDestroy() {
    this.onConfigChanged.unsubscribe();
  }

  addClass(className: string) {
    this._renderer.addClass(this._elementRef.nativeElement, className);
  }

  removeClass(className: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, className);
  }
}
