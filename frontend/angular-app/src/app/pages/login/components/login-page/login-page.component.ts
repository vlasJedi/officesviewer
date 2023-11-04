import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "src/app/core/services/api/authentication-service/authentication.service";
import { Router } from "@angular/router";
import { ConfigService } from "../../../../core/services/state/config-service/config.service";
import { ApiUrls } from "../../../../core/enums/api-urls.enum";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  readonly loginForm?: FormGroup;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly configService: ConfigService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.loginForm = formBuilder.group({
      username: formBuilder.control({value: "", disabled: false}, [Validators.required]),
      password: formBuilder.control({value: "", disabled: false}, [Validators.required]),
    });
  }

  onSubmit() {
    const form = this.loginForm!.getRawValue();
    if (!form.username || !form.password) return;
    this.authenticationService
      .authenticate(form.username, form.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.configService.getRestConfig(ApiUrls.HOME).url)
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
