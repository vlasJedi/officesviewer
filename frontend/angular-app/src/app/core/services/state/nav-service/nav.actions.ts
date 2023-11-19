export class GetAllNavItems {
  static readonly type = "[Nav] GetAllNavItems";
  constructor(public readonly isAdmin: boolean) {
  }
}
