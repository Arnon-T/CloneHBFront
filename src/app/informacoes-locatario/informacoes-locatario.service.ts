import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformacoesLocatarioService {

  constructor(private http: HttpClient) { }


  getPeriodos() {
    var url = "http://localhost:8080/api/periodo/buscar-periodo"
    return this.http.get(url);
  }

  getLocatarios(idPeriodo: number, currentPage: number, itemsPerPage: number): Observable<any> {
    currentPage = currentPage - 1;
    return this.http.get("http://localhost:8080/api/vagas/find/" + idPeriodo + "/" + currentPage + "/" + itemsPerPage)
  }

  getExportCSV(idPeriodo: number): Observable<ArrayBuffer> {

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
    let url = "http://localhost:8080/api/vagas/export/" + idPeriodo;

    return this.http.get(url, options).pipe(map((file: ArrayBuffer) => {
      return file;
    }));
  }

  getExportByColumns(periodoId: number, marca: boolean, email: boolean, tipo: boolean, cor: boolean): Observable<ArrayBuffer> {
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
    let url = "http://localhost:8080/api/reports/locatarios/export/columns/" + periodoId + "/" + marca + "/" + email + "/" + tipo + "/" + cor;
    
    return this.http.get(url, options).pipe(map((file:ArrayBuffer) => {
      return file;
    }))
  }

}
