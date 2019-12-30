import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AlertService } from '../_alert';

import { GlobalAuth } from '../global-auth';
import { AuthLoginInfo } from './auth-login-info';
import { TokenStorage } from '../auth/token-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  tokenInfo: any;
  global: GlobalAuth;
  authority: String;

  constructor(private loginService: LoginService, private tokenStorage: TokenStorage, private authGlobal: GlobalAuth, private alertService: AlertService, private route: Router) {
    this.global = authGlobal;
  }

  ngOnInit() {

    this.authGlobal.ngOnInit();
    if (this.authGlobal.isLogged) {
      this.route.navigate(['/'])
    }

    this.tokenInfo = {
      token: this.tokenStorage.getToken(),
      authorities: this.tokenStorage.getAuthorities()
    };

  }

  onSubmit() {
    this.alertService.clear();

    this.loginInfo = new AuthLoginInfo(
      this.form.email,
      this.form.password
    );

    this.validateField(this.form.email, 'E-mail precisa ser preenchido.');
    this.validateEmail(this.form.email, 'E-mail está no formato errado.');
    this.validateField(this.form.password, 'Senha precisa ser preenchido.');

    this.loginService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.authGlobal.roles = this.tokenStorage.getAuthorities();

        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();

      },
      error => {
        this.alertService.clear();

        switch (error.status) {
          case 0:
            this.alertService.error('Servidor indisponivel.');
            break;
          case 500:
            this.alertService.error('Erro interno do servidor.');
            break;
          case 401:
            this.alertService.error('Usuário e/ou senha inválida');
            break;
        }
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  logout() {
    this.tokenStorage.signOut();
    this.authGlobal.isLogged = false;
    window.location.reload();
  }

  validateField(text: string, messageError: string) {
    this.alertService.clear();
    if (text === null || text === undefined || text === '') {
      throw this.alertService.info(messageError);
    }
  }

  validateEmail(email: string, messageError: string) {
    this.alertService.clear();
    if (!email.includes("@") || !email.includes(".com") || email.length <= 5) {
      throw this.alertService.info(messageError);
    }
  }
}
