import { Component, OnInit } from '@angular/core';
import { ModelService } from './import-model.service';
import { TokenStorage } from '../auth/token-storage'
import { AlertService } from '../_alert'
import { MessageService } from '../_message'
import { saveAs } from 'file-saver';
import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-model',
  templateUrl: './import-model.component.html',
  styleUrls: ['./import-model.component.css']
})
export class VehicleModelComponent implements OnInit {

  constructor(private modelService: ModelService, private tokenService: TokenStorage, private alertService: AlertService, private messageService: MessageService, private authGlobal: GlobalAuth, private route: Router) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
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
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
      }
    });
  }

  import() {
    this.alertService.clear();
    if (this.selectedFiles === undefined) {
      return this.alertService.error("Necessário selecionar um arquivo em formato csv.");
    }
    this.currentFileUpload = this.selectedFiles.item(0);
    this.modelService.uploadFile(this.currentFileUpload).subscribe(data => {
      this.alertService.success('Modelos importados com sucesso!');
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
}
