import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ErrorHandlingService} from "../utility/services/error-handling/error-handling.service";
import {LoginService} from "../authentication/landing/login/service/login.service";
import {NotificationService} from "../utility/services/notifications/notification.service";

function isDarkModeActive(): boolean {
  return localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  hideOldPassword = true;
  hidePassword = true;
  hideRepeatedPassword = true;
  darkModeControl = new FormControl(isDarkModeActive(), {nonNullable: true});
  loading = false;
  errorMessage = '';

  constructor(private loginService: LoginService, private errorHandlingService: ErrorHandlingService, private notificationService: NotificationService) {
  }

  validatePasswordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('passwordFormControl');
    const passwordConfirm = control.get('repeatPasswordFormControl');

    if (password && passwordConfirm && password?.value != passwordConfirm?.value) {
      return {passwordMatchError: true};
    }

    return null;
  };

  passwordForm = new FormGroup({
      oldPasswordFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required]),
      repeatPasswordFormControl: new FormControl('', [Validators.required])
    },
    {
      validators: this.validatePasswordMatch
    })

  ngOnInit(): void {
    this.darkModeControl.valueChanges.subscribe((darkMode) => {
      if (darkMode) {
        document.documentElement.classList.add('dark')
        window.localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        window.localStorage.setItem('color-theme', 'light')
      }
    })
  }

  changePassword() {
    this.loading = true;
    this.errorMessage = '';
    let oldPassword = this.passwordForm.controls.oldPasswordFormControl.getRawValue()!;
    let newPassword = this.passwordForm.controls.passwordFormControl.getRawValue()!;
    this.loginService.changePassword({oldPassword, newPassword})
      .subscribe({
        next: () => this.notificationService.createSuccessNotification("Passwort wurde erfolgreich geändert"),
        error: (error) => this.errorHandlingService.handleError(error)
      }).add(() => this.loading = false)
  }
}
