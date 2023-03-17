import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  getItems() {
    return [
      {
        url: "/login",
        displayName: "Login"
      },
      {
        url: "/home",
        displayName: "Home"
      }
    ];
  }

  trackByFn(index: number, {url}: {url: string, displayName: string}) {
    return url;
  }
}
