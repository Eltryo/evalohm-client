import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../../utility/services/error-handling/error-handling.service";
import {LoginService} from "../../landing/login/service/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  loading = false;
  resetForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^.+@th-nuernberg\.de")])
  })

  constructor(
    private loginService: LoginService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {}

  resetPassword() {
    this.loading = true;

    let email = this.resetForm.controls.emailFormControl.getRawValue();

    if (!email) email = '';

    this.loginService.resetPassword(email)
      .subscribe({
        next: (response) => this.router.navigateByUrl('/renewPassword'),
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }
}
