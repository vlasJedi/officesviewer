import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  // provided as singleton in a root module
  // is a tree-shakable
  providedIn: 'root'
})
export class AuthenticationService {
  // on a new subscription emits last emitted value
  authSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  // get from subject its related observable
  currentAuthUser$: Observable<string> = this.authSubject.asObservable();

  // need to implement ping is auth available with some interval by using mapping

  constructor(private readonly httpClient: HttpClient) {
    this.getCurrentAuthUser()
      .pipe(catchError(() => of("")))
      .subscribe((value) => this.authSubject.next(value));
  }

  getCurrentUser$(): Observable<string> {
    return this.currentAuthUser$;
  }

  getCurrentAuthUser(): Observable<string> {
    return this.httpClient.get<{username: string}>("/user")
      .pipe(
        catchError(() => of({username: ""})),
        map((user: {username: string}) => user.username),
        tap((value) => {
          this.authSubject.next(value);
        }));
  }

  authenticate(username: string, password: string): Observable<string> {
    const urlParams = new URLSearchParams();
    urlParams.set("username", username);
    urlParams.set("password", password);
    const headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
    return this.httpClient.post("/login", urlParams.toString(), {headers})
      .pipe(
        map(() => username),
        tap((value) => {
          this.authSubject.next(value);
        }));
  }

  logout(): Observable<any> {
    return this.httpClient
      .post("/logout", undefined, {responseType: "text"})
      .pipe(
        tap(() => {
          this.authSubject.next("");
        })
      );
  }
}
