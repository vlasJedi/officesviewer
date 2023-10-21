import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogBoxInput {
  readonly title?: string;
  readonly desc?: string;
  readonly template?: TemplateRef<any>,
  readonly data?: {key: string|number, value: number|string}[];
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  private readonly DEFAULT_CONFIG: DialogBoxInput = {
    title: "Error",
    desc: "Some error happened!",
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: DialogBoxInput = {},
    private readonly dialogRef: MatDialogRef<DialogBoxComponent>
  ) {
    this.data = Object.assign(this.DEFAULT_CONFIG, this.data);
  }


  onCancel() {
   this.dialogRef.close({ok: false});
  }

  onOk() {
   this.dialogRef.close({ok: true});
  }
}
