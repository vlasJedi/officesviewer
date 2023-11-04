import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { AuthenticationService } from "../../services/api/authentication-service/authentication.service";
import { first } from "rxjs";

export const adminPageGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  return authenticationService.isCurrentUserAdmin$().pipe(first());
};
