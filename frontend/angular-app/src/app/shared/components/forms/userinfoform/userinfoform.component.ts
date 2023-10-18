import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-userinfoform',
  templateUrl: './userinfoform.component.html',
  styleUrls: ['./userinfoform.component.scss']
})
export class UserinfoformComponent {
  private readonly ROLES = ["Admin", "User"];
  form: FormGroup;
  constructor(
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      id: formBuilder.control({value: "", disabled: true}),
      username: ["Initial", Validators.required],
      firstName: ["", Validators.required],
      secondName: ["", Validators.required],
      roles: [""],
    });
    this.form.valueChanges.subscribe(something => this.onFormUpd(something));
  }

  getRolesOptions() {
    return this.ROLES;
  }

  private onFormUpd(something: any) {
    console.debug(`Form updated: ${JSON.stringify(something)}`);
  }
}
