import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MarcaService } from '../marca/marca.service';
import { VagaGaragemDTO } from './vagaGaragemDTO';
import { LocationGarageService } from "./location-garage.service"

import { TokenStorage } from '../auth/token-storage';
import { AlertService } from '../_alert';
import { MessageService } from '../_message';
import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-garage',
  templateUrl: './location-garage.component.html',
  styleUrls: ['./location-garage.component.css']
})
export class LocationGarageComponent implements OnInit {

  form: any = {};
  LocationForm: FormGroup;

  vagaGaragem: any;

  selectedMarca: {
    id: number,
    tipoVeiculo: string,
    nome: string,
    listAllMarcasIndex: number,
  };
  tipo: string = "SELECIONAR TIPO";
  modelo: string;
  modeloCompleto: {
    id: number;
    idMarca: number;
    modelo: string;
  }
  periodo: {
    id: number,
    vehicleType: string,
    dataInicial: string,
    dataFinal: string,
    descricao: string
  };

  corSelecionada: string = "SELECIONAR COR";

  config: any;
  marca: 'SELECIONAR MARCA';
  tipos = ['CARRO', 'MOTO', 'PATINETE', 'BICICLETA']
  modelosSearched: any[];
  cores = ['BRANCO', 'PRETO', 'PRATA', 'CINZA', 'VERMELHO', 'MARROM', 'BEGE', 'AZUL', 'VERDE', 'AMARELO', 'DOURADO', 'OUTROS'];

  vehicleHasOption: boolean;
  listaMarcas: any[];
  listaAllMarcas: any[];
  listaPeriodos: any[];

  constructor(private authGlobal: GlobalAuth, private tokenService: TokenStorage, private messageService: MessageService, private alertService: AlertService, private route: Router, private marcaService: MarcaService, private locationGarageService: LocationGarageService) { }

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

  selectOption(tipo) {
    this.selectedMarca = undefined;
    this.tipo = tipo;
    this.limparCampos();
  }

  onSubmit() {
    this.alertService.clear();
    this.validate();

    const locacao = {
      id: 0,
      tipoVeiculo: this.tipo,
      marca: this.selectedMarca.id,
      vehicleModel: this.modeloCompleto.id,
      color: this.corSelecionada,
      placa: this.form.placaVehicle,
      periodo: this.periodo.id,
      colaborador: +this.form.matricula
    }

    this.locationGarageService.locacaoVagaGaragem(locacao).subscribe(data => {
      this.alertService.info("Infomações salvas com sucesso!");
      this.vagaGaragem = data;
      this.form = {};
      this.listaAllMarcas = [];
      this.limparCampos();
      this.tipo = "SELECIONAR TIPO";
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 302:
          this.alertService.error('Essa placa já foi cadastrada.');
          break;
      }
    });
  }

  validate() {
    if (this.form === undefined || this.form === {}) {
      throw this.alertService.error("Formulário não pode ser vazio.");
    }

    if (this.tipo === undefined || this.tipo === '' || this.tipo === 'SELECIONAR TIPO') {
      throw this.alertService.error("Tipo de veiculo inválido.");
    }

    if (this.selectedMarca === undefined || this.selectedMarca.nome === 'MARCA' || this.selectedMarca.nome === '') {
      throw this.alertService.error("Nome da marca é inválida.");
    }

    if (this.modelo === undefined || this.modelo === '') {
      throw this.alertService.error("Nome do modelo é inválido.");
    }

    if (this.corSelecionada === undefined || this.corSelecionada === 'SELECIONAR COR' || this.corSelecionada === '') {
      this.alertService.error("Cor é inválida. Favor selecionar uma válida.");
      return;
    }

    this.validatePlaca(this.form.placaVehicle);

    if (this.periodo === undefined || this.periodo.descricao === 'PERÍODO' || this.periodo.descricao === '') {
      throw this.alertService.error("Um período deve ser selecionado.");
    }

    if (this.form.matricula === undefined || this.form.matricula === '' || this.form.matricula.length <= 0) {
      throw this.alertService.error("Informe uma matrícula válida.");
    }

    if (this.form.cidade === undefined || this.form.cidade === '' || this.form.cidade.length <= 0) {
      throw this.alertService.error("Necessário informar um nome de cidade válida");
    }

    const aceitoTermo = document.getElementById('input-termo-locacao') as HTMLInputElement;

    if (aceitoTermo === undefined || !aceitoTermo.checked) {
      throw this.alertService.error("Necessário aceitar o termo de locação da HBParking.");
    }
  }

  validatePlaca(placa: string) {
    if (placa === undefined || placa === '' || placa.length <= 0) {
      throw this.alertService.error("Favor informar uma placa válida.");
    }

    let validationMercoSul = new RegExp("[A-Z]{3}[0-9][A-Z][0-9]{2}|[A-Z]{3}[0-9]{4}");

    if (placa.includes('-')) {
      placa = placa.replace('-', '');
    }

    if (!(validationMercoSul.test(placa))) {
      throw this.alertService.error("Formato de placa é inválido.");
    }
  }

  formatPlacaLettersToUppercase(event) {
    let value = event.target.value as string;
    if (value.includes('-') || value.includes('=')) {
      value = value.replace('-', '');
      value = value.replace('=', '');
    }


    if (value !== undefined || value !== '' || value.length >= 7) {
      this.form.placaVehicle = value.substring(0, 7).toUpperCase();
      return;
    }
  }

  setVehicleHasOption() {
    if (this.tipo === 'BICICLETA' || this.tipo === 'PATINETE' || this.tipo === 'SELECIONAR TIPO') {
      this.vehicleHasOption = true;
      this.listaAllMarcas = [];

      if (this.tipo === 'SELECIONAR TIPO') {
        this.listaPeriodos = [];
      }
    } else {
      this.vehicleHasOption = false;
    }
    console.log(this.vehicleHasOption)
    return this.vehicleHasOption;
  }
  searchModelo(event) {
    if (event.target.value === undefined || event.target.value === '') {
      this.modelosSearched = undefined;
      return;
    }

    if (this.selectedMarca === undefined || this.selectedMarca.listAllMarcasIndex === undefined || this.selectedMarca.listAllMarcasIndex === 0) {
      this.modelosSearched = undefined;
      return;
    }

    if (!this.vehicleHasOption) {
      this.locationGarageService.getNomeModelo(event.target.value, this.selectedMarca.listAllMarcasIndex).subscribe(data => {
        if (data !== undefined && data.length !== 0) {
          this.modelosSearched = data;
        } else {
          this.modelosSearched = [{ "modelo": 'Nenhum modelo encontrado.' }];
        }
      });
    }
  }

  selectModeloOnSearch(nomeModelo: any) {
    if (nomeModelo === undefined || nomeModelo === '' || nomeModelo === 'Nenhum modelo encontrado.') {
      return;
    }

    this.modelo = nomeModelo.modelo;
    this.modeloCompleto = nomeModelo;
    this.modelosSearched = undefined;
  }

  listarAllMarcas() {
    if (!this.vehicleHasOption) {
      this.marcaService.selectAllMarcas(this.tipo).subscribe(data => {
        this.listaAllMarcas = data;
      });
    }
  }

  getPeriodos() {
    if (!this.vehicleHasOption) {
      this.locationGarageService.getPeriodos(this.tipo).subscribe(data => {
        this.listaPeriodos = data;
      });
    }
  }

  selectPeriodo(periodoOption) {
    if (periodoOption.selectedIndex === undefined || periodoOption.selectedIndex === 0) {
      this.periodo = undefined;
      return;
    }
    let periodoObject = this.listaPeriodos[(periodoOption.selectedIndex - 1)];
    if (periodoObject === undefined || periodoObject === null) {
      this.alertService.error("Periodo não existe");
    }

    this.periodo = periodoObject;
  }

  alterarMarca(marcaOption) {
    this.limparCampos();
    this.getPeriodos();
    if (marcaOption.selectedIndex === undefined || marcaOption.selectedIndex === 0) {
      this.selectedMarca = undefined;
      return;
    }
    let marcaObject = this.listaAllMarcas[(marcaOption.selectedIndex - 1)];
    if (marcaObject === undefined || marcaObject === null) {
      this.alertService.error("Marca não existe");
    }

    this.modelo = undefined;
    this.selectedMarca = marcaObject;
    this.selectedMarca.listAllMarcasIndex = marcaOption.selectedIndex;
  }

  selectCor(corOption) {

    if (corOption.selectedIndex === undefined || corOption.selectedIndex === 0) {
      this.corSelecionada = '';
      return;
    }
    let corString = this.cores[(corOption.selectedIndex - 1)];
    if (corString === undefined || corString === null || corString === '') {
      this.alertService.error("Cor não existe");
    }

    this.corSelecionada = corString;

  }

  // Method to open modal
  openModalTermo() {
    let modal = document.getElementById('modal-termo');
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
  }

  limparCampos(){
    this.modelo = undefined;
    this.corSelecionada = "SELECIONAR COR";
    this.form.placaVehicle = '';
    this.listaPeriodos = [];
  }
}
