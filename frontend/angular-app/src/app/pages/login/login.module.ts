import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginPageRoutingModule} from "./login-page-routing.module";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginPageRoutingModule
  ]
})
export class LoginModule { }
