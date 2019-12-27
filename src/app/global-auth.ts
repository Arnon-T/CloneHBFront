import { OnInit, Injectable } from '@angular/core';
import { TokenStorage } from './auth/token-storage';

@Injectable()
export class GlobalAuth implements OnInit {

  roles: string[];
  authority: string;
  isLogged: boolean;

  constructor(private tokenStorage: TokenStorage) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_SISTEMA') {
          this.authority = 'sistema';
          this.isLogged = true;
          return false;
        } else if (role === 'ROLE_GESTOR') {
          this.authority = 'gestor';
          this.isLogged = true;
          return false;
        }
        this.authority = 'user';
        this.isLogged = true;
        return true;
      });
    } else {
      this.isLogged = false;
    }
  }
}
