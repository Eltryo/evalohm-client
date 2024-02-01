import {Injectable} from '@angular/core';
import {RequestService} from "../../../../utility/services/request/request.service";
import {LoginData} from "../../login/service/loginData";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private currentRegistrationUser: LoginData | undefined;

  constructor(private requestService: RequestService) {
  }

  register(loginData: LoginData) {
    return this.requestService.request('POST', '/register', loginData)
  }

  unlock(token: string) {
    return this.requestService.request('POST', '/confirmRegistration', {token})
  }

  resendVerificationToken() {
    return this.requestService.request('POST', '/resendRegistrationCode', this.currentRegistrationUser)
  }

  setCurrentRegistrationUser(loginData: LoginData) {
    loginData.password = 'Not getting it';
    this.currentRegistrationUser = loginData;
  }

  getCurrentRegistrationUser() {
    return this.currentRegistrationUser;
  }
}
