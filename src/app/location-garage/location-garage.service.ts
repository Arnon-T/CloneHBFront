import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationGarageService {

  constructor(private http: HttpClient) { }

  
  getNomeModelo(writed: string, idMarca: any): Observable<any>{
    var url = "http://localhost:8080/api/model/findModel/"+idMarca+"/"+writed
    console.log(url)
    return this.http.get(url);
  }

  getPeriodos(tipo: string){
    var url = "http://localhost:8080/api/periodo/buscar-tipo/" + tipo
    return this.http.get(url);
  }

}
