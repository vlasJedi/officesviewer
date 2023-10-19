import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppUser } from "../../../../core/interfaces/user.interface";

export interface UserDetailsConfig {
  data: {
    user: AppUser,
  }
}

interface UserDetailsState {
  config?: UserDetailsConfig,
  form?: FormGroup,
}

@Component({
  selector: 'app-userinfoform',
  templateUrl: './userinfoform.component.html',
  styleUrls: ['./userinfoform.component.scss']
})
export class UserinfoformComponent {
  private readonly ROLES = ["ADMIN", "USER"];
  state: UserDetailsState = {
    config: undefined,
    form: undefined,
  };
  constructor(
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) config: UserDetailsConfig,
  ) {
    const user = config.data.user;
    console.debug(`Opened user details: ${JSON.stringify(config)}`);
    this.state.form = formBuilder.group({
      id: formBuilder.control({value: user.id, disabled: true}),
      username: [user.username, Validators.required],
      firstName: [user.firstName, Validators.required],
      secondName: [user.secondName, Validators.required],
      roles: [user.roles.map(roleObj => roleObj.roleName), Validators.required],
    });
    this.state.config = config;
    this.state.form.valueChanges.subscribe(something => this.onFormUpd(something));
  }

  getRolesOptions() {
    return this.ROLES;
  }

  private onFormUpd(something: any) {
    console.debug(`Form updated: ${JSON.stringify(something)}`);
  }
}
