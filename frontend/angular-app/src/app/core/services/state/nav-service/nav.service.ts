import {Injectable} from '@angular/core';
import {ConfigService} from "../config-service/config.service";
import {ApiUrls} from "../../../enums/api-urls.enum";
import {RestApiConfig} from "../../../configs/rest-api.config";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthenticationService} from "../../api/authentication-service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private currentNavItems$: BehaviorSubject<Map<ApiUrls, RestApiConfig>> = new BehaviorSubject<Map<ApiUrls, RestApiConfig>>(new Map());

  constructor(
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    // const mapOfNav = configService.getAllRestApi(true) as Map<ApiUrls, RestApiConfig>;
    // const [adminNavK, adminNavV] = Array.from(mapOfNav).find(([k, v]) => k === ApiUrls.ADMIN)!;
    // adminNavV.isVisible$ = authenticationService.isCurrentUserAdmin$();
    // this.currentNavItems$.next(mapOfNav);
  }

  // getAllNavItems$() {
  //  return this.currentNavItems$ as Observable<Map<ApiUrls, RestApiConfig>>;
  // }
}
