import {AuthStateModel} from "./auth-state.model";
import {AuthStateService} from "./auth-state.service";
import {Selector} from "@ngxs/store";

export class AuthStateSelectors {
  @Selector([AuthStateService])
  static currentlyAuthUser(state: AuthStateModel) {
    return state.currentlyAuthUser;
  }
}
