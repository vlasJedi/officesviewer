import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RouterLink } from "@angular/router";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        SharedModule
    ]
})
export class RootModule { }
