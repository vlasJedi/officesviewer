export class RestApiConfig {
  constructor(
    private readonly _url = "",
    private readonly _displayName= "",
    private readonly _partOfNavigation = false
  ) {
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
