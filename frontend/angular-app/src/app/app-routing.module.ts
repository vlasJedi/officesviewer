import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {LoginPageComponent} from "./shared/components/login-page/login-page.component";
// import {HomePageComponent} from "./pages/home-map/components/home-page/home-page.component";

const routes: Routes = [
  {
    path: "login",
    // component: LoginPageComponent
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "home",
    loadChildren: () => import('./pages/home-map/home-map.module').then(m => m.HomeMapModule)
    // component: HomePageComponent
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
