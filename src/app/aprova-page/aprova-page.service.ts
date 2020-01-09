import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpInterceptorProvider } from '../auth/auth-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AprovaPageService {

private mainUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  sorteioVagas(periodoId: number, tipoVeiculo: string, turno: string){
    let url = this.mainUrl + "/sort/" + periodoId + "/" + tipoVeiculo +  "/" + turno;
    return this.http.get(url);
  }

}
