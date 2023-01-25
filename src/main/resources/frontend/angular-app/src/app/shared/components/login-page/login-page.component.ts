import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from "../../../core/services/authentication-service/authentication.service";
import {catchError, first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
  }

  onSubmit() {
    const form = this.loginForm.getRawValue();
    if (!form.username || !form.password) return;
    this.authenticationService
      .authenticate(form.username, form.password)
      .pipe(first(), catchError(() => {
        window.alert("Login failed");
        throw new Error("Login failed");
      }))
      .subscribe(() => {
        this.router.navigateByUrl("/home");
      });
  }
}
