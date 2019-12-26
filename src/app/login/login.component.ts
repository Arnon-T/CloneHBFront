import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  email: string;
  password: string;

  constructor(private loginService: LoginService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmit(event) {
    event.preventDefault();
    this.alertService.clear();

    let email = this.form.email;
    let password = this.form.password;

    if (email === undefined) {
      this.alertService.info('E-mail precisa ser preenchido.');
      return;
    }

    if (password === undefined) {
      this.alertService.info('Senha precisa ser preenchido.');
      return;
    }

    this.loginService.loginWithAPI(email, password).subscribe(data => {
      localStorage.setItem('token', data.token);
      history.pushState(null, "To login page", "/");
      history.go();
    }, error => {
      switch (error.status) {
        case 0:
          this.alertService.error('Servidor indisponivel.');
          break;
        case 500:
          this.alertService.error('Erro interno do servidor.');
          break;
        case 401:
          this.alertService.error('Credenciais incorretas.');
          break;
      }
    });
  }

  // validateField(text: string, messageError: string) {
  //   if (text === null || text === undefined) {
  //     this.alertService.info(messageError);
  //   }
  // }
}
