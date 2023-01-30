import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../core/services/authentication-service/authentication.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  username: string = "";
  authUsername$?: Observable<string>;

  constructor(private readonly authService: AuthenticationService) {
    this.authUsername$ = authService.getCurrentUser$();
    this.authUsername$.subscribe((username) => {
      this.username = username;
    })
  }

  onLogoutClick() {

  }

}
