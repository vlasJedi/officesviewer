import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from "src/app/shared/shared.module";
import {HomeMapRoutingModule} from "./home-map-routing.module";
import {MapFeatureModule} from "../../features/map-feature/map-feature.module";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UserInfoDialogComponent } from './components/user-info-dialog/user-info-dialog.component';

@NgModule({
  declarations: [
    HomePageComponent,
    UserInfoDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeMapRoutingModule,
    MapFeatureModule,
    MatSlideToggleModule
  ]
})
export class HomeMapModule { }
