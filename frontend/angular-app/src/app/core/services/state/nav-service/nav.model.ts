import {RestApiConfig} from "../../../configs/rest-api.config";
import {ApiUrls} from "../../../enums/api-urls.enum";

export interface NavStateModel {
  items: NavItemModel[];
}

export interface NavItemModel {
  data: RestApiConfig;
  isVisible: boolean;
}

export const NAV_ITEMS_TO_DISPLAY = [ApiUrls.LOGIN, ApiUrls.HOME, ApiUrls.ADMIN];
