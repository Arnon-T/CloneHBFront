import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { MarcaService } from './marca.service';
import { MarcaInfo } from './marca-info';
import { Observable } from 'rxjs';
import {NgxPaginationModule} from 'ngx-pagination';
import { map  } from 'rxjs/operators';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  form: any = {};
  marcaInfo: MarcaInfo;
  errorMessage = '';

  tipos = ['', 'CARRO', 'MOTO']

  selectedFiles: FileList;
  currentFileUpload: File;
  tipo : string;
  listaMarcas  : Observable<any>[] = [];
  config : any;
    
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
  selectOption(tipo){
    this.tipo = tipo;
  }

  export(tipo) {
    this.marcaService.downloadFile(tipo).subscribe();
  }

  import(){   
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    this.marcaService.uploadFile(this.currentFileUpload, this.tipo).subscribe();
  }

  listarMarcas(tipo) {
    this.marcaService.selectMarcas(tipo)
    .subscribe((dados: any) => {
      this.listaMarcas = dados;
      console.log(dados.content);
      console.log(this.listaMarcas);
    }
    )
  }
  
  pageChanged(event) {
    this.config.currentPage = event;
  }

}
