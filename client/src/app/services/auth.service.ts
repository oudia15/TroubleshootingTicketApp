import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

domain = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

registerUser(user) {

  return this.http.post(this.domain + '/users/register', user);
  }

  checkEmail(email) {

    return this.http.get(this.domain + '/users/checkEmail/' + email);
    }

  checkUsername(username) {

    return this.http.get(this.domain + '/users/checkUsername/' + username);
    }

}
