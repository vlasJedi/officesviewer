import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { catchError, concatMap, first, Observable, of, OperatorFunction, Subject, takeUntil, throttleTime } from "rxjs";
import { AuthenticationService } from "../../../core/services/authentication-service/authentication.service";
import { Router } from "@angular/router";
import { ConfigService } from "../../../core/services/config-service/config.service";
import { ApiUrls } from "../../../core/enums/api-urls.enum";
import { DialogService } from "../../../core/services/dialog-service/dialog.service";
import { UserService } from "../../../core/services/user-service/user.service";
import { AuthUserImpl } from "../../../core/models/auth-user.model";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, OnDestroy {
  @Input("username$")
  _authUsername$!: Observable<string>;

  @ViewChild("userInfoDialogContent")
  userInfoDialogContent!: TemplateRef<any>;
  destroyNotifier$: Subject<any> = new Subject<any>();
  clicks$ = {
    details: new Subject<any>(),
    logout: new Subject(),
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    // tuple :)
    const clickWrap: [OperatorFunction<any, any>, OperatorFunction<any, any>] =
      [takeUntil(this.destroyNotifier$), throttleTime(1000)];
    this.clicks$.details.pipe(...clickWrap).subscribe(() => {this.onDetailsClick();});
    this.clicks$.logout.pipe(...clickWrap).subscribe(() => {this.onLogoutClick();});
  }

  ngOnDestroy() {
    this.destroyNotifier$.next("");
    this.destroyNotifier$.complete();
  }

  private onDetailsClick() {
    this.authUsername$.pipe(
      first(),
      concatMap((username) => {
        if (!username) {
          throw new Error(`No user is logged in`);
        }
        console.debug(`Username: ${username} is provided, retrieving userinfo`);
        return this.userService.getUserInfo(username);
      }),
      catchError((err) => {
        console.error(`Found an exception during getting userinfo: ${err.toString()}`);
        return of(new AuthUserImpl());
      }),
    )
      .subscribe({
        next: (userInfo) => {
          if (!userInfo.username) return;
          this.dialogService.open(undefined, {
            data: {
              template: this.userInfoDialogContent,
              title: "User Info",
              data: userInfo
            }
          });
        }, error: (err) => {
          console.error(`Could not show user details due to error: ${err.toString()}`);
        }
      });
  }

  private onLogoutClick() {
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
