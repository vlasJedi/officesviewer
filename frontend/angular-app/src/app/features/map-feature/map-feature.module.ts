import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapContainerComponent} from './components/map-container/map-container.component';
import {MapToolboxComponent} from './components/map-toolbox/map-toolbox.component';


@NgModule({
  declarations: [
    MapContainerComponent,
    MapToolboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapContainerComponent,
    MapToolboxComponent
  ]
})
export class MapFeatureModule {
  static configure() {

  }
}
