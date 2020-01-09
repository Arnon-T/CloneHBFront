import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagaGaragemPageable } from './VagaGararemPageable';

@Injectable({
  providedIn: 'root'
})
export class AprovaService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  findAllColaboradoresToApprove(type: string, itemsPage: number): Observable<VagaGaragemPageable> {
    if (type === undefined || type === '') {
      type = 'CARRO';
    }

    if (itemsPage === undefined || itemsPage === 0) {
      itemsPage = 10;
    }

    let urlToGetAll = this.urlBase + '/colaboradores/' + type + '/' + itemsPage;
    return this.http.get<VagaGaragemPageable>(urlToGetAll);
  }
}
