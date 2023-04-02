import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../core/services/authentication-service/authentication.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../../core/services/config-service/config.service";
import {ApiUrls} from "../../../core/enums/api-urls.enum";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  @Input("username$")
  _authUsername$!: Observable<string>;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {
  }

  onDetailsClick() {
    alert("Not yet implemented");
  }

  onLogoutClick() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl(this.configService.getRestConfig(ApiUrls.LOGIN).url).then(() => {});
      },
      error: (err) => {
        window.alert("Logout for some reason failed " + err.toString());
      }
    });
  }


  get authUsername$(): Observable<string> {
    return this._authUsername$;
  }
}
