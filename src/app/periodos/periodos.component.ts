import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoService } from './periodo.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css'],
  providers: [DatePipe]
})
export class PeriodosComponent implements OnInit {


      
  tipos = ['AUTOMOVEL', 'MOTO', 'BICICLETA', 'PATINETE']
  tipoSelected = 'AUTOMOVEL'
  config: any
  listaPeriodo: Observable<any>[] = [];

  constructor(private http: HttpClient, private periodoService: PeriodoService, private datePipe: DatePipe) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.listaPeriodo.length
    }
   }

  ngOnInit() {
  }

  //create form
  form: any ={};

  getSelected(tipo){
    this.tipoSelected = tipo
  }

  sendInformation(){
    var dataFim = this.datePipe.transform(this.form.fim, 'dd/MM/yyyy') 
    var dataInicio = this.datePipe.transform(this.form.inicio, 'dd/MM/yyyy')

    this.periodoService.postInformation(this.tipoSelected, dataFim, dataInicio).subscribe(data =>{}, error =>{
      status = error.status
      if(error.status != 200){
        return document.getElementById('error').innerHTML =  "Erro ao cadastrar o periodo ("+error.status+")"  
      }
    })

    return document.getElementById('error').innerHTML =  "Cadastro efetuado com sucesso"
  }

  getInformation(){
    this.periodoService.returnInformation(this.tipoSelected).subscribe((dados: any) => {
      this.listaPeriodo = dados
      this.pageChanged(1)
    })
  }

  pageChanged(event) {
    console.log(this.listaPeriodo)
    this.config.currentPage = event;
  }

}

