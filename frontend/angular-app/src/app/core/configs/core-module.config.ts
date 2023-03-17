import {AuthUrlConfig} from "./auth-url.config";
import {InjectionToken} from "@angular/core";

export const CORE_MODULE_CONFIG_INJECT = new InjectionToken<CoreModuleConfig>("Core Module Config");
export class CoreModuleConfig {
  constructor(
    private readonly _loginConfig = new AuthUrlConfig("/login"),
    private readonly _logoutConfig = new AuthUrlConfig("/logout"),
    private readonly _authUserConfig = new AuthUrlConfig("/user"),
  ) {
  }
  get loginConfig(): AuthUrlConfig {
    return this._loginConfig;
  }

  get logoutConfig(): AuthUrlConfig {
    return this._logoutConfig;
  }

  get authUserConfig(): AuthUrlConfig {
    return this._authUserConfig;
  }
}
