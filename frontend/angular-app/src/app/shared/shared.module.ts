import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterLink } from "@angular/router";
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { ToolsPanelComponent } from './components/tools-panel/tools-panel.component';



@NgModule({
  declarations: [
    //LoginPageComponent,
    NavigationComponent,
    UserPanelComponent,
    ToolsPanelComponent
  ],
  exports: [
    NavigationComponent,
    UserPanelComponent,
    ToolsPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class SharedModule { }
