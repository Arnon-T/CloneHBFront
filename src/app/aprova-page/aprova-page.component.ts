import { Component, OnInit } from '@angular/core';

import { GlobalAuth } from '../global-auth';
import { AlertService } from '../_alert'
import { MessageService } from '../_message'
import { Router } from '@angular/router';
import { TokenStorage } from '../auth/token-storage';
import { AprovaService } from './aprova.service';
import { VagaGaragemPageable } from './VagaGararemPageable';
import { VagaGaragem } from './VagaGaragem';
import { Periodo } from './Periodo';

@Component({
  selector: 'app-aprova-page',
  templateUrl: './aprova-page.component.html',
  styleUrls: ['./aprova-page.component.css'],
  host: {
    '(document:click)': 'closeDropdown($event)',
  },
})
export class AprovaPageComponent implements OnInit {

  constructor(private aprovaService: AprovaService, private tokenService: TokenStorage, private alertService: AlertService, private messageService: MessageService, private authGlobal: GlobalAuth, private route: Router) { }

  itemsPageDefaultNumber = 10;
  itemsPage: number = this.itemsPageDefaultNumber;
  itemsPageDefaultNumbers = [10, 25, 50, 100];

  selectItemsPerPage(quantity) {
    this.itemsPage = quantity;
    this.getAllVagaGaragens(this.tipo.toUpperCase(), 0, this.itemsPage);
  }

  form: any = {};

  isLoading: boolean = false;

  tipoDefaultName = 'Carro';
  tipo: string = this.tipoDefaultName;
  tipos = ['Moto', 'Patinete e Bicicleta'];


  periodoDefaultName: string = 'Período';
  periodo: Periodo;
  periodos: Periodo[];

  moreColaboradorThanVagas: boolean = false;
  vagaGaragemPageable: VagaGaragemPageable;

  ngOnInit() {
    this.authGlobal.ngOnInit();


    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }

    this.alertService.info('Buscando colaboradores..');

    this.isLoading = true;
    this.getAllVagaGaragens('CARRO', 0, this.itemsPage);
    this.getAllPeriodos('CARRO');
    this.setPeriodoDefaultThings();
  }

  setPeriodoDefaultThings() {
    const periodoNewer = new Periodo();
    periodoNewer.descricao = 'Período';
    this.periodo = periodoNewer;
  }

  getAllVagaGaragens(type: string, page: number, size: number) {
    this.aprovaService.findAllColaboradoresToApprove(type, page, size).subscribe(data => {
      this.isLoading = false;
      this.vagaGaragemPageable = data;
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.messageService.error("Não foi possivel buscar os colaboradores para aprovar.");
          break;
      }
    });
  }

  getAllPeriodos(type: string) {
    this.aprovaService.getPeriodos(type).subscribe(data => {
      this.isLoading = false;
      this.periodos = data;
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.messageService.error("Não foi possivel buscar períodos.");
          break;
      }
    });
  }

  aprovarTodos() {
    // INTEGRAR PARA APROVAR TODOS
  }

  sortearTodasVagas() {
    // INTEGRAR PARA SORTEAR TODAS AS VAGAS
    console.log("sdggdsdgs")
    this.aprovaService.sorteioVagas(this.periodo.id, this.tipo, this.form.trabalhoNoturno);
  }

  aprovarSingular(vaga: VagaGaragem) {
    // CRIAR INTEGRACAO COM API de aprovar
    console.log(vaga)
  }

  selectTipoOnDropdown(tipo: string) {
    this.tipos = this.tipos.filter(type => type !== tipo);
    if (this.tipo !== undefined) {
      let tiposArray = [this.tipo, ...this.tipos];
      this.tipos = tiposArray;
    }
    this.tipo = tipo;
    this.openDropdown('dropdown-tipo-veiculo');
  }

  getPeriodos() {
    this.aprovaService.getPeriodos(this.tipo).subscribe(data => {
      this.periodos = data;
    });
  }

  selectPrioridadeOnDropdown(periodo: Periodo) {
    this.periodo = periodo;
    this.openDropdown('dropdown-prioridade');
  }

  closeDropdown(event) {
    let dropdownsInHTMLCollection = document.getElementsByClassName('container-area-dropped') as HTMLCollection;
    let target = event.target;

    let divsDropdown = ['container-area', 'dropdown-area', 'svg-box', 'tipo-text', ''];

    for (var i = 0; i < dropdownsInHTMLCollection.length; i++) {
      let element = dropdownsInHTMLCollection[i];
      if (target.className !== element.className && (!divsDropdown.includes(target.className))) {
        if (element.classList.contains('openDropdown')) {
          element.classList.remove('openDropdown')
        }
      }
    }
  }

  openDropdown(divId: string) {
    let divDropdown = document.getElementById(divId);
    divDropdown.classList.toggle('openDropdown');
  }

  checkTrabalhoNoturno(boolean: boolean) {
    if (boolean) {
      this.form.trabalhoNoturno = "NOTURNO";
    } else {
      this.form.trabalhoNoturno = "INTEGRAL"
    }
  }
}