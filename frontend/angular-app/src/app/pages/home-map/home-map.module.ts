import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from "src/app/shared/shared.module";
import {HomeMapRoutingModule} from "./home-map-routing.module";
import {MapFeatureModule} from "../../features/map-feature/map-feature.module";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeMapRoutingModule,
    MapFeatureModule
  ]
})
export class HomeMapModule { }
