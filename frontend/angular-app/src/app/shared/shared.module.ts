import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from './components/navigation/navigation.component';
import {RouterLink} from "@angular/router";
import {UserPanelComponent} from './components/user-panel/user-panel.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NavigationComponent,
    UserPanelComponent
  ],
  exports: [
    NavigationComponent,
    UserPanelComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatButtonModule
    ]
})
export class SharedModule { }
