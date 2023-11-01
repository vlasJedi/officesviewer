import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { first, forkJoin, Observable, OperatorFunction, Subject, Subscription, takeUntil, throttleTime } from "rxjs";
import { AuthenticationService } from "../../../core/services/authentication-service/authentication.service";
import { Router } from "@angular/router";
import { ConfigService } from "../../../core/services/config-service/config.service";
import { ApiUrls } from "../../../core/enums/api-urls.enum";
import { DialogService } from "../../../core/services/dialog-service/dialog.service";
import { UserService } from "../../../core/services/user-service/user.service";
import { UserDetailsConfig, UserinfoformComponent } from "../forms/userinfoform/userinfoform.component";
import { AppUser, UserRole } from "../../../core/interfaces/user.interface";
import { RoleService } from "../../../core/services/role-service/role.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit, OnDestroy {
  @Input("user$")
  _authUser$!: Observable<AppUser>;

  // @ViewChild("userInfoDialogContent")
  // userInfoDialogContent!: TemplateRef<any>;
  destroyNotifier$: Subject<any> = new Subject<any>();
  clicks$ = {
    details: new Subject<any>(),
    logout: new Subject(),
  }

  private userDetailsDialogSubscript?: Subscription;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
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
    this.userDetailsDialogSubscript = forkJoin([
      this.authUser$.pipe(first()),
      this.roleService.getRoles()
    ])
      .subscribe({
        next: ([authUser, roles]) => {
          this.userDetailsDialogSubscript?.unsubscribe();
          if (!authUser?.username || !roles?.length) {
            this.dialogService.showErrorDialog({desc: "Could not fetch user details!"});
            return;
          }
          this.openUserDetails(authUser, roles);
        },
        error: (err) => {
          this.dialogService.showErrorDialog({desc: `Could not fetch user details! ${err.toString()}`});
        }
      });
  }

  private openUserDetails(authUser: AppUser, roles: UserRole[]) {
    this.dialogService.openAsComponent<UserinfoformComponent, UserDetailsConfig>(UserinfoformComponent, {
      matDialog: {
        data: {
          data: {
            user: authUser,
            roles: roles,
          },
          options: {
            rolesSelector: {
              disable: !this.userService.allowedRoleChange(authUser),
            }
          }
        },
        height: '60vh',
        width: '20vw',
        minWidth: "20rem",
      },
    }).afterClosed().subscribe((res) => {
      if (!res?.refresh) return;
      // just trigger refresh
      this.authService.getCurrentAuthUser().subscribe(() => {
        console.debug(`User data refreshed on UI`);
      });
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

  get authUser$(): Observable<AppUser> {
    return this._authUser$;
  }
}
