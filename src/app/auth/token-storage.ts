import { Injectable } from '@angular/core';
import { AlertService } from '../_alert';

const TOKEN_KEY = 'Authorization';
const AUTHORITIES_KEY = 'Authorities';

@Injectable({
  providedIn: 'root'
})

export class TokenStorage {
  private roles: Array<string> = [];
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

  public saveAuthorities(authorities: string[]) {
    this.alertService.clear();
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    if (authorities !== undefined && authorities !== null) {
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
      return;
    }
    throw this.alertService.error("Não foi possivel salvar as permissões do usuário.");
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if ((sessionStorage.getItem(TOKEN_KEY) !== undefined && sessionStorage.getItem(TOKEN_KEY) !== null) && (sessionStorage.getItem(AUTHORITIES_KEY) !== undefined && sessionStorage.getItem(AUTHORITIES_KEY) !== null)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
