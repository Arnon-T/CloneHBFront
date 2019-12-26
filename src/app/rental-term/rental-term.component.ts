import { Component, OnInit } from '@angular/core';
import { RentalTermService } from './rental-term.service';
import { Alert, AlertService } from '../_alert';

@Component({
  selector: 'app-rental-term',
  templateUrl: './rental-term.component.html',
  styleUrls: ['./rental-term.component.css']
})
export class RentalTermComponent implements OnInit {
  form: any = {};
  selectedFiles: FileList;
  currentFileUpload: File;
  termTitle: string;

  constructor(private rentalTermService: RentalTermService, private alertService: AlertService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.form);

    this.termTitle = this.form.termTitle;

    this.currentFileUpload = this.selectedFiles.item(0);
    
    this.rentalTermService.uploadTerm(this.currentFileUpload, this.termTitle).subscribe(data => {
      this.alertService.success('Termo cadastrado com sucesso!');
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
}
