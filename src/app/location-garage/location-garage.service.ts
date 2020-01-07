import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationGarageService {

  constructor(private http: HttpClient) { }


  getNomeModelo(writed: string, idMarca: any): Observable<any> {
    if (writed === undefined || writed === '') {
      return;
    }

    var url = "http://localhost:8080/api/model/findModel/" + idMarca + "/" + writed
    return this.http.get(url);
  }

  getPeriodos(tipo: string): Observable<any> {
    if (tipo === undefined || tipo === '') {
      return;
    }

    var url = "http://localhost:8080/api/periodo/buscar-tipo/" + tipo
    return this.http.get(url);
  }

  locacaoVagaGaragem(vagaGaragemDTO: any): Observable<any> {
    let url = "http://localhost:8080/api/vagas/cadastrar"
    let formdata: FormData = new FormData();
    formdata.append('vagaGaragemDTO', vagaGaragemDTO);
    return this.http.post(url, formdata);
  }


}
