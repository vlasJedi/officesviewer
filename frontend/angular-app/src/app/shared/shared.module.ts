import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterLink } from "@angular/router";
import { UserPanelComponent } from './components/user-panel/user-panel.component';



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
    RouterLink
  ]
})
export class SharedModule { }
