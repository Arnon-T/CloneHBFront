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
  tipos = ['Moto', 'Patinete', 'Bicicleta'];

  turno: string = 'INTEGRAL';
  turnoBoolean: boolean = false;

  periodoDefaultName: string = 'Período';
  periodo: Periodo;
  periodos: Periodo[];

  moreColaboradorThanVagas: boolean = false;
  vagaGaragemPageable: VagaGaragemPageable;
  listaVagas: VagaGaragem[];

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
      this.listaVagas = data.content.filter(vagaGaragem => vagaGaragem.statusVaga !== 'APROVADA').filter(vaga => vaga.colaborador.trabalhoNoturno === this.turnoBoolean);
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
      if (data !== undefined && data.length >= 1) {
        this.periodos = [...data];
      } else {
        const newPeriodo = new Periodo();
        newPeriodo.descricao = "Nenhum período encontrado.";
        this.periodos = [newPeriodo];
      }
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
    this.aprovaService.postAprovarTodos(this.turno.toUpperCase(), this.listaVagas).subscribe(data => {
      this.alertService.success('Todos os colaboradores foram aprovados.');
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 404:
          this.alertService.error("Não foi possivel devido a não haver nenhuma informação de vaga para este período.");
          break;
      }
    });
  }

  buscarQuantidadeVagas() {
  }

  sortearTodasVagas() {
    this.aprovaService.sorteioVagas(this.periodo.id, this.tipo, this.form.trabalhoNoturno);
  }

  aprovarSingular(vaga: VagaGaragem) {
    // CRIAR INTEGRACAO COM API de aprovar
    this.aprovaService.postAprovarSingular(this.turno.toUpperCase(), vaga).subscribe(data => {
      this.alertService.success('Colaborador aprovado com sucesso!');
      this.listaVagas = this.listaVagas.filter(vagaGaragem => vagaGaragem.id !== data.id);
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.messageService.error("Não foi possivel aprovar o colaborador.");
          break;
      }
    });
  }

  selectTipoOnDropdown(tipo: string) {
    this.tipos = this.tipos.filter(type => type !== tipo);
    if (this.tipo !== undefined) {
      let tiposArray = [this.tipo, ...this.tipos];
      this.tipos = tiposArray;
    }
    this.tipo = tipo;
    this.listaVagas = this.vagaGaragemPageable.content;
    this.getAllVagaGaragens(this.tipo.toUpperCase(), 0, this.itemsPage);
    this.getPeriodos();
    this.openDropdown('dropdown-tipo-veiculo');
  }

  getPeriodos() {
    this.aprovaService.getPeriodos(this.tipo.toUpperCase()).subscribe(data => {
      let periodoNewer = new Periodo();
      if (data !== undefined && data.length >= 1) {
        periodoNewer.descricao = 'Período';
        this.periodo = periodoNewer;
        this.periodos = data;
      } else {
        periodoNewer.descricao = 'Não há nenhum período';
        this.periodo = periodoNewer;
        this.periodos = [periodoNewer];
      }
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.messageService.error("Não foi possivel buscar os períodos ao trocar o tipo de veículo.");
          break;
      }
    });
  }

  selectPeriodoOnDropdown(periodo: Periodo) {
    this.periodo = periodo;
    this.openDropdown('dropdown-prioridade');
    if (periodo.descricao === 'Período') {
      this.listaVagas = this.vagaGaragemPageable.content;
      return;
    }
    this.listaVagas = this.vagaGaragemPageable.content.filter(vaga => vaga.periodo.id === periodo.id).filter(vaga => vaga.statusVaga !== 'APROVADA').filter(vaga => vaga.colaborador.trabalhoNoturno === this.turnoBoolean);
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

  checkTrabalhoNoturno(event) {
    this.turnoBoolean = event.target.checked;
    if (this.turnoBoolean) {
      this.turno = 'NOTURNO';
    } else {
      this.turno = 'INTEGRAL';
    }

    this.listaVagas = this.vagaGaragemPageable.content.filter(vaga => vaga.colaborador.trabalhoNoturno === this.turnoBoolean).filter(vaga => vaga.statusVaga !== 'APROVADA');
  }
}
