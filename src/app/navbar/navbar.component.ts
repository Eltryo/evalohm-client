import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {RequestService} from "../utility/services/request/request.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private requestService: RequestService, private router: Router) {
  }

  logout() {
    this.requestService.setAuthToken(null);
    this.router.navigateByUrl("/authenticate").then();
  }

  isAuthenticated() {
    return this.requestService.getAuthToken() !== null;
  }

  isProf() {
    let roles = this.requestService.getRoles();

    return roles?.roles === 'PROF';
  }
}
