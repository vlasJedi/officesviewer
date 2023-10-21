import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginPageRoutingModule} from "./login-page-routing.module";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginModule { }
