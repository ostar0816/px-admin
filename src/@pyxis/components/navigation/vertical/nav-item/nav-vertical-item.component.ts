import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pyxis-nav-vertical-item',
  templateUrl: './nav-vertical-item.component.html',
  styleUrls: ['./nav-vertical-item.component.scss']
})
export class PyxisNavVerticalItemComponent {
  @HostBinding('class') classes = 'nav-item';
  @Input() item: any;

  constructor() {
  }
}
