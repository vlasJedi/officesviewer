import {Inject, Injectable} from '@angular/core';
import {CORE_MODULE_CONFIG_INJECT, CoreModuleConfig} from "../../configs/core-module.config";
import {RestApiConfig} from "../../configs/rest-api.config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    @Inject(CORE_MODULE_CONFIG_INJECT) private readonly coreModuleConfig: CoreModuleConfig,
  ) { }

  get loginConfig(): RestApiConfig {
    return this.coreModuleConfig.loginConfig;
  }

  get logoutConfig(): RestApiConfig {
    return this.coreModuleConfig.logoutConfig;
  }

  get authUserConfig(): RestApiConfig {
    return this.coreModuleConfig.authUserConfig;
  }

  get homeConfig(): RestApiConfig {
    return this.coreModuleConfig.homeConfig;
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
