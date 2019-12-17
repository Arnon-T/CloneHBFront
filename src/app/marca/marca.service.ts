import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MarcaInfo } from './marca-info';

@Injectable({
  providedIn: 'root'
})

export class MarcaService {
  private signupUrl = 'http://192.168.33.214:8080/api/marcas/';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, tipo: string): Observable<any> {
    let url = this.signupUrl + 'import-marcas';
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('tipo', tipo);

    return this.http.post(url, formdata);
  }

  downloadFile(tipo: string): Observable<any> {
    let url = this.signupUrl + 'export-marcas/' + tipo;

    return this.http.get(url);
  }


}
