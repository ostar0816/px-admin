import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pyxis-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PyxisNavigationComponent {
  @Input() layout = 'vertical';
  @Input() navigation: any;

  constructor() {

  }
}
