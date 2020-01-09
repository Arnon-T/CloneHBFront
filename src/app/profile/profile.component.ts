import { Component, OnInit } from '@angular/core';

import { TokenStorage } from '../auth/token-storage';
import { AlertService } from '../_alert';
import { MessageService } from '../_message';
import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { FormGroup } from '@angular/forms';
import { Colaborador } from './Colaborador';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authGlobal: GlobalAuth, private tokenService: TokenStorage, private messageService: MessageService, private alertService: AlertService, private profileService: ProfileService, private route: Router) { }

  isLoading: boolean;

  form: any = {};
  LocationForm: FormGroup;

  colaborador: Colaborador;

  ngOnInit() {
    this.isLoading = true;
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }
    this.initLocationForm();

    this.profileService.getInfoFromUserLogged().subscribe(data => {
      this.isLoading = false;
      this.colaborador = data;
      this.form.nome = this.colaborador.nome;

      this.checkPcd(data.pcd);
      this.checkResideFora(data.resideForaBlumenau);
      this.checkOfereceCarona(data.ofereceCarona);
      this.checkTrabalhoNoturno(data.trabalhoNoturno);
    }, error => {
      this.messageService.clear();
      this.messageService.error(error.error.message);
    });
  }

  initLocationForm() {
    this.LocationForm
  }

  onSubmit() {
    this.validate();

    const colaboradorToAPI = {
      id: this.colaborador.id,
      nome: this.form.nome,
      email: this.colaborador.email,
      dataNascimento: this.colaborador.dataNascimento,
      pcd: this.form.pcd,
      resideForaBlumenau: this.form.resideFora,
      ofereceCarona: this.form.ofereceCarona,
      trabalhoNoturno: this.form.trabalhoNoturno,
    }

    this.profileService.updateColaboradorInfo(this.colaborador.id, colaboradorToAPI).subscribe(data => {
      this.alertService.info("Infomações salvas com sucesso!");
      this.colaborador = data;
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
      }
    })
  }

  validate() {
    if (this.form.nome === undefined || this.form.nome === '' || this.form.nome === ' ') {
      throw this.alertService.error("Nome completo inválido.");
    }
  }

  handleChangeNome(event) {
    this.colaborador.nome = event.target.value;
  }

  checkPcd(boolean: boolean) {
    this.form.pcd = boolean;
  }

  checkResideFora(boolean: boolean) {
    this.form.resideFora = boolean;
  }

  checkOfereceCarona(boolean: boolean) {
    this.form.ofereceCarona = boolean;
  }
  checkTrabalhoNoturno(boolean: boolean) {
    this.form.trabalhoNoturno = boolean;
  }
}
