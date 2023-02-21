import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapContainerComponent implements AfterViewInit {
  private map?: Map;

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }
}
