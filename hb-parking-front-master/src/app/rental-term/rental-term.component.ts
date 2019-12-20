import { Component, OnInit } from '@angular/core';
import { RentalTermService } from './rental-term.service';

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

  constructor(private rentalTermService: RentalTermService) { }

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

    console.log(this.currentFileUpload.name);

    this.rentalTermService.uploadTerm(this.currentFileUpload, this.termTitle).subscribe();
  }
}
