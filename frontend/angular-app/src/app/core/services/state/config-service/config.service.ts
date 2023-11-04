import {Inject, Injectable} from '@angular/core';
import {CORE_MODULE_CONFIG_INJECT, CoreModuleConfig} from "../../../configs/core-module.config";
import {RestApiConfig} from "../../../configs/rest-api.config";
import {ApiUrls} from "../../../enums/api-urls.enum";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    @Inject(CORE_MODULE_CONFIG_INJECT) private readonly coreModuleConfig: CoreModuleConfig,
  ) { }

  getRestConfig(key: ApiUrls) {
    return this.coreModuleConfig.getRestConfig().get(key) || new RestApiConfig(ApiUrls.NONE);
  }

  getAllRestApi(withKeys = false) {
    return withKeys ? this.coreModuleConfig.getRestConfig()
      : Array.from(this.coreModuleConfig.getRestConfig(), ([k, v]) => v);
  }
}
