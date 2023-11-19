import {RestApiConfig} from "./rest-api.config";
import {InjectionToken} from "@angular/core";
import {ApiUrls} from "../enums/api-urls.enum";

export const CORE_MODULE_CONFIG_INJECT = new InjectionToken<CoreModuleConfig>("Core Module Config");
export class CoreModuleConfig {
  private readonly REST_CONFIG = new Map<ApiUrls, RestApiConfig>();

  constructor(
  ) {
    this.REST_CONFIG.set(ApiUrls.LOGIN,
      new RestApiConfig(ApiUrls.LOGIN, ApiUrls.LOGIN, "Login"));
    this.REST_CONFIG.set(ApiUrls.HOME,
      new RestApiConfig(ApiUrls.HOME, ApiUrls.HOME, "Home"));
    this.REST_CONFIG.set(ApiUrls.ADMIN,
      new RestApiConfig(ApiUrls.ADMIN, ApiUrls.ADMIN, "Admin"));
    this.REST_CONFIG.set(ApiUrls.LOGOUT,
      new RestApiConfig(ApiUrls.LOGOUT, ApiUrls.LOGOUT, "Logout"));
    this.REST_CONFIG.set(ApiUrls.USER,
      new RestApiConfig(ApiUrls.USER, ApiUrls.USER, ''));
    this.REST_CONFIG.set(ApiUrls.ROLE,
      new RestApiConfig(ApiUrls.ROLE, ApiUrls.ROLE, ''));
    this.REST_CONFIG.set(ApiUrls.USERS,
      new RestApiConfig(ApiUrls.USERS, ApiUrls.USERS, "Details"));
  }

  getRestConfig() {
    return this.REST_CONFIG;
  }
}

export enum ROLE {
  ADMIN = 1,
  USER = 2,
}
