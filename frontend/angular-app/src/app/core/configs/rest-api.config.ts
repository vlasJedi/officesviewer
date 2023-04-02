import {ApiUrls} from "../enums/api-urls.enum";

export class RestApiConfig {

  constructor(
    private readonly _name: ApiUrls,
    private readonly _url = "",
    private readonly _displayName= "",
    private readonly _partOfNavigation = false
  ) {
  }

  get name(): ApiUrls {
    return this._name;
  }

  get url() {
    return this._url;
  }

  get displayName(): string {
    return this._displayName;
  }

  get partOfNavigation(): boolean {
    return this._partOfNavigation;
  }
}
