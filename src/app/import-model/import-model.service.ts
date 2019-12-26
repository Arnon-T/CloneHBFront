import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class ModelService{


    private exportUrl = 'http://localhost:8080/api/model/export/models'
    private importUrl = 'http://localhost:8080/api/model/import/models';


    constructor(private http: HttpClient){}


    importarCsv(arquivo: File) : Observable<any>{

        let formdata: FormData = new FormData();
        formdata.append('file',arquivo);
        console.log(arquivo)
        return this.http.post(this.importUrl, formdata);

    }

    exportarCsv(): Observable<HttpResponse<string>>{
      let headers = new HttpHeaders();
      headers = headers.append('Accept', 'text/csv;windows-1252');
        return this.http.get(this.exportUrl, {observe: 'response', responseType: 'text'});
    }

  }
