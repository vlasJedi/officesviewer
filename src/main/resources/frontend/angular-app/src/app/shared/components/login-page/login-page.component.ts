import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from "../../../core/services/authentication-service/authentication.service";
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
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/home")
            .catch(() => {
              window.alert("Redirect for success authentication failed");
            });
        },
        error: () => {
          window.alert("Login failed");
        }
      });
  }
}
