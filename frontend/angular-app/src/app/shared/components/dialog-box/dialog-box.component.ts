import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogBoxInput<T = any> {
  readonly title?: string;
  readonly desc?: string;
  readonly template?: TemplateRef<T>,
  readonly data?: {key: string|number, value: number|string}[];
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: DialogBoxInput<any> = {},
    private readonly dialogRef: MatDialogRef<any>
  ) {
    console.log("Test");
  }


  onCancel() {
   this.dialogRef.close({ok: false});
  }

  onOk() {
   this.dialogRef.close({ok: true});
  }
}
