import { Component, OnInit } from '@angular/core';

import { GlobalAuth } from '../global-auth';
import { AlertService } from '../_alert'
import { MessageService } from '../_message'
import { Router } from '@angular/router';
import { TokenStorage } from '../auth/token-storage';
import { AprovaService } from './aprova.service';
import { VagaContent } from './VagaContent';
import { VagaGaragem } from './VagaGaragem';
import { PeriodoDTO } from './PeriodoDTO';
import { VagaInfoDTO } from './VagaInfoDTO';

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
    this.alertService.clear();
    this.itemsPage = quantity;
    if (this.periodo !== undefined && this.periodo.id !== undefined) {
      this.getVagaContentWithPeriodo(this.tipo.toUpperCase(), 0, this.itemsPage, this.turno.toUpperCase(), this.periodo.id);
    } else {
      this.alertService.warn('Não existe período nesse tipo de veículo.');
    }
  }

  form: any = {};
  isLoading: boolean = false;

  tipoDefaultName = 'Carro';
  tipo: string = this.tipoDefaultName;
  tipos = ['Moto', 'Patinete', 'Bicicleta'];

  turno: string = 'INTEGRAL';
  turnoBoolean: boolean = false;

  periodoDefaultName: string = 'Período';
  periodo: PeriodoDTO;
  periodos: PeriodoDTO[];

  moreColaboradorThanVagas: boolean = false;
  vagaInfo: VagaInfoDTO;
  vagaContent: VagaContent;
  listaVagas: VagaGaragem[] = [];
  listaVagasSelecionadas: VagaGaragem[] = [];

  actualPage: number = 0;
  actualPageToPagination: number = 0;
  actualPageWithOnePlusJustUseInHTML: number = 0;
  totalPages: number = 0;

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }

    this.messageService.info('Buscando colaboradores..');

    this.isLoading = true;
    this.getVagaContentOnNgInit('CARRO', 0, this.itemsPage, 'INTEGRAL');
  }

  getVagaContentOnNgInit(type: string, page: number, size: number, turno: string) {
    this.aprovaService.findAllContentOnNgInit(type, page, size, turno).subscribe(data => {
      this.isLoading = false;
      console.log(data)
      this.vagaContent = data;
      this.listaVagas = data.vagaGaragemPage.content;
      if (data.periodoDTO !== null || data.periodoDTO !== undefined) {
        this.periodo = data.periodoDTO;
        this.periodos = [...data.periodosDTOOfVehicleType]; { }
      } else {
        let periodoError = new PeriodoDTO();
        periodoError.descricao = 'Nenhum período encontrado.';

        this.periodo = periodoError;
        this.periodos = [periodoError];
      }
      this.vagaInfo = data.vagaInfoDTO;
      this.listaVagasSelecionadas = [];
      this.actualPage = data.vagaGaragemPage.number;
      this.actualPageToPagination = data.vagaGaragemPage.number;
      this.actualPageWithOnePlusJustUseInHTML = data.vagaGaragemPage.number + 1;
      this.totalPages = data.vagaGaragemPage.totalPages;
      this.setSortNeeded();
    }, error => {
      this.resetAll();
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 404:
          this.alertService.error(error.error.message);
          break;
      }
    });
  }

  getVagaContentWithPeriodo(type: string, page: number, size: number, turno: string, idPeriodo: number) {
    this.aprovaService.findAllContentByIdPeriodo(type, page, size, turno, idPeriodo).subscribe(data => {
      this.isLoading = false;
      this.vagaContent = data;
      this.listaVagas = data.vagaGaragemPage.content;
      this.periodo = data.periodoDTO;
      this.periodos = [...data.periodosDTOOfVehicleType];
      this.vagaInfo = data.vagaInfoDTO;
      this.listaVagasSelecionadas = [];
      this.actualPage = data.vagaGaragemPage.number;
      this.actualPageToPagination = data.vagaGaragemPage.number;
      this.actualPageWithOnePlusJustUseInHTML = data.vagaGaragemPage.number + 1;
      this.totalPages = data.vagaGaragemPage.totalPages;
      this.setSortNeeded();
    }, error => {
      this.resetAll();
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 404:
          this.alertService.error(error.error.message);
          break;
      }
    });
  }

  getVagaContentWithPeriodoByPaginationButton(type: string, page: number, size: number, turno: string, idPeriodo: number) {
    this.aprovaService.findAllContentByIdPeriodo(type, page, size, turno, idPeriodo).subscribe(data => {
      this.isLoading = false;
      this.vagaContent = data;
      this.listaVagas = this.listaVagas.concat(data.vagaGaragemPage.content);
      this.periodo = data.periodoDTO;
      this.periodos = [...data.periodosDTOOfVehicleType];
      this.vagaInfo = data.vagaInfoDTO;
      this.listaVagasSelecionadas = [];
      this.actualPageToPagination = data.vagaGaragemPage.number;
      this.actualPageWithOnePlusJustUseInHTML = data.vagaGaragemPage.number + 1;
      this.totalPages = data.vagaGaragemPage.totalPages;
      this.setSortNeeded();
    }, error => {
      this.resetAll();
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 404:
          this.alertService.error(error.error.message);
          break;
      }
    });
  }

  setSortNeeded() {
    if (this.vagaInfo !== undefined && this.vagaInfo !== null) {
      if (this.vagaContent.vagaGaragemPage.totalElements >= this.vagaInfo.quantidade) {
        return this.moreColaboradorThanVagas = true;
      } else {
        return this.moreColaboradorThanVagas = false;
      }
    }
    return this.moreColaboradorThanVagas = false;
  }

  resetAll() {
    let periodoError = new PeriodoDTO();
    periodoError.descricao = 'Nenhum período encontrado.';

    this.vagaContent = undefined;
    this.vagaInfo = undefined;
    this.periodo = periodoError;
    this.periodos = [periodoError];
    this.listaVagas = [];
    this.moreColaboradorThanVagas = false;
    this.listaVagasSelecionadas = [];
    this.actualPage = 0;
    this.actualPageToPagination = 0;
    this.actualPageWithOnePlusJustUseInHTML = 0;
    this.totalPages = 0;
  }

  aprovarTodos() {
    this.aprovaService.postAprovarTodos(this.turno.toUpperCase(), this.listaVagas).subscribe(data => {
      if (data.length !== this.listaVagas.length) {
        throw this.alertService.error("Não foi possivel devido a não haver nenhuma informação de vaga para este período.");
      }
      this.alertService.success('Todos os colaboradores foram aprovados.');
      data.map(vaga => {
        this.listaVagas = this.listaVagas.filter(vagaGaragemInList => vagaGaragemInList.id !== vaga.id);
      });
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

  sortearTodasVagas() {
    this.aprovaService.sorteioVagas(this.periodo.id, this.tipo, this.turno).subscribe(data => {
      this.alertService.success('Vagas foram sorteadas com sucesso!');
      console.log(data);
      this.isLoading = false;
      this.vagaContent = data;
      this.listaVagas = data.vagaGaragemPage.content.filter(vagaGaragem => vagaGaragem.statusVaga !== 'APROVADA');
      this.periodo = data.periodoDTO;
      this.periodos = [...data.periodosDTOOfVehicleType];
      this.vagaInfo = data.vagaInfoDTO;
      this.listaVagasSelecionadas = [];
      this.actualPage = data.vagaGaragemPage.number;
      this.actualPageToPagination = data.vagaGaragemPage.number;
      this.actualPageWithOnePlusJustUseInHTML = data.vagaGaragemPage.number + 1;
      this.totalPages = data.vagaGaragemPage.totalPages;
      this.setSortNeeded();
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.alertService.error("Não foi possivel sortear as vagas.");
          break;
      }
    });
  }

  addOnList(vaga: VagaGaragem) {
    if (!this.listaVagasSelecionadas.includes(vaga)) {
      this.listaVagasSelecionadas.push(vaga);
    } else {
      this.listaVagasSelecionadas = this.listaVagasSelecionadas.filter(vagaFromList => vagaFromList.id !== vaga.id);
    }
  }

  selectTipoOnDropdown(tipo: string) {
    this.getVagaContentOnNgInit(tipo.toUpperCase(), this.actualPage, this.itemsPage, this.turno);
    this.tipos = this.tipos.filter(type => type !== tipo);
    if (this.tipo !== undefined) {
      let tiposArray = [this.tipo, ...this.tipos];
      this.tipos = tiposArray;
    }
    this.tipo = tipo;
    this.openDropdown('dropdown-tipo-veiculo');
  }

  selectPeriodoOnDropdown(periodo: PeriodoDTO) {
    if (periodo !== undefined && periodo.id !== undefined) {
      this.getVagaContentWithPeriodo(this.tipo.toUpperCase(), this.actualPage, this.itemsPage, this.turno, periodo.id);
      this.periodo = periodo;
    }
    this.openDropdown('dropdown-prioridade');
  }

  checkTrabalhoNoturno(event) {
    this.alertService.clear();
    if (this.periodo !== undefined && this.periodo.id !== undefined) {
      this.turnoBoolean = event.target.checked;
      if (this.turnoBoolean) {
        this.turno = 'NOTURNO';
      } else {
        this.turno = 'INTEGRAL';
      }
      this.getVagaContentWithPeriodo(this.tipo.toUpperCase(), this.actualPage, this.itemsPage, this.turno.toUpperCase(), this.periodo.id);
    } else {
      this.alertService.error('Não possui período nesse tipo de veículo.');
    }
  }

  paginationList(page: number) {
    this.alertService.clear();
    if (page <= this.totalPages) {
      this.getVagaContentWithPeriodoByPaginationButton(this.tipo.toUpperCase(), page, this.itemsPage, this.turno.toUpperCase(), this.periodo.id);
    } else {
      this.alertService.warn('Não possui mais colaboradores para ser carregados');
    }
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
}
