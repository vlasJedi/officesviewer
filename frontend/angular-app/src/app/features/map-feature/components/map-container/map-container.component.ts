import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {MapToolsService} from "src/app/features/map-feature/services/map-tools-service/map-tools.service";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapContainerComponent implements AfterViewInit {
  constructor(private readonly mapToolsService: MapToolsService) {
  }

  ngAfterViewInit() {
    this.mapToolsService.createMap();
  }
}
