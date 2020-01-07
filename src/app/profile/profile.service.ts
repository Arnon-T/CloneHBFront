import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from './Colaborador';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getInfoFromUserLogged(): Observable<Colaborador> {
    let url = this.url + "/colaborador";
    return this.http.get<Colaborador>(url);
  }

  updateColaboradorInfo(id: number, colaboradorToAPI: { id: number; nome: any; email: string; dataNascimento: string; pcd: any; resideForaBlumenau: any; ofereceCarona: any; trabalhoNoturno: any; }): Observable<Colaborador> {
    let url = this.url + "/colaborador/update/" + id;
    return this.http.put<Colaborador>(url, colaboradorToAPI);
  }
}
