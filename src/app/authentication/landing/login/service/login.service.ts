import {Injectable} from '@angular/core';
import {LoginData} from "./loginData";
import {RequestService} from "../../../../utility/services/request/request.service";
import {LoggedInUser} from "./loggedInUser";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private requestService: RequestService) {
  }

  login(loginData: LoginData) {
    return this.requestService.request<LoggedInUser>('POST', '/login', loginData)
  }

  changePassword(passwords: { oldPassword: string; newPassword: string }) {
    return this.requestService.request('PUT', '/changePassword', passwords)
  }

  resetPassword(email: string) {
    return this.requestService.request('POST', '/resetPassword?email=' + email, {})
  }

  renewPassword(passwords: { oldPassword: string; newPassword: string }) {
    return this.requestService.request('PUT', '/renewPassword', passwords)
  }
}
