import {Component, Input} from '@angular/core';
import {NotificationService} from "../utility/services/notifications/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() iconName: string = '';
  @Input() message: string = '';
  @Input() notificationId: number | undefined;

  constructor(readonly notificationService: NotificationService) {
  }
}
