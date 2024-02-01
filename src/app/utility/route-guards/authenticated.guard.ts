import {CanActivateFn, Router} from '@angular/router';
import {RequestService} from "../services/request/request.service";
import {inject} from "@angular/core";

export const authenticatedGuard: CanActivateFn = () => {
  const axiosService = inject(RequestService);
  const router = inject(Router);

  if (axiosService.getAuthToken()) {
    return true;
  }

  return router.parseUrl('/authenticate');
};
