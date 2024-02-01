import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../notifications/notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private router: Router, private notificationService: NotificationService) {
  }

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.notificationService.createErrorNotification("Server konnte nicht erreicht werden")
        break;
      case 400:
        this.notificationService.createErrorNotification(
          this.extractErrorMessage(error, "Es scheint etwas schiefgelaufen zu sein"))
        break
      case 401:
        window.sessionStorage.removeItem("auth_token");
        this.router.navigateByUrl("/authenticate").then(() => {
          this.notificationService.createErrorNotification(
            this.extractErrorMessage(error, "Bitte melden Sie sich erneut an"))
        })
        break
      case 403:
        this.notificationService.createErrorNotification(
          this.extractErrorMessage(error, "Dafür hast du nicht die nötigen Berechtigungen"))
        break
      case 404:
        this.notificationService.createErrorNotification(
          this.extractErrorMessage(error, 'Resource nicht gefunden'))
        break
      case 423:
        this.router.navigateByUrl("/confirmRegistration").then(() => {
          this.notificationService.createErrorNotification(
            this.extractErrorMessage(error, 'Registrierungsprozess ausstehend. Bitte gebe deinen Code aus der Email ein'))
        });
        break
      default:
        this.notificationService.createErrorNotification(
          this.extractErrorMessage(error, "Es scheint etwas schiefgelaufen zu sein"))
        break;
    }
  }

  private extractErrorMessage(error: HttpErrorResponse, defaultMessage: string): string {
    if (error.error) {
      return error.error.message
    } else {
      return defaultMessage;
    }
  }
}
