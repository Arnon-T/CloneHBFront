import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MarcaService {
  private signupUrl = 'http://192.168.33.214:8080/api/marcas/';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, tipo: string): Observable<any> {
    let url = this.signupUrl + 'fileupload/' + tipo;
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post(url, formdata);
  }

  downloadFile(tipo: string): Observable<any> {
    let url = this.signupUrl + 'export-marcas/' + tipo;

    return this.http.get(url);
  }

  selectMarcas(tipo: string): Observable<any>{
    let url = this.signupUrl + 'allByTipo/' + tipo;

    return this.http.get(url);
  }

}
