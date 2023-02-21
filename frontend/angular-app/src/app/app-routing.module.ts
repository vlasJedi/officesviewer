import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
