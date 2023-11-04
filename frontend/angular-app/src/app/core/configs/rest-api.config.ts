import { ApiUrls } from "../enums/api-urls.enum";
import { BehaviorSubject, Observable } from "rxjs";

export class RestApiConfig {

  constructor(
    private readonly _name: ApiUrls,
    private readonly _url = "",
    private readonly _displayName= "",
    public isVisible$: Observable<boolean> = new BehaviorSubject(true),
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
}
