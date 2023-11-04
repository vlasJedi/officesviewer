export interface UserRole {
  readonly id: number;
  readonly roleName: string;
}
export interface AppUser {
  readonly id: string;
  readonly roles: UserRole[];
  readonly username: string;
  readonly firstName: string;
  readonly secondName: string;
}

export class AppUserImpl implements AppUser {
  readonly firstName: string = '';
  readonly id: string = '';
  readonly roles: UserRole[] = [];
  readonly secondName: string = '';
  readonly username: string = '';
}
