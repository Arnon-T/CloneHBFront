import { Component, OnInit } from '@angular/core';
import { ModelService }  from './import-model.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-import-model',
  templateUrl: './import-model.component.html',
  styleUrls: ['./import-model.component.css']
})
export class ImportModelComponent implements OnInit {

  constructor(private modelService: ModelService ) { }

  ngOnInit() {
  }

  selectedFiles: FileList;
  currentFileUpload: File;
  formzin: any = {};

  selectFile(event){
    this.selectedFiles = event.target.files;
  }

  exportar(){
    this.modelService.exportarCsv().subscribe(response =>{
      const filename = response.headers.get('filename');
      console.log(response.headers.get('filename'));
      this.saveFile(response.body, filename);
    });
  }

  saveFile(data: any, filename?: string){
    const blob = new Blob([data], {type: 'text/csv;charset=utf-8,%EF%BB%BF'})
    fileSaver.saveAs(blob, filename);
  }

  onSubmit(){
    console.log(this.formzin);

    this.currentFileUpload = this.selectedFiles.item(0);

    this.modelService.importarCsv(this.currentFileUpload).subscribe();

  }

}
