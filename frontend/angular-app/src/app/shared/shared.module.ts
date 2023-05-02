import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from './components/navigation/navigation.component';
import {RouterLink} from "@angular/router";
import {UserPanelComponent} from './components/user-panel/user-panel.component';
import {MatButtonModule} from "@angular/material/button";
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { OverlayDirective } from './directives/overlay.directive';


@NgModule({
  declarations: [
    NavigationComponent,
    UserPanelComponent,
    DialogBoxComponent,
    BackdropComponent,
    OverlayDirective
  ],
  exports: [
    NavigationComponent,
    UserPanelComponent,
    BackdropComponent,
    OverlayDirective
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatButtonModule
    ]
})
export class SharedModule { }
