import { Component, OnInit } from '@angular/core';
import { MarcaService } from './marca.service';
import { MarcaInfo } from './marca-info';
import { Observable } from 'rxjs';
import { AlertService } from '../_alert';
import { MessageService } from '../_message';
import { saveAs } from 'file-saver';
import { GlobalAuth } from '../global-auth';
import { TokenStorage } from '../auth/token-storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  form: any = {};
  marcaInfo: MarcaInfo;
  errorMessage = '';

  tipos = ['CARRO', 'MOTO']

  selectedFiles: FileList;
  currentFileUpload: File;
  tipo: string = 'CARRO';
  listaMarcas: Observable<any>[] = [];
  config: any;


  constructor(private authGlobal: GlobalAuth, private marcaService: MarcaService, private tokenService: TokenStorage, private alertService: AlertService, private messageService: MessageService, private route: Router) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    }
  }

  itemsPageDefaultNumber = 10;
  itemsPage: number = this.itemsPageDefaultNumber;
  itemsPageDefaultNumbers = [10, 25, 50, 100];

  selectItemsPerPage(quantity) {
    this.config.itemsPerPage = quantity;

  }

  ngOnInit() {
    this.authGlobal.ngOnInit();
    if (!this.tokenService.getToken()) {
      this.alertService.info("Você não possui permissão para acessar essa página.");
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  selectOption(tipo) {
    this.tipo = tipo;
  }

  export() {
    this.alertService.clear();
    this.marcaService.downloadFile(this.tipo).subscribe(data => {
      this.alertService.success('Iniciando download.');

      saveAs(new Blob([data], { type: 'multipart/form-data' }), 'marcas.csv');
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
  }

  import() {
    if (this.selectedFiles === undefined) {
      return this.alertService.error("Necessário selecionar um arquivo em formato csv.");
    }
    this.currentFileUpload = this.selectedFiles.item(0);
    this.marcaService.uploadFile(this.currentFileUpload, this.tipo).subscribe(data => {
      this.alertService.success('Marcas importadas com sucesso!');
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        case 406:
          this.alertService.error('Extensão do arquivo é inválida.');
          break;
      }
    });
  }

  listarMarcas(tipo) {
    if (this.listaMarcas.length <= 0) {
      this.messageService.info("Buscando marcas existentes.");
    }
    this.marcaService.selectMarcas(tipo, this.config.currentPage, this.config.itemsPerPage)
      .subscribe(data => {
        this.listaMarcas = data;
        this.config.totalItems = data.totalElements;
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
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
