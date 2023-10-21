import { Injectable } from '@angular/core';
import { ConfigService } from "../config-service/config.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable, throwError } from "rxjs";
import { ApiUrls } from "../../enums/api-urls.enum";
import { AppUser } from "../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly ADMIN_ROLE_NAME = `ADMIN`;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient
  ) { }

  getUserInfo(username: string): Observable<AppUser> {
    return this.httpClient.get<AppUser>(`${this.configService.getRestConfig(ApiUrls.USERS).url}/${username}`);
  }
  updateUserInfo(userInfo: AppUser): Observable<AppUser> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json; charset=utf-8",
    });
    // return throwError(() => new Error("Test failed"));
    return this.httpClient.put<AppUser>(`${this.configService.getRestConfig(ApiUrls.USERS).url}/${userInfo.id}`,
      JSON.stringify(userInfo), {headers});
  }

  allowedRoleChange(user: AppUser) {
    return user.roles.some(roleObj => roleObj.roleName === this.ADMIN_ROLE_NAME);
  }
}
