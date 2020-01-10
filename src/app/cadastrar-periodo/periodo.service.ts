import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private urlBase = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createPeriodo(periodoDTOToAPI: { vehicleType: string; dataInicial: string; dataFinal: string; }) {
    let url = this.urlBase + '/periodo/criar';
    periodoDTOToAPI.vehicleType = periodoDTOToAPI.vehicleType.toUpperCase();

    return this.http.post(url, periodoDTOToAPI);
  }
}
