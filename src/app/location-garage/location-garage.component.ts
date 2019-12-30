import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MarcaService } from '../marca/marca.service';
import { LocationGarageService } from "./location-garage.service"

import { AlertService } from '../_alert';
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
  selectedMarca: any;
  marca: 'SELECIONAR MARCA'
  listaModelos: Observable<any>[] = [];

  constructor(private authGlobal: GlobalAuth, private alertService: AlertService, private route: Router, private marcaService: MarcaService, private locationGarageService: LocationGarageService) {

  }

  ngOnInit() {
    this.authGlobal.ngOnInit();
    if (!(this.authGlobal.authorities.includes('ROLE_SISTEMA') || this.authGlobal.authorities.includes('ROLE_GESTOR') || this.authGlobal.authorities.includes('ROLE_USER'))) {
      this.alertService.info("Você não possui permissão para acessar essa página.");
      return this.route.navigate(['/login']);
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
  }

  searchMarca(tipo) {
    if (!this.vehicleHasOption) {
      this.marcaService.selectMarcas(this.tipo).subscribe((dados: any) => {
        this.listaMarcas = dados.content;

        console.log("Testando", this.listaMarcas);
      });
    }
  }

  alterarMarca(marcaOption) {
    this.selectedMarca = this.listaMarcas[marcaOption.selectedIndex - 1];
    console.log(this.selectedMarca);
  }

  searchModelo(event) {
    if(event.target.value !== "") {
      this.locationGarageService.getNomeModelo(event.target.value, this.selectedMarca.id).subscribe(data => {
    
        this.listaModelos = data;
        console.log(data);
    })
    }
    if(event.target.value === "") {
      this.listaModelos = [];
    }
  }


}
