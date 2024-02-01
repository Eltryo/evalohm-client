import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router";
import {ErrorHandlingService} from "../../../utility/services/error-handling/error-handling.service";
import {RequestService} from "../../../utility/services/request/request.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true;
  loading = false;
  errorMessage = '';
  loginForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^.+@th-nuernberg\.de")]),
    passwordFormControl: new FormControl('', [Validators.required])
  })

  constructor(private loginService: LoginService, private router: Router, private errorHandlingService: ErrorHandlingService, private requestService: RequestService) {
  }

  login() {
    this.loading = true;
    this.errorMessage = '';

    let username = this.loginForm.controls.emailFormControl.getRawValue()!;
    let password = this.loginForm.controls.passwordFormControl.getRawValue()!;

    this.loginService.login({username, password})
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/')
          this.requestService.setAuthToken(response.token)
        },
        error: (error) => this.errorHandlingService.handleError(error),
      }).add(() => this.loading = false)
  }

}
