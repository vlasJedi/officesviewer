import {RestApiConfig} from "./rest-api.config";
import {InjectionToken} from "@angular/core";

export const CORE_MODULE_CONFIG_INJECT = new InjectionToken<CoreModuleConfig>("Core Module Config");
export class CoreModuleConfig {

  constructor(
    readonly _loginConfig = new RestApiConfig("/login", "Login", true),
    readonly _homeConfig= new RestApiConfig("/home", "Home", true),
    readonly _logoutConfig = new RestApiConfig("/logout", "Logout"),
    readonly _authUserConfig = new RestApiConfig("/user"),
  ) {
  }
  get loginConfig(): RestApiConfig {
    return this._loginConfig;
  }

  get logoutConfig(): RestApiConfig {
    return this._logoutConfig;
  }

  get authUserConfig(): RestApiConfig {
    return this._authUserConfig;
  }

  get homeConfig(): RestApiConfig {
    return this._homeConfig;
  }

  getAllRestApi() {
    return [
      this.logoutConfig,
      this.loginConfig,
      this.authUserConfig,
      this.homeConfig
    ]
  }
}
