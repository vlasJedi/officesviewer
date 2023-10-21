import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { ConfigService } from "../config-service/config.service";
import { ApiUrls } from "../../enums/api-urls.enum";
import { AppUser, AppUserImpl } from "../../interfaces/user.interface";

@Injectable({
  // provided as singleton in a root module
  // is a tree-shakable
  providedIn: 'root'
})
export class AuthenticationService {
  // on a new subscription emits last emitted value
  private readonly authSubject: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>(new AppUserImpl());
  // get from subject its related observable
  // private readonly currentAuthUser$: Observable<string> = this.authSubject.asObservable();

  // need to implement ping is auth available with some interval by using mapping

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.getCurrentAuthUser().subscribe();
  }

  getCurrentUser$(): Observable<AppUser> {
    return this.authSubject.asObservable();
  }

  getCurrentAuthUser(): Observable<AppUser> {
    return this.httpClient.get<AppUser>(this.configService.getRestConfig(ApiUrls.USER).url)
      .pipe(
        catchError(() => of(new AppUserImpl())),
        // map(({username}: AuthUser = new AuthUserImpl()) => username),
        tap((value: AppUser) => {
          console.debug(`Push new auth user: ${JSON.stringify(value)}`);
          this.authSubject.next(value);
        }));
  }

  authenticate(username: string, password: string): Observable<AppUser> {
    const urlParams = new URLSearchParams();
    urlParams.set("username", username);
    urlParams.set("password", password);
    const headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
    return this.httpClient.post<AppUser>(this.configService.getRestConfig(ApiUrls.LOGIN).url, urlParams.toString(), {headers})
      .pipe(
        tap((appUser) => {
          console.debug(`Push new auth user: ${JSON.stringify(appUser)}`);
          this.authSubject.next(appUser);
        }));
  }

  logout(): Observable<any> {
    return this.httpClient
      .post(this.configService.getRestConfig(ApiUrls.LOGOUT).url, undefined, {responseType: "text"})
      .pipe(
        tap(() => {
          console.debug(`Push new auth user: ${JSON.stringify(new AppUserImpl())}`);
          this.authSubject.next(new AppUserImpl());
        })
      );
  }
}
