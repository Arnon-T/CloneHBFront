import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CadastroColaboradoresService {
  private mainUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    let url = this.mainUrl + "/colaborador/cadastrar/csv";

    let formData: FormData = new FormData();

    formData.append('file',file);

    return this.http.post(url, formData);
  }
}
