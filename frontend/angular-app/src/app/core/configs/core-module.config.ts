import { RestApiConfig } from "./rest-api.config";
import { InjectionToken } from "@angular/core";
import { ApiUrls } from "../enums/api-urls.enum";
import { BehaviorSubject } from "rxjs";

export const CORE_MODULE_CONFIG_INJECT = new InjectionToken<CoreModuleConfig>("Core Module Config");
export class CoreModuleConfig {
  private readonly REST_CONFIG = new Map<ApiUrls, RestApiConfig>();

  constructor(
  ) {
    this.REST_CONFIG.set(ApiUrls.LOGIN,
      new RestApiConfig(ApiUrls.LOGIN, "/login", "Login"));
    this.REST_CONFIG.set(ApiUrls.HOME,
      new RestApiConfig(ApiUrls.HOME, "/home", "Home"));
    this.REST_CONFIG.set(ApiUrls.ADMIN,
      new RestApiConfig(ApiUrls.ADMIN, "/admin", "Admin"));
    this.REST_CONFIG.set(ApiUrls.LOGOUT,
      new RestApiConfig(ApiUrls.LOGOUT, "/logout", "Logout", new BehaviorSubject(false)));
    this.REST_CONFIG.set(ApiUrls.USER,
      new RestApiConfig(ApiUrls.USER, "/user", '', new BehaviorSubject(false)));
    this.REST_CONFIG.set(ApiUrls.ROLE,
      new RestApiConfig(ApiUrls.ROLE, "/roles", '', new BehaviorSubject(false)));
    this.REST_CONFIG.set(ApiUrls.USERS,
      new RestApiConfig(ApiUrls.USERS, "/users", "Details", new BehaviorSubject(false)));
  }

  getRestConfig() {
    return this.REST_CONFIG;
  }
}

export enum ROLE {
  ADMIN = 1,
  USER = 2,
}
