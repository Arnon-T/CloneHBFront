import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlToLogin = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  loginWithAPI(email: string, password: string): Observable<any> {
    const user = {
      email: email,
      password: password
    }

    return this.http.post(this.urlToLogin, user);
  }
}
