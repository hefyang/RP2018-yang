import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public validateUsername(username: string): Observable<any> {
    return this.http.post<{[key:string]:boolean}>('api/user/', {username: username});
  }

  public register(user: User) {
    return this.http.post<{[key:string]:boolean}>('api/users/register', user);
  }
}
