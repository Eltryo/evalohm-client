import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../landing/register/service/register.service";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../../utility/services/error-handling/error-handling.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.scss']
})
export class RegistrationConfirmationComponent {
  loading = false;
  resent = false;
  unlockForm = new FormGroup({
    codeFormControl: new FormControl('', [Validators.required])
  })

  constructor(private registerService: RegisterService, private router: Router, private errorHandlingService: ErrorHandlingService) {
  }

  unlock() {
    this.loading = true;

    let code = this.unlockForm.controls.codeFormControl.getRawValue()!;

    this.registerService.unlock(code)
      .subscribe({
        next: () => this.router.navigateByUrl('/registrationComplete'),
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }

  resendCode() {
    this.resent = true;

    if (!this.registerService.getCurrentRegistrationUser()) {
      this.errorHandlingService.handleError(new HttpErrorResponse({status: 400, statusText: 'Keine Email gewählt'}));
      this.resent = false
    } else {
      this.registerService.resendVerificationToken()
        .subscribe().add(() => this.resent = false)
    }
  }
}
