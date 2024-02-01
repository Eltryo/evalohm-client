import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Roles} from "./roles";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private serverUrl = 'http://localhost:8080/api/v1'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly http: HttpClient) {
  }

  getAuthToken(): string | null {
    return window.sessionStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.sessionStorage.setItem("auth_token", token);
    } else {
      window.sessionStorage.removeItem("auth_token");
    }
  }

  getRoles(): Roles | null {
    if (this.getAuthToken() == null) return null;
    else return jwtDecode(this.getAuthToken()!);
  }

  request<Type>(method: string, url: string, data: any): Observable<Type> {
    if (!this.httpOptions.headers.has('Authorization') && this.getAuthToken() !== null) {
      this.httpOptions.headers =
        this.httpOptions.headers.set('Authorization', 'Bearer ' + this.getAuthToken());
    } else if (this.httpOptions.headers.has('Authorization') && this.getAuthToken() === null) {
      this.httpOptions.headers =
        this.httpOptions.headers.delete('Authorization')
    }

    return this.http.request<Type>(method, this.serverUrl + url, {body: data, headers: this.httpOptions.headers})
  }
}
