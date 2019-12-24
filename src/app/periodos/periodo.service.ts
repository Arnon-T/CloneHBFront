import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcaService } from '../marca/marca.service';
import { Periodo } from '../periodo';

@Injectable({
    providedIn: 'root'
  })

  export class PeriodoService{

    constructor(private http: HttpClient, private marcaService: MarcaService) { 
    }

    private API_URL = "http://192.168.32.25:8080/api/periodo/"

    postInformation(tipo: string, dataFim: string, dataInicio: string): Observable<any>{
        
        console.log(dataFim)
        console.log(dataInicio)
        console.log(tipo)

        //creating url
        let url = this.API_URL
    
        let periodo: Periodo = new Periodo()

        periodo.dataInicial = dataInicio
        periodo.dataFinal = dataFim
        periodo.vehicleType = tipo
    
        //sending the information
        return this.http.post(url+"criar", periodo)
      }

      returnInformation(tipoVehicle: string): Observable<any>{
        return this.http.get(this.API_URL+"buscar-tipo/"+tipoVehicle)
      }
  }