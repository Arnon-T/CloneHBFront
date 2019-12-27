import { Component, OnInit } from '@angular/core';

import { GlobalAuth } from '../global-auth';
import { AuthLoginInfo } from './auth-login-info';
import { TokenStorage } from '../auth/token-storage';
import { LoginService } from './login.service';

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

  constructor(private loginService: LoginService, private tokenStorage: TokenStorage, private authGlobal: GlobalAuth) {
    this.global = authGlobal;
   }

  ngOnInit() {

    this.authGlobal.ngOnInit();
    console.log(this.authGlobal)
    
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
        console.log(error);
        this.errorMessage = error.error.message;
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

}
