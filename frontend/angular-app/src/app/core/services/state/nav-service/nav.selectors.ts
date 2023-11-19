import {NavState} from "./nav.state";
import {Selector} from "@ngxs/store";
import {NavStateModel} from "./nav.model";

export class NavSelectors {
  @Selector([NavState])
  static navItems(state: NavStateModel) {
    return state.items;
  }
}
