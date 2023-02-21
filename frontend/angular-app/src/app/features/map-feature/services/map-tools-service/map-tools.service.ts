import { Injectable } from '@angular/core';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";

@Injectable({
  providedIn: 'root'
})
export class MapToolsService {
  private map?: Map;

  constructor() { }

  createMap() {
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
