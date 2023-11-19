import {Component, Input} from '@angular/core';
import {NavItemModel} from "../../../core/services/state/nav-service/nav.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() navItems: NavItemModel[] | null = [];

  getItems(): NavItemModel[] | null {
    return this.navItems;
  }

  trackByFn(index: number, {data}: NavItemModel) {
    return data.url;
  }
}
