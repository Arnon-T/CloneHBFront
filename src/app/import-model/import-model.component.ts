import { Component, OnInit } from '@angular/core';
import { ModelService } from './import-model.service';
import { AlertService } from '../_alert'
import { saveAs } from 'file-saver';
import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-model',
  templateUrl: './import-model.component.html',
  styleUrls: ['./import-model.component.css']
})
export class VehicleModelComponent implements OnInit {

  constructor(private modelService: ModelService, private alertService: AlertService, private authGlobal: GlobalAuth, private route: Router) { }

  ngOnInit() {

    this.authGlobal.ngOnInit();

    if(this.authGlobal.authority === 'user' || this.authGlobal.authority === undefined){
      this.route.navigate(['/login']);  
      return;
    }
    
  }

  selectedFiles: FileList;
  currentFileUpload: File;
  formzin: any = {};

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  export() {
    this.modelService.downloadFile().subscribe(data => {
      this.alertService.success('Iniciando download.');
      saveAs(new Blob([data], { type: 'multipart/form-data' }), 'modelo.csv');
    }, error => {
      switch (error.status) {
        case 0:
          this.alertService.error('Servidor está indisponível.')
      }
    });
  }

  import() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.modelService.uploadFile(this.currentFileUpload).subscribe(data => {
      this.alertService.success('Modelos importados com sucesso!');
    }, error => {
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

}
