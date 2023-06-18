import { Injectable, TemplateRef } from '@angular/core';
import { DialogBoxComponent } from "../../../shared/components/dialog-box/dialog-box.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly state: { currentlyOpened?: MatDialogRef<any> } = {
    currentlyOpened: undefined,
  }

  constructor(private readonly dialog: MatDialog) {
  }

  open<T = any>(comp?: TemplateRef<T>, options = {}) {
    options = Object.assign({width: "50vw", height: "50vh"}, options);
    this.state.currentlyOpened = comp ? this.dialog.open(comp, options)
      : this.dialog.open<DialogBoxComponent>(DialogBoxComponent, options);
  }

  close() {
    this.state.currentlyOpened?.close();
  }
}
