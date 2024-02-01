import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorHandlingService} from "../utility/services/error-handling/error-handling.service";
import {NotificationService} from "../utility/services/notifications/notification.service";
import {Router} from "@angular/router";
import {ContactService} from "./contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  loading = false;
  contactForm = new FormGroup({
    subjectFormControl: new FormControl('', [Validators.required]),
    messageFormControl: new FormControl('', [Validators.required]),
    contactDataFormControl: new FormControl('', [Validators.required])
  })

  constructor(private contactService: ContactService, private errorHandlingService: ErrorHandlingService, private router: Router, private notificationService: NotificationService) {
  }

  contact() {
    this.loading = true;

    let subject = this.contactForm.controls.subjectFormControl.getRawValue()!;
    let text = this.contactForm.controls.messageFormControl.getRawValue()!;
    let contactData = this.contactForm.controls.contactDataFormControl.getRawValue()!;

    this.contactService.contact({subject, text, contactData})
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/').then(
            () => this.notificationService.createSuccessNotification("Ihre Nachricht wurde an uns übermittelt.")
          )
        },
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }
}
