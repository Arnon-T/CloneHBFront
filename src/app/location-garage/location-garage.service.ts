import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationGarageService {

  constructor(private http: HttpClient) { }

  
  getNomeModelo(modelo: string, idMarca: any): Observable<any>{
    var url = "http://localhost:8080/api/model/findModel/" +idMarca+"/"+modelo
    console.log(url)
    return this.http.get(url);
  }
}
