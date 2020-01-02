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
    console.log("testando");
    this.selectedFiles = event.target.files;
  }

  onSubmit(event) {

    this.fileToUpload = this.selectedFiles.item(0);
    console.log(this.cadastrarColaboradoresService.uploadFile(this.fileToUpload).subscribe());

  }
}
