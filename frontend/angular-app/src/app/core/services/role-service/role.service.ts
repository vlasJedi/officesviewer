import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppUser } from "../../interfaces/user.interface";
import { ApiUrls } from "../../enums/api-urls.enum";
import { ConfigService } from "../config-service/config.service";

export interface RoleModel {
  id: number;
  roleName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient,
  ) { }

  getRoles(): Observable<RoleModel[]> {
    return this.httpClient.get<RoleModel[]>(`${this.configService.getRestConfig(ApiUrls.ROLE).url}`);
  }
}
