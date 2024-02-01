import {Component} from '@angular/core';
import {NotificationService} from "./utility/services/notifications/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(readonly notificationService: NotificationService) {
  }
}
