import { Component, Injectable, TemplateRef } from '@angular/core';
import { DialogBoxComponent } from "../../../shared/components/dialog-box/dialog-box.component";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";

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
    options = Object.assign({width: "35vw", height: "45vh"}, options);
    this.state.currentlyOpened = comp ? this.dialog.open(comp, options)
      : this.dialog.open<DialogBoxComponent>(DialogBoxComponent, options);
  }

  openAsComponent<T, D, R = any>(comp: ComponentType<T>, options: {matDialog?: MatDialogConfig<D>} = {}) {
    const matDialogOpts = Object.assign({width: "35vw", height: "45vh"},
      options.matDialog || {});
    this.state.currentlyOpened = this.dialog.open<T, D | {}, R>(comp, matDialogOpts);
  }

  close() {
    this.state.currentlyOpened?.close();
  }
}
