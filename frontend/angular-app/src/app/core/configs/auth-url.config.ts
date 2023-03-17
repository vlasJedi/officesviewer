export class AuthUrlConfig {
  constructor(private readonly _url = "") {
  }

  get url() {
    return this._url;
  }
}
