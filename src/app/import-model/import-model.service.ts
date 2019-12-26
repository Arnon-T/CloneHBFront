import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from '../_alert';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class ModelService{

    private exportUrl = 'http://localhost:8080/api/model/export/models'
    private importUrl = 'http://localhost:8080/api/model/import/models';

    constructor(private http: HttpClient, private alertService: AlertService){}

    uploadFile(arquivo: File) : Observable<any>{
      let formdata: FormData = new FormData();
      formdata.append('file', arquivo);
      return this.http.post(this.importUrl, formdata);
    }

    downloadFile(): Observable<ArrayBuffer> {
      let headers = new HttpHeaders();

      const options: {
          headers?: HttpHeaders;
          observe?: 'body';
          params?: HttpParams;
          reportProgress?: boolean;
          responseType: 'arraybuffer';
          withCredentials?: boolean;
      } = {
          responseType: 'arraybuffer'
      };
             
      return this.http.get(this.exportUrl, options).pipe(map((file: ArrayBuffer) => {
        return file;
      }));
    }
  }
