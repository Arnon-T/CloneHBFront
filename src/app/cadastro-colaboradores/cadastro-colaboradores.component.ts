import { Component, OnInit } from '@angular/core';
import { CadastroColaboradoresService } from './cadastr-colaboradores.service';
import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-colaboradores',
  templateUrl: './cadastro-colaboradores.component.html',
  styleUrls: ['./cadastro-colaboradores.component.css']
})
export class CadastroColaboradoresComponent implements OnInit {

  constructor(private cadastrarColaboradoresService: CadastroColaboradoresService, private authGlobal: GlobalAuth, private route: Router) { }

  selectedFiles: FileList;
  fileToUpload: File;

  ngOnInit() {

    this.authGlobal.ngOnInit();

    if(this.authGlobal.authority === 'user' || this.authGlobal.authority === undefined){
      this.route.navigate(['/login']);  
      return;
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
