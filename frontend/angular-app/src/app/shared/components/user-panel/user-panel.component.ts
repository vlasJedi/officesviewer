import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../core/services/authentication-service/authentication.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../../core/services/config-service/config.service";
import {ApiUrls} from "../../../core/enums/api-urls.enum";
import { DialogService } from "../../../core/services/dialog-service/dialog.service";
import { UserService } from "../../../core/services/user-service/user.service";
import { AppUser } from "../../../core/interfaces/user.interface";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  @Input("username$")
  _authUsername$!: Observable<string>;

  @ViewChild("userInfoDialogContent")
  userInfoDialogContent!: TemplateRef<any>;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
  ) {
  }

  onDetailsClick() {
    this.authService.getCurrentUser$().subscribe((user) => {
      this.userService.getUserInfo(user).subscribe((userInfo) => {
        this.dialogService.open(undefined, {
          data: {
            template: this.userInfoDialogContent,
            title: "User Info",
            data: userInfo
          }
        });
      });
    });
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
