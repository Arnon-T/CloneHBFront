import { Component, OnInit } from '@angular/core';

import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';
import { AlertService } from '../_alert';
import { MessageService } from '../_message';
import { TokenStorage } from '../auth/token-storage';
import { Observable } from 'rxjs';
import { LocationGarageService } from '../location-garage/location-garage.service';
import { InformacoesLocatarioService } from './informacoes-locatario.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-informacoes-locatario',
  templateUrl: './informacoes-locatario.component.html',
  styleUrls: ['./informacoes-locatario.component.css']
})
export class InformacoesLocatarioComponent implements OnInit {

  listaAllPeriodos: any;
  periodo: number = 0;
  listaLocatarios: Observable<any>[] = [];
  config: any;
  isValorChecked: boolean = false;
  isMarcaChecked: boolean = false;
  isEmailChecked: boolean = false;
  isTipoChecked: boolean = false;
  isCorChecked: boolean = false;


  constructor(private authGlobal: GlobalAuth, private tokenService: TokenStorage, private route: Router, private alertService: AlertService, private messageService: MessageService, private informacoesLocatario: InformacoesLocatarioService) {
    this.config = {
      itemsPerPage: 2,
      currentPage: 1,
      totalItems: 0
    }
   }

   itemsPageDefaultNumber = 10;
   itemsPage: number = this.itemsPageDefaultNumber;
   itemsPageDefaultNumbers = [10, 25, 50, 100];

   selectItemsPerPage(quantity) {
     this.itemsPage = quantity;
   }

  ngOnInit() {
    this.authGlobal.ngOnInit();
    this.informacoesLocatario.getPeriodos().subscribe((data) => {
      console.log(data);
        this.listaAllPeriodos = data;
    });

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }
  }

  selectOption(event) {
    this.periodo = event.target.selectedIndex;
    console.log(this.isValorChecked);
  }

  listarLocatarios() {
    if (this.periodo === 0) {
      this.messageService.warn("Selecione um periodo para listar");
      return;
    }

    this.informacoesLocatario.getLocatarios(this.periodo, this.config.currentPage, this.config.itemsPerPage).subscribe((data) =>  {
        this.listaLocatarios = data;
        this.config.totalItems = data.totalElements;
        console.log(this.listaLocatarios)
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  export() {
    if (this.periodo === 0) {
      this.messageService.warn("Selecione um periodo para exportar");
      return;
    }
     
    this.informacoesLocatario.getExportCSV(this.periodo).subscribe(data => {
        saveAs(new Blob([data], { type: 'multipart/form-data' }), 'locatarios.csv');
    }), error => {
      console.log(error);
    };
  }

}
