import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {RequestService} from "../services/request/request.service";
import {NotificationService} from "../services/notifications/notification.service";

export const profGuard: CanActivateFn = () => {
  const requestService = inject(RequestService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  if (requestService.getRoles()?.roles === "PROF") {
    return true;
  }

  notificationService.createErrorNotification("Dafür hast du leider nicht die nötigen Berechtigungen.")

  return router.navigateByUrl('/home');
};
