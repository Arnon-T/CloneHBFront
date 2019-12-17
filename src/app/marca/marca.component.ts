import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { MarcaService } from './marca.service';
import { MarcaInfo } from './marca-info';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  form: any = {};
  marcaInfo: MarcaInfo;
  errorMessage = '';

  tipos = ['CARRO', 'MOTO']

  selectedFiles: FileList;
  currentFileUpload: File;
  tipo : string;

  constructor(private marcaService: MarcaService) { }

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

  import(tipo){
    this.marcaService.uploadFile(this.currentFileUpload, this.tipo).subscribe();
  }

}
