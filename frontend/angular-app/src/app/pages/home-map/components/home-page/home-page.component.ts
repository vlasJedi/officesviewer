import {Component} from '@angular/core';
import {AuthenticationService} from "src/app/core/services/authentication-service/authentication.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private readonly authService: AuthenticationService) {
  }

  isMapToolsVisible() {
    return this.authService.getCurrentUser$();
  }
}
