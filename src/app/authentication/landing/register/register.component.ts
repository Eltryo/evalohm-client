import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {RegisterService} from "./service/register.service";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../../utility/services/error-handling/error-handling.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hidePassword = true;
  hideRepeatedPassword = true;
  loading = false;
  errorMessage = '';

  constructor(private registerService: RegisterService, private router: Router, private errorHandlingService: ErrorHandlingService) {
  }

  validatePasswordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('passwordFormControl');
    const passwordConfirm = control.get('repeatPasswordFormControl');

    if (password && passwordConfirm && password?.value != passwordConfirm?.value) {
      return {passwordMatchError: true};
    }

    return null;
  };

  registerForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^.+@th-nuernberg\.de")]),
      passwordFormControl: new FormControl('', [Validators.required]),
      repeatPasswordFormControl: new FormControl('', [Validators.required])
    },
    {
      validators: this.validatePasswordMatch
    })

  register() {
    this.loading = true;
    this.errorMessage = '';

    let username = this.registerForm.controls.emailFormControl.getRawValue()!;
    let password = this.registerForm.controls.passwordFormControl.getRawValue()!;

    this.registerService.setCurrentRegistrationUser({username, password});

    this.registerService.register({username, password})
      .subscribe({
        next: () => this.router.navigateByUrl('/confirmRegistration'),
        error: (error) => this.errorHandlingService.handleError(error)
      }).add(() => this.loading = false)
  }
}
