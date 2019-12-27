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
  global : GlobalAuth;
  authority: String;
  
  constructor(private loginService: LoginService, private tokenStorage: TokenStorage, private authGlobal: GlobalAuth, private alertService: AlertService, private route : Router) {
    this.global = authGlobal;
   }

  ngOnInit() {

    this.authGlobal.ngOnInit();
    
    this.tokenInfo = {
      token: this.tokenStorage.getToken(),
      authorities: this.tokenStorage.getAuthorities()
    };
    
  }

  onSubmit() {
    
    this.loginInfo = new AuthLoginInfo(
      this.form.email, 
      this.form.password
    );

    if (this.form.email === undefined) {
      this.alertService.info('E-mail precisa ser preenchido.');    
      return;
    }

    if (this.form.password === undefined) {
      this.alertService.info('Senha precisa ser preenchido.');
      return; 
    }

    console.log(this.form.email, 
      this.form.password)

    this.loginService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.authGlobal.roles = this.tokenStorage.getAuthorities();

        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();

      },
      error => {
        this.alertService.error('Usuário e/ou senha inválida');
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



  // validateField(text: string, messageError: string) {
  //   if (text === null || text === undefined) {
  //     this.alertService.info(messageError);
  //   }
  // }
}
