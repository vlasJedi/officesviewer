import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppUser, UserRole } from "../../../../core/interfaces/user.interface";
import { UserService } from "../../../../core/services/user-service/user.service";
import { DialogService } from "../../../../core/services/dialog-service/dialog.service";
import { HttpErrorResponse } from "@angular/common/http";

export interface UserDetailsConfig {
  data: {
    user: AppUser;
    roles: UserRole[];
  };
  options?: {
    rolesSelector?: {
      disable?: boolean;
    };
  };
}

interface UserDetailsState {
  config?: UserDetailsConfig,
  form?: FormGroup,
  initialFormValue?: UserDetailsFormValue,
}

interface UserDetailsFormValue {
  id: string;
  username: string;
  firstName: string;
  secondName: string;
  roles: string[];
}

@Component({
  selector: 'app-userinfoform',
  templateUrl: './userinfoform.component.html',
  styleUrls: ['./userinfoform.component.scss']
})
export class UserinfoformComponent {
  state: UserDetailsState = {
    config: undefined,
    form: undefined,
    initialFormValue: undefined,
  };
  constructor(
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) config: UserDetailsConfig,
    private readonly userService: UserService,
    private readonly dialogRef: MatDialogRef<UserinfoformComponent>,
    private readonly dialogService: DialogService,
  ) {
    const user = config.data.user;
    console.debug(`Opened user details: ${JSON.stringify(config)}`);
    // here we need make a copy basically to check manually for changes further!
    this.state.initialFormValue = {... user, ... {roles: user.roles.map(roleObj => roleObj.id)}};
    this.state.form = formBuilder.group({
      id: formBuilder.control({value: this.state.initialFormValue.id, disabled: true}),
      username: formBuilder.control({value: this.state.initialFormValue.username, disabled: true}),
      firstName: [this.state.initialFormValue.firstName, Validators.required],
      secondName: [this.state.initialFormValue.secondName, Validators.required],
      roles: formBuilder.control({
          value: this.state.initialFormValue.roles,
          disabled: Boolean(config.options?.rolesSelector?.disable)
        },
        [Validators.required])
    }, {validators: [(form) => this.equalWithOriginal(form.getRawValue(), this.state.initialFormValue!)]});
    this.state.config = config;
    this.state.form.valueChanges.subscribe(something => this.onFormUpd(something));
  }

  getRolesOptions() {
    return this.state.config?.data.roles;
  }

  // provides only values that possibly to change, therefore it is kind of Partial
  private onFormUpd(something: {[key: string]: any}) {
    console.debug(`Form updated: ${JSON.stringify(something)}`);
  }

  onSubmit() {
    const currentForm: UserDetailsFormValue = this.state.form?.getRawValue();
    console.debug(`Data for submit: ${JSON.stringify(currentForm)}`);
    const userInfo: AppUser = {
      id: currentForm.id,
      username: currentForm.username,
      firstName: currentForm.firstName,
      secondName: currentForm.secondName,
      // definitely no undefined here so ignore this error
      // @ts-ignore
      roles: currentForm.roles.map((roleId: string) => this.state.config?.data.roles
        .find((roleObj: UserRole) => roleObj.id === roleId))
    };
    this.userService.updateUserInfo(userInfo).subscribe({
        next: () => this.dialogRef.close({refresh: true}),
        error: (err: HttpErrorResponse) => {
          console.error(`Failed to save user: ${err.toString()}`);
          this.dialogService.showErrorDialog({desc: `Failed to update user data due to: ${err.message}`});
        },
      }
    );
  }

  private equalWithOriginal(value: UserDetailsFormValue, initialFormValue: UserDetailsFormValue) {
    if (value.firstName !== initialFormValue.firstName) return null;
    if (value.secondName !== initialFormValue.secondName) return null;
    if (value.roles.length !== initialFormValue.roles.length) return null;
    if (!value.roles.every(role => initialFormValue.roles.includes(role))) return null;
    return {hasNotBeenChanged: 'No changes detected to allow save!'};
  }
}
