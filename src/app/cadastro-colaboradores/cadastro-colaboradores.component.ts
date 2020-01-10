import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

import { CadastroColaboradoresService } from './cadastr-colaboradores.service';
import { Router } from '@angular/router';
import { AlertService } from '../_alert';
import { MessageService } from '../_message';
import { TokenStorage } from '../auth/token-storage';

@Component({
  selector: 'app-cadastro-colaboradores',
  templateUrl: './cadastro-colaboradores.component.html',
  styleUrls: ['./cadastro-colaboradores.component.css']
})
export class CadastroColaboradoresComponent implements OnInit {

  constructor(private cadastrarColaboradoresService: CadastroColaboradoresService, private tokenService: TokenStorage, private authGlobal: GlobalAuth, private route: Router, private alertService: AlertService, private messageService: MessageService) { }

  selectedFiles: FileList;
  fileToUpload: File;

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    if (this.selectedFiles === undefined) {
      return this.alertService.error("Necessário selecionar um arquivo em formato csv.");
    }
    this.fileToUpload = this.selectedFiles.item(0);

    this.cadastrarColaboradoresService.uploadFile(this.fileToUpload).subscribe(data => {
      this.alertService.success("Colaboradores importados com sucesso!");
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponível.');
          break;
        case 500:
          this.messageService.error('Erro de servidor');
          break;
        case 406:
          this.alertService.error('Extensão do arquivo é inválida.');
          break;
        case 401:
          this.messageService.error('Necessário efetuar o login.');
          break;
        case 409:
          this.messageService.warn('Alguns colaboradores não foram cadastrados devido ao seu e-mail.');
          break;
      }
    })
  }
}
