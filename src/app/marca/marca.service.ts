import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from '../_alert';


@Injectable({
  providedIn: 'root'
})

export class MarcaService {
  private signupUrl = 'http://localhost:8080/api/marcas';

  constructor(private http: HttpClient, private alertService: AlertService) { }

  uploadFile(file: File, tipo: string): Observable<any> {
    let url = this.signupUrl + '/fileupload/' + tipo;
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    try {
      this.alertService.warn('Iniciando importação');

      return this.http.post(url, formdata);;
    } catch (error) {
      this.alertService.error(error);
    }

  }

  downloadFile(tipo) {
    let url = this.signupUrl + '/export-marcas/' + tipo;
    try {
      window.open(url);
      this.alertService.warn('Iniciando exportação.')
    } catch (error) {
      this.alertService.error(error);
    }

  }

  selectMarcas(tipo: string): Observable<any> {
    let url = this.signupUrl + '/allByTipo/' + tipo;

    return this.http.get(url);
  }

}
