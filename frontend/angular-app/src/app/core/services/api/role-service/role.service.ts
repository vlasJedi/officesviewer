import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRole} from "../../../interfaces/user.interface";
import {ApiUrls} from "../../../enums/api-urls.enum";
import {ConfigService} from "../../state/config-service/config.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient,
  ) { }

  getRoles(): Observable<UserRole[]> {
    return this.httpClient.get<UserRole[]>(`${this.configService.getRestConfig(ApiUrls.ROLE).url}`);
  }
}
