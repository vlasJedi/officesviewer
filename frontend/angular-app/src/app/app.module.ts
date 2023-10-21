import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SharedModule,
      CoreModule.configure(),
      BrowserAnimationsModule,
      MatToolbarModule,
      MatDialogModule,
      FormsModule
    ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        panelClass: "default-dialog-styles"
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
