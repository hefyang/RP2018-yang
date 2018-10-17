import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import * as moment from "moment";
import 'rxjs/add/operator/do';
import "rxjs-compat/add/operator/shareReplay";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    return this.http.post<{[key:string]: any}>('/api/users/login', {username, password})
      .do(res => AuthService.setSession(res))
      .shareReplay();
  }

  private static setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'seconds');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("userId", authResult.id);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()))
  }

  static logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expires_at");
  }

  static isLoggedIn() {
    return moment().isBefore(AuthService.getExpiration());
  }

  static isLoggedOut() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return !moment(expiresAt).isValid();
  }

  private static getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
