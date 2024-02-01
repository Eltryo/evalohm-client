import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {LoginService} from "../../landing/login/service/login.service";
import {ErrorHandlingService} from "../../../utility/services/error-handling/error-handling.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-renew-password',
  templateUrl: './renew-password.component.html',
  styleUrls: ['./renew-password.component.scss']
})
export class RenewPasswordComponent {
  hidePassword = true;
  hideRepeatedPassword = true;
  loading = false;
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router, private errorHandlingService: ErrorHandlingService) {
  }

  validatePasswordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('passwordFormControl');
    const passwordConfirm = control.get('repeatPasswordFormControl');

    if (password && passwordConfirm && password?.value != passwordConfirm?.value) {
      return {passwordMatchError: true};
    }

    return null;
  };

  renewForm = new FormGroup({
      resetTokenFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required]),
      repeatPasswordFormControl: new FormControl('', [Validators.required])
    },
    {
      validators: this.validatePasswordMatch
    })

  renewPassword() {
    this.loading = true;
    this.errorMessage = '';

    let resetToken = this.renewForm.controls.resetTokenFormControl.getRawValue()!;
    let newPassword = this.renewForm.controls.passwordFormControl.getRawValue()!;

    this.loginService.renewPassword({oldPassword: resetToken, newPassword})
      .subscribe({
        next: () => this.router.navigateByUrl("/authenticate"),
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }
}
