import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoDTO } from './PeriodoDTO';
import { VagaInfo } from './VagaInfo';

@Injectable({
  providedIn: 'root'
})
export class CadastroVagaInfoService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllPeriodos(): Observable<PeriodoDTO[]> {
    let url = this.urlBase + '/periodo/buscar-periodo';

    return this.http.get<PeriodoDTO[]>(url);
  }

  createVagaInfo(vagaInfoToApi: { quantidade: any; idPeriodo: any; valor: any; turno: string; }): Observable<VagaInfo> {
    let url = this.urlBase + '/vaga-info/cadastrar';

    return this.http.post<VagaInfo>(url, vagaInfoToApi);
  }
}
