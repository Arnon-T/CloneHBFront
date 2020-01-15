import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagaContent } from './VagaContent';
import { VagaGaragem } from './VagaGaragem';
import { VagaGaragemDTO } from '../location-garage/vagaGaragemDTO';

@Injectable({
  providedIn: 'root'
})
export class AprovaService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  findAllContentOnNgInit(tipo: string, page: number, itemsPage, turno: string): Observable<VagaContent> {
    if (tipo === undefined || tipo === '') {
      tipo = 'CARRO';
    }

    if (turno === undefined || turno === '') {
      turno = 'INTEGRAL';
    }

    if (itemsPage === undefined || itemsPage === 0) {
      itemsPage = 10;
    }

    let urlToGetAll = this.urlBase + '/vagas/' + tipo + '/' + page + '/' + itemsPage + '/' + turno;
    return this.http.get<VagaContent>(urlToGetAll);
  }

  findAllContentByIdPeriodo(type: string, page: number, size: number, turno: string, idPeriodo: number): Observable<VagaContent> {
    if (type === undefined || type === '') {
      type = 'CARRO';
    }

    if (turno === undefined || turno === '') {
      turno = 'INTEGRAL';
    }

    if (size === undefined || size === 0) {
      size = 10;
    }

    let urlToGetAll = this.urlBase + '/vagas/' + type + '/' + page + '/' + size + '/' + turno + '/' + idPeriodo;
    return this.http.get<VagaContent>(urlToGetAll);
  }

  sorteioVagas(periodoId: number, tipoVeiculo: string, turno: string): Observable<any> {
    turno = turno.toUpperCase();
    tipoVeiculo = tipoVeiculo.toUpperCase();
    let url = this.urlBase + "/vagas/sort/" + periodoId + "/" + tipoVeiculo + "/" + turno;
    return this.http.get(url);
  }

  postAprovarSingular(turno: string, vaga: VagaGaragem): Observable<VagaGaragemDTO> {
    let url = this.urlBase + "/vagas/approve/" + turno;
    return this.http.post<VagaGaragemDTO>(url, vaga);
  }

  postAprovarTodos(turno: string, listaVagas: VagaGaragem[]): Observable<VagaGaragemDTO[]> {
    let url = this.urlBase + "/vagas/approveAll/" + turno;

    return this.http.post<VagaGaragemDTO[]>(url, listaVagas);
  }
}
