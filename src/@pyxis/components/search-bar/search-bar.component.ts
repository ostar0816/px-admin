import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PyxisConfigService } from '@pyxis/services/config.service';

@Component({
  selector: 'pyxis-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class PyxisSearchBarComponent {
  collapsed: boolean;
  toolbarColor: string;
  @Output() onInput: EventEmitter<any> = new EventEmitter();
  onConfigChanged: Subscription;

  constructor(
    private pyxisConfig: PyxisConfigService
  ) {
    this.collapsed = true;
    this.onConfigChanged = this.pyxisConfig.onConfigChanged.subscribe(
      (newSettings) => {
        this.toolbarColor = newSettings.colorClasses.toolbar;
      }
    );
  }

  collapse() {
    this.collapsed = true;
  }

  expand() {
    this.collapsed = false;
  }

  search(event) {
    const value = event.target.value;

    this.onInput.emit(value);
  }

}
