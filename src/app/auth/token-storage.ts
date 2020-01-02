import { Injectable } from '@angular/core';
import { AlertService } from '../_alert';

const TOKEN_KEY = 'Authorization';
const AUTHORITIES_KEY = 'Authorities';

@Injectable({
  providedIn: 'root'
})

export class TokenStorage {
  constructor(private alertService: AlertService) { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    this.alertService.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    if (token !== undefined && token !== null) {
      window.sessionStorage.setItem(TOKEN_KEY, token);
      return;
    }
    throw this.alertService.error("Não foi possivel salvar o TOKEN de Authorization.");
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
