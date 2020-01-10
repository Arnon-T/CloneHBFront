import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagaGaragemPageable } from './VagaGararemPageable';
import { Periodo } from './Periodo';
import { VagaGaragem } from './VagaGaragem';
import { VagaGaragemDTO } from '../location-garage/vagaGaragemDTO';

@Injectable({
  providedIn: 'root'
})
export class AprovaService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  findAllColaboradoresToApprove(tipo: string, page: number, itemsPage): Observable<VagaGaragemPageable> {
    if (tipo === undefined || tipo === '') {
      tipo = 'CARRO';
    }

    if (itemsPage === undefined || itemsPage === 0) {
      itemsPage = 10;
    }

    let urlToGetAll = this.urlBase + '/vagas/findby/' + tipo + '/' + page + "/" + itemsPage;
    return this.http.get<VagaGaragemPageable>(urlToGetAll);
  }

  sorteioVagas(periodoId: number, tipoVeiculo: string, turno: string): Observable<any>{
    let url = this.urlBase + "/sort/" + periodoId + "/" + tipoVeiculo +  "/" + turno;
    return this.http.get(url);
  }


  getPeriodos(tipo: string): Observable<Periodo[]> {
    if (tipo === undefined || tipo === '') {
      return;
    }

    var url =  this.urlBase + "/periodo/buscar-tipo/" + tipo;
    return this.http.get<Periodo[]>(url);
  }

  postAprovarSingular(turno: string, vaga: VagaGaragem): Observable<VagaGaragemDTO> {
    let url =  this.urlBase + "/vagas/approve/" + turno;
    return this.http.post<VagaGaragemDTO>(url, vaga);
  }

  getQuantidadeVagas() {

  }

  postAprovarTodos(turno: string, listaVagas: VagaGaragem[]) {
    let url = this.urlBase + "/vagas/approveAll/" + turno;

    return this.http.post(url, listaVagas);
  }
}
