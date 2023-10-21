import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppUser } from "../../../../core/interfaces/user.interface";
import { RoleModel } from "../../../../core/services/role-service/role.service";
import { UserService } from "../../../../core/services/user-service/user.service";
import { DialogService } from "../../../../core/services/dialog-service/dialog.service";
import { HttpErrorResponse } from "@angular/common/http";

export interface UserDetailsConfig {
  data: {
    user: AppUser;
    roles: RoleModel[];
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
    this.state.form = formBuilder.group({
      id: formBuilder.control({value: user.id, disabled: true}),
      username: formBuilder.control({value: user.username, disabled: true}),
      firstName: [user.firstName, Validators.required],
      secondName: [user.secondName, Validators.required],
      roles: formBuilder.control({
          value: user.roles.map(roleObj => roleObj.id),
          disabled: Boolean(config.options?.rolesSelector?.disable)
        },
        [Validators.required])
    });
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
    const currentForm = this.state.form?.getRawValue();
    console.debug(`Data for submit: ${JSON.stringify(currentForm)}`);
    const userInfo: AppUser = {
      id: currentForm.id,
      username: currentForm.username,
      firstName: currentForm.firstName,
      secondName: currentForm.secondName,
      roles: currentForm.roles
        .map((roleId: number) => this.state.config?.data.roles.find(roleObj => roleObj.id === roleId))
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
}
