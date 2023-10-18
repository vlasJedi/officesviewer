import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterLink } from "@angular/router";
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { MatButtonModule } from "@angular/material/button";
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { OverlayDirective } from './directives/overlay.directive';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserinfoformComponent } from './components/forms/userinfoform/userinfoform.component';
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    NavigationComponent,
    UserPanelComponent,
    DialogBoxComponent,
    BackdropComponent,
    OverlayDirective,
    UserinfoformComponent,
  ],
  exports: [
    NavigationComponent,
    UserPanelComponent,
    BackdropComponent,
    OverlayDirective,
    DialogBoxComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
  ]
})
export class SharedModule { }
