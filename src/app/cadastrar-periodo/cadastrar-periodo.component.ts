import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';
import { TokenStorage } from '../auth/token-storage';
import { Router } from '@angular/router';
import { MessageService } from '../_message';
import { AlertService } from '../_alert';
import { FormGroup } from '@angular/forms';
import { PeriodoService } from './periodo.service';

@Component({
  selector: 'app-cadastrar-periodo',
  templateUrl: './cadastrar-periodo.component.html',
  styleUrls: ['./cadastrar-periodo.component.css']
})
export class CadastrarPeriodoComponent implements OnInit {

  constructor(private periodoService: PeriodoService, private authGlobal: GlobalAuth, private tokenService: TokenStorage, private route: Router, private messageService: MessageService, private alertService: AlertService) { }

  isLoading: boolean;

  form: any = {};
  LocationForm: FormGroup;

  tipo: string;
  tipos = ['Carro', 'Moto', 'Patinete', 'Bicicleta'];

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }

    this.initLocationForm();
  }

  initLocationForm() {
    this.LocationForm
  }

  onSubmit() {
    this.alertService.clear();

    this.validate();

    let periodoDTOToAPI = {
      vehicleType: this.tipo,
      dataInicial: this.form.dataInicio,
      dataFinal: this.form.dataFinal
    }

    this.periodoService.createPeriodo(periodoDTOToAPI).subscribe(data => {
      this.alertService.success('Período foi criado com sucesso!');
      this.form = {};
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.alertService.error("Não foi possivel criar o período.");
          break;
      }
    });
  }

  validate() {
    this.alertService.clear();

    if (this.tipo === undefined || this.tipo === '' || this.tipo === 'Veículo') {
      throw this.alertService.error('Tipo de veículo inválido.');
    }

    if (this.form.dataInicio === undefined || this.form.dataInicio === '' || this.form.dataInicio === '01/01/1820') {
      throw this.alertService.error('Data de início está inválida');
    }

    if (this.form.dataFinal === undefined || this.form.dataFinal === '' || this.form.dataFinal === '01/01/3000') {
      throw this.alertService.error('Término de perído está inválido');
    }
  }

  formatDateInicio(event) {
    if (event.key === 'Backspace') {
      return;
    }

    var input = event.target.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '')
    });
    if (values[1]) values[1] = this.validateDate(values[1], 12);
    if (values[0]) values[0] = this.validateDate(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    this.form.dataInicio = output.join('').substr(0, 10);
  }

  formatDateFinal(event) {
    if (event.key === 'Backspace') {
      return;
    }

    var input = event.target.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '')
    });
    if (values[1]) values[1] = this.validateDate(values[1], 12);
    if (values[0]) values[0] = this.validateDate(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    this.form.dataFinal = output.join('').substr(0, 10);
  }

  validateDate(str: string, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
  };

  selectTipoOnDropdown(event) {
    this.tipo = event.target.value;
  }

}
