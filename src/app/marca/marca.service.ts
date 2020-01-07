import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from '../_alert';
import { MessageService } from '../_message';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MarcaService {
  private urlBase = 'http://localhost:8080/api/marcas';

  constructor(private http: HttpClient, private alertService: AlertService, private messageService: MessageService) { }

  uploadFile(file: File, tipo: string): Observable<any> {
    let url = this.urlBase + '/fileupload/' + tipo;
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(url, formdata);
  }

  downloadFile(tipo): Observable<ArrayBuffer> {
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

    let url = this.urlBase + '/export-marcas/' + tipo;

    return this.http.get(url, options).pipe(map((file: ArrayBuffer) => {
      return file;
    }));
  }

  selectMarcas(tipo: string, page: any, limit: any): Observable<any> {
    page = page - 1;
    let url = this.urlBase + '/allByTipo/' + tipo + "/" + page + '/' + limit;

    return this.http.get(url);
  }

  selectAllMarcas(tipo: string): Observable<any> {
    let url = this.urlBase + '/allByTipo/' + tipo;

    return this.http.get(url);
  }
}
