import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {AuthUser} from "src/app/core/interfaces/auth-user.interface";
import {AuthUserImpl} from "../../models/auth-user.model";
import {ConfigService} from "../config-service/config.service";
import {ApiUrls} from "../../enums/api-urls.enum";

@Injectable({
  // provided as singleton in a root module
  // is a tree-shakable
  providedIn: 'root'
})
export class AuthenticationService {
  // on a new subscription emits last emitted value
  private readonly authSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  // get from subject its related observable
  private readonly currentAuthUser$: Observable<string> = this.authSubject.asObservable();

  // need to implement ping is auth available with some interval by using mapping

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.getCurrentAuthUser().subscribe();
  }

  getCurrentUser$(): Observable<string> {
    return this.currentAuthUser$;
  }

  getCurrentAuthUser(): Observable<string> {
    return this.httpClient.get<AuthUser>(this.configService.getRestConfig(ApiUrls.USER).url)
      .pipe(
        catchError(() => of(new AuthUserImpl())),
        map(({username}: AuthUser = new AuthUserImpl()) => username),
        tap((value) => {
          this.authSubject.next(value);
        }));
  }

  authenticate(username: string, password: string): Observable<string> {
    const urlParams = new URLSearchParams();
    urlParams.set("username", username);
    urlParams.set("password", password);
    const headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
    return this.httpClient.post(this.configService.getRestConfig(ApiUrls.LOGIN).url, urlParams.toString(), {headers})
      .pipe(
        map(() => username),
        tap((value) => {
          this.authSubject.next(value);
        }));
  }

  logout(): Observable<any> {
    return this.httpClient
      .post(this.configService.getRestConfig(ApiUrls.LOGOUT).url, undefined, {responseType: "text"})
      .pipe(
        tap(() => {
          this.authSubject.next("");
        })
      );
  }
}
