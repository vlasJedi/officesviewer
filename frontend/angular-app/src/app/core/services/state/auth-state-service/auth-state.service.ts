import {Injectable} from '@angular/core';
import {Action, NgxsOnInit, State, StateContext} from "@ngxs/store";
import {AuthStateModel} from "./auth-state.model";
import {AppUserImpl} from "../../../interfaces/user.interface";
import {AuthenticationService} from "../../api/authentication-service/authentication.service";
import {FetchCurrentlyAuthUser} from "./auth-state.actions";

@State<AuthStateModel>({
  name: "authState",
  defaults: {
    currentlyAuthUser: new AppUserImpl(),
  }
})
@Injectable({
  providedIn: 'root'
})
export class AuthStateService implements NgxsOnInit {

  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
    ctx.dispatch(new FetchCurrentlyAuthUser());
  }

  @Action(FetchCurrentlyAuthUser)
  fetchCurrentlyAuthUser(ctx: StateContext<AuthStateModel>, action: FetchCurrentlyAuthUser) {
    this.authService.getCurrentAuthUser().subscribe(authUser => {
      const state = ctx.getState();
      ctx.setState({
        ... state,
        currentlyAuthUser: authUser,
      });
    });
  }
}
