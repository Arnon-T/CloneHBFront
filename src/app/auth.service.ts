import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserDTO } from './user-dto';
import { TokenStorage } from './auth/token-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private tokenService: TokenStorage, private route: Router) { }

  getUserFromToken(): Observable<UserDTO> {
    const token = this.tokenService.getToken();

    if (token !== undefined && token !== null) {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
      };

      let url = this.loginUrl + '/user-from-token';
      return this.http.get<UserDTO>(url, httpOptions);
    }
    throw this.route.navigate(['/login']);
  }
}
