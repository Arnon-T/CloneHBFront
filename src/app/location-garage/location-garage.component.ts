import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MarcaService } from '../marca/marca.service';
import { LocationGarageService } from "./location-garage.service"

import { TokenStorage } from '../auth/token-storage';
import { MessageService } from '../_message';
import { GlobalAuth } from '../global-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-garage',
  templateUrl: './location-garage.component.html',
  styleUrls: ['./location-garage.component.css']
})
export class LocationGarageComponent implements OnInit {

  form: any = {};
  marcaInfo;
  errorMessage = '';
  LocationForm: FormGroup;
  tipos = ['SELECIONAR TIPO', 'CARRO', 'MOTO', 'PATINETE', 'BICICLETA']
  tipo: string = 'SELECIONAR TIPO';
  config: any;
  vehicleHasOption: boolean;
  listaMarcas: Observable<any>[] = [];
  listaAllMarcas: any;
  listaPeriodos: any;
  selectedMarca: any;
  marca: 'SELECIONAR MARCA';
  cores = ['SELECIONAR COR','BRANCO', 'PRETO', 'PRATA', 'CINZA', 'VERMELHO', 'MARROM', 'BEGE', 'AZUL', 'VERDE', 'AMARELO', 'DOURADO', 'OUTROS'];
  constructor(private authGlobal: GlobalAuth, private tokenService: TokenStorage, private messageService: MessageService, private route: Router, private marcaService: MarcaService, private locationGarageService: LocationGarageService) {

  }

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }

    this.selectedMarca = 0
    this.initLocationForm();
  }

  initLocationForm() {
    this.LocationForm
  }

  selectOption(tipo) {
    this.tipo = tipo;
  }

  setVehicleHasOption() {
    console.log(this.vehicleHasOption);
    if (this.tipo === 'BICICLETA' || this.tipo === 'PATINETE' || this.tipo === 'SELECIONAR TIPO') {
      this.vehicleHasOption = true;
      this.listaMarcas = [];      
    } else {
      this.vehicleHasOption = false;
    }
    console.log(this.vehicleHasOption);
  }

  searchMarca() {
    if (!this.vehicleHasOption) {
      this.marcaService.selectMarcas(this.tipo, 10, 10).subscribe((dados: any) => {
        this.listaMarcas = dados.content;

        console.log("Testando", this.listaMarcas);
      });
    }
  }

  alterarMarca(marcaOption) {
    this.selectedMarca = marcaOption.selectedIndex
  }

  searchModelo(event) {
    this.locationGarageService.getNomeModelo(event.target.value, this.selectedMarca + 1).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
      }
    })
  }
    
  listarAllMarcas() {
    this.marcaService.selectAllMarcas(this.tipo).subscribe(data => {
      this.listaAllMarcas = data;
    });
}

  selectPeriodos(){
    this.locationGarageService.getPeriodos(this.tipo).subscribe(data => {
      this.listaPeriodos = data;
      console.log(this.tipo);
      console.log(this.listaPeriodos);
      console.log(data);
    });
  }


}
