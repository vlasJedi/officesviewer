import {NAV_ITEMS_TO_DISPLAY, NavItemModel, NavStateModel} from "./nav.model";
import {Action, NgxsOnInit, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {GetAllNavItems} from "./nav.actions";
import {ConfigService} from "../config-service/config.service";
import {AuthenticationService} from "../../api/authentication-service/authentication.service";
import {ApiUrls} from "../../../enums/api-urls.enum";
import {RestApiConfig} from "../../../configs/rest-api.config";

@State<NavStateModel>({
  name: "navitems",
  defaults: {
    items: [],
  }
})
@Injectable()
export class NavState implements NgxsOnInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
  }
  ngxsOnInit(ctx: StateContext<NavStateModel>): void {
    this.authenticationService.isCurrentUserAdmin$().subscribe(isAdmin => {
      ctx.dispatch(new GetAllNavItems(isAdmin));
    });
  }

  @Action(GetAllNavItems)
  getNavItems(ctx: StateContext<NavStateModel>, action: GetAllNavItems) {
    const mapOfNav = this.configService.getAllRestApi(true) as Map<ApiUrls, RestApiConfig>;
    const isAdmin = action.isAdmin;
    const models: NavItemModel[] = Array.from(mapOfNav)
      .map(([k, v]) => ({data: v, isVisible: isAdmin || v.url !== ApiUrls.ADMIN}))
      .filter(navItem => NAV_ITEMS_TO_DISPLAY.includes(navItem.data.name));
    const state = ctx.getState();
    ctx.setState({
      ... state,
      items: models,
    });
  }
}
