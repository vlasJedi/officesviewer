import { Component } from '@angular/core';
import {MapToolsService} from "../../services/map-tools-service/map-tools.service";

@Component({
  selector: 'app-map-toolbox',
  templateUrl: './map-toolbox.component.html',
  styleUrls: ['./map-toolbox.component.scss']
})
export class MapToolboxComponent {
  constructor(private readonly mapToolsService: MapToolsService) {
  }

  addLocation() {
    this.mapToolsService.addDrawInteraction();
  }
}
