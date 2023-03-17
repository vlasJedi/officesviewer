import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CORE_MODULE_CONFIG_INJECT, CoreModuleConfig} from "./configs/core-module.config";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  static configure(config = new CoreModuleConfig()): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: CORE_MODULE_CONFIG_INJECT,
          useValue: config
        }
      ]
    };
  }
}
