import { Injectable } from '@angular/core';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Draw} from "ol/interaction";

@Injectable({
  providedIn: 'root'
})
export class MapToolsService {
  private map?: Map;
  private featuresSource?: VectorSource;
  private drawInter?: Draw;

  constructor() { }

  createMap() {
    this.featuresSource = new VectorSource();
    const vector = new VectorLayer({
      source: this.featuresSource,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
      },
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vector
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  addDrawInteraction(): boolean {
    if (!this.map) return false;
    this.drawInter = new Draw({
      source: this.featuresSource,
      type: "Point",
    });
    this.map.addInteraction(this.drawInter);
    return true;
  }
}
