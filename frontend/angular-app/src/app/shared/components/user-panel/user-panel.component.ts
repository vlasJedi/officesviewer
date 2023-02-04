import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../core/services/authentication-service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  username: string = "";
  authUsername$?: Observable<string>;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {
    this.authUsername$ = authService.getCurrentUser$();
    this.authUsername$.subscribe((username) => {
      this.username = username;
    })
  }

  onDetailsClick() {

  }

  onLogoutClick() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl("/login");
      },
      error: (err) => {
        window.alert("Logout for some reason failed " + err.toString());
      }
    });
  }

}
