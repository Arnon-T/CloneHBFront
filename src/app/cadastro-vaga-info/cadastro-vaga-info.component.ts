import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';
import { TokenStorage } from '../auth/token-storage';
import { Router } from '@angular/router';
import { MessageService } from '../_message';
import { AlertService } from '../_alert';
import { FormGroup } from '@angular/forms';
import { LocationGarageService } from '../location-garage/location-garage.service';
import { CadastroVagaInfoService } from './cadastro-vaga-info.service';
import { PeriodoDTO } from './PeriodoDTO';

@Component({
  selector: 'app-cadastro-vaga-info',
  templateUrl: './cadastro-vaga-info.component.html',
  styleUrls: ['./cadastro-vaga-info.component.css']
})
export class CadastroVagaInfoComponent implements OnInit {
  constructor(private authGlobal: GlobalAuth, private vagaInfoService: CadastroVagaInfoService, private tokenService: TokenStorage, private route: Router, private messageService: MessageService, private alertService: AlertService) { }

  isLoading: boolean;

  form: any = {};
  LocationForm: FormGroup;

  periodoSelected: string = 'Selecionar período';
  periodoIndexInList: number;
  periodos: PeriodoDTO[];

  turnoSelected: string;
  turnos = ['INTEGRAL', 'NOTURNO'];

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }

    this.vagaInfoService.getAllPeriodos().subscribe(data => {
      this.periodos = data;
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
      }
    });

    this.initLocationForm();
  }

  initLocationForm() {
    this.LocationForm
  }

  onSubmit(event) {
    this.alertService.clear();

    this.validate();

    let periodo;
    this.periodos.findIndex((currentValue, index) => index === this.periodoIndexInList ? periodo = currentValue : null);

    let vagaInfoToApi = {
      quantidade: this.form.quantidadeVagas,
      idPeriodo: periodo.id,
      valor: this.form.precoPorVaga,
      turno: this.turnoSelected,
    }

    this.vagaInfoService.createVagaInfo(vagaInfoToApi).subscribe(data => {
      this.alertService.success('Informações de vaga foram criadas com sucesso!');
      this.form = {};
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 302:
          this.alertService.error('Já existe informações de vaga nesse período.');
          break;
        default:
          this.alertService.error('Não foi possivel cadastrar as informações de vaga.');
      }
    });
  }

  validate() {
    this.alertService.clear();

    if (this.periodoSelected === undefined || this.periodoSelected === '' || this.periodoSelected === 'Selecionar período') {
      throw this.alertService.error('Período deve ser preenchido.');
    }

    if (this.form.quantidadeVagas === undefined || this.form.quantidadeVagas === 0) {
      throw this.alertService.error('Quantidade vagas é necessario ser preenchido.');
    }

    if (this.form.quantidadeVagas <= 0) {
      throw this.alertService.error('Quantidades de vagas não pode ser negativo.')
    }

    if (this.form.precoPorVaga === undefined || this.form.precoPorVaga === 0 || this.form.quantidadeVagas <= 0) {
      throw this.alertService.error('Preço da vaga é inválido.');
    }

    if (this.turnoSelected === undefined || this.turnoSelected === '') {
      this.alertService.error('Favor selecionar um turno.');
    }
  }

  selectPeriodo(event) {
    this.periodoSelected = event.target.value;
    this.periodoIndexInList = (event.target.selectedIndex - 1);
  }

  selectTurno(turnoText) {
    this.turnoSelected = turnoText;
  }
}
