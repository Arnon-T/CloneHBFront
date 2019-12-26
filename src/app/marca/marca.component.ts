import { Component, OnInit } from '@angular/core';
import { MarcaService } from './marca.service';
import { MarcaInfo } from './marca-info';
import { Observable } from 'rxjs';
import { AlertService } from '../_alert';
import { saveAs } from 'file-saver';

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

  constructor(private marcaService: MarcaService, private alertService: AlertService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.listaMarcas.length
    }

  }
  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  selectOption(tipo) {
    this.tipo = tipo;
  }

  export() {
    this.marcaService.downloadFile(this.tipo).subscribe(data => {
      this.alertService.success('Iniciando download.');

      saveAs(new Blob([data], { type: 'multipart/form-data' }), 'marcas.csv');
    }, error => {
      switch (error.status) {
        case 0:
          this.alertService.error('Servidor está indisponivel.');
          break;
      }
    });
  }

  import() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.marcaService.uploadFile(this.currentFileUpload, this.tipo).subscribe(data => {
      this.alertService.success('Marcas importadas com sucesso!');
    }, error => {
      console.log(error)
      switch (error.status) {
        case 0:
          this.alertService.error('Servidor indisponivel.');
          break;
        case 500:
          this.alertService.error('Erro interno do servidor.');
          break;
        case 406:
          this.alertService.error('Extensão do arquivo é inválida.');
          break;
      }
    });
  }

  listarMarcas(tipo) {
    this.marcaService.selectMarcas(tipo)
      .subscribe(data => {
        this.listaMarcas = data;
      });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
