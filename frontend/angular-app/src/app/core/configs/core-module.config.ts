import {RestApiConfig} from "./rest-api.config";
import {InjectionToken} from "@angular/core";
import {ApiUrls} from "../enums/api-urls.enum";

export const CORE_MODULE_CONFIG_INJECT = new InjectionToken<CoreModuleConfig>("Core Module Config");
export class CoreModuleConfig {
  private readonly REST_CONFIG = new Map<ApiUrls, RestApiConfig>();

  constructor(
  ) {
    this.REST_CONFIG.set(ApiUrls.LOGIN,
      new RestApiConfig(ApiUrls.LOGIN, "/login", "Login", true));
    this.REST_CONFIG.set(ApiUrls.HOME,
      new RestApiConfig(ApiUrls.HOME, "/home", "Home", true));
    this.REST_CONFIG.set(ApiUrls.LOGOUT,
      new RestApiConfig(ApiUrls.LOGOUT, "/logout", "Logout"));
    this.REST_CONFIG.set(ApiUrls.USER,
      new RestApiConfig(ApiUrls.USER, "/user"));
    this.REST_CONFIG.set(ApiUrls.ROLE,
      new RestApiConfig(ApiUrls.ROLE, "/roles"));
    this.REST_CONFIG.set(ApiUrls.USERS,
      new RestApiConfig(ApiUrls.USERS, "/users", "Details"));
  }

  getRestConfig() {
    return this.REST_CONFIG;
  }
}
