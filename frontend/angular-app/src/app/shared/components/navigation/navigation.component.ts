import {Component, Input} from '@angular/core';
import {RestApiConfig} from "../../../core/configs/rest-api.config";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() navItems!: RestApiConfig[];

  getItems(): RestApiConfig[] {
    return this.navItems;
  }

  trackByFn(index: number, {url}: RestApiConfig) {
    return url;
  }
}
