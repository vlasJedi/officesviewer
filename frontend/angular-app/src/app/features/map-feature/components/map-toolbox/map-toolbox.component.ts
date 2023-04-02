import {Component, OnDestroy} from '@angular/core';
import {MapToolsService} from "src/app/features/map-feature/services/map-tools-service/map-tools.service";
import {Feature} from "ol";
import {Geometry} from "ol/geom";
import {Observable, ReplaySubject, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-map-toolbox',
  templateUrl: './map-toolbox.component.html',
  styleUrls: ['./map-toolbox.component.scss']
})
export class MapToolboxComponent implements OnDestroy {
  private readonly tools = ["Add Location"];
  private readonly HIGHLIGHT_ACTIVE = "button-highlight-active";
  private readonly destroySub = new ReplaySubject();
  private activeToolName?: string;
  constructor(private readonly mapToolsService: MapToolsService) {
  }

  ngOnDestroy(): void {
    this.destroySub.next(true);
    this.destroySub.complete();
  }

  getTools(): string[] {
    return this.tools;
  }

  addLocation() {
    if (this.activeToolName) {
      this.mapToolsService.removeDrawInteraction();
      this.activeToolName = undefined;
      return;
    }
    const addedLoc$: Observable<Feature<Geometry>>
      | undefined = this.mapToolsService.addDrawInteraction();
    if (!addedLoc$) {
      alert("Failed to enable draw mode");
      return;
    }
    addedLoc$
      .pipe(takeUntil(this.destroySub.asObservable()))
      .subscribe((feature) =>
      console.log("New feature added: " + JSON.stringify(feature.getGeometry())));
    this.activeToolName = this.tools[0];
  }

  getStyle(toolName: string) {
    return toolName === this.activeToolName ? this.HIGHLIGHT_ACTIVE : undefined;
  }
}
