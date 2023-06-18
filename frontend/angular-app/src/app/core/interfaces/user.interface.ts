export interface UserRole {
  readonly id: string;
  readonly roleName: string;
}
export interface AppUser {
  readonly id: string;
  readonly roles: UserRole[];
  readonly username: string;
  readonly firstName: string;
  readonly secondName: string;
}
