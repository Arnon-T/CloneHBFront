import { Component, OnInit } from '@angular/core';
import { MarcaService } from './marca.service';
import { MarcaInfo } from './marca-info';
import { Observable } from 'rxjs';

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

  constructor(private marcaService: MarcaService) {
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

  export(tipo) {
    this.marcaService.downloadFile(tipo).subscribe();
  }

  import() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.marcaService.uploadFile(this.currentFileUpload, this.tipo).subscribe();
  }

  listarMarcas(tipo) {
    this.marcaService.selectMarcas(tipo)
      .subscribe((dados: any) => {
        this.listaMarcas = dados;
      }
      )
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
