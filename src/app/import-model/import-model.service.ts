import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ModelService {

  private exportUrl = 'http://localhost:8080/api/model/export/models'
  private importUrl = 'http://localhost:8080/api/model/import/models';

  constructor(private http: HttpClient) { }

  uploadFile(arquivo: File): Observable<any> {
    let formdata: FormData = new FormData();
    formdata.append('file', arquivo);
    return this.http.post(this.importUrl, formdata);
  }

  downloadFile(): Observable<ArrayBuffer> {
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
