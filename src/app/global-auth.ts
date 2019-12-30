import { OnInit, Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { TokenStorage } from './auth/token-storage';
import { AlertService } from './_alert';
import { Router } from '@angular/router';

@Injectable()
export class GlobalAuth implements OnInit {

  authority: string;
  authorities: string[] = [];
  isLogged: boolean;

  constructor(private authService: AuthService, private tokenStorage: TokenStorage, private alertService: AlertService, private route: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLogged = true;
      this.authService.getUserFromToken().subscribe(data => {
        this.authorities = data.rolesString;
        this.authorities.every(role => {
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
      }, error => {
        this.isLogged = false;
        this.alertService.clear();

        switch (error.status) {
          case 0:
            this.alertService.error('Servidor indisponivel.');
            break;
          case 500:
            this.alertService.error('Erro interno do servidor.');
            break;
          case 403:
            return this.route.navigate(['/login']);
        }
      });
    }
  }
}
