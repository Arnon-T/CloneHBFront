import { Component, OnInit } from '@angular/core';
import { CadastroColaboradoresService } from './cadastr-colaboradores.service';

@Component({
  selector: 'app-cadastro-colaboradores',
  templateUrl: './cadastro-colaboradores.component.html',
  styleUrls: ['./cadastro-colaboradores.component.css']
})
export class CadastroColaboradoresComponent implements OnInit {

  constructor(private cadastrarColaboradoresService: CadastroColaboradoresService) { }

  selectedFiles: FileList;
  fileToUpload: File;

  ngOnInit() {
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
