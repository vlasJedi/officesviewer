import {AuthUser} from "../interfaces/auth-user.interface";

export class AuthUserImpl implements AuthUser {
  constructor(private _username = "") {
  }
  get username() {
    return this._username;
  }

  set username(name: string) {
    this._username = name;
  }

}
