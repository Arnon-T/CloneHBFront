import { OnInit, Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { TokenStorage } from './auth/token-storage';
import { MessageService } from './_message';
import { Router } from '@angular/router';

@Injectable()
export class GlobalAuth implements OnInit {

  authority: string;
  authorities: string[] = [];
  isLogged: boolean;

  constructor(private authService: AuthService, private tokenStorage: TokenStorage, private messageService: MessageService, private route: Router) { }

  async ngOnInit() {
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
        switch (error.status) {
          case 0:
            this.logout();
            this.route.navigate(['/login']);
            break;
        }
      });
    }
    this.isLogged = false;
  }

  logout() {
    this.messageService.clear();
    this.tokenStorage.signOut();
    this.isLogged = false;
    this.authorities = [];
    this.authority = undefined;
    return this.route.navigate(['/login']).then(() => {
      this.messageService.success("Você encerrou sua sessão no HBParking, até a próxima ;)");
    });
  }
}
