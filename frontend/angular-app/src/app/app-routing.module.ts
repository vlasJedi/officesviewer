import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { adminPageGuard } from "./core/guards/admin-page/admin-page.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "home",
    loadChildren: () => import('./pages/home-map/home-map.module').then(m => m.HomeMapModule)
  },
  {
    path: "admin",
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminPageGuard]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
