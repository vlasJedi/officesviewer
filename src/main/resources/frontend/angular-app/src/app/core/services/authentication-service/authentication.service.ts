import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly httpClient: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<{username: string}>("/user")
      .pipe(first(), map((user: {username: string}) => Boolean(user.username)));
  }
}
