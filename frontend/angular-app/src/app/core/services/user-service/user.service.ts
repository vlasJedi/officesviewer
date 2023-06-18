import { Injectable } from '@angular/core';
import { ConfigService } from "../config-service/config.service";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiUrls } from "../../enums/api-urls.enum";
import { AppUser } from "../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient
  ) { }

  getUserInfo(username: string): Observable<AppUser> {
    return this.httpClient.get<AppUser>(`${this.configService.getRestConfig(ApiUrls.USERS).url}/${username}`);
  }
}
