import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MarcaService } from '../marca/marca.service';
import { LocationGarageService } from "./location-garage.service"

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

  constructor(private marcaService: MarcaService, private locationGarageService: LocationGarageService) {

   }

  ngOnInit() {
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
    }else {
      this.vehicleHasOption = false;
    }
  }

  searchMarca(tipo) {
    if (!this.vehicleHasOption) {
      this.marcaService.selectMarcas(this.tipo).subscribe((dados: any) => {
        this.listaMarcas = dados.content;
        
      console.log("Testando",this.listaMarcas);
      });
    } 
  }

  alterarMarca(marcaOption){
    this.selectedMarca = marcaOption.selectedIndex
  }

  searchModelo(event){
        this.locationGarageService.getNomeModelo(event.target.value, this.selectedMarca+1).subscribe(data => {
            for(let i = 0; i < data.length; i++){
              console.log(data[i])
            }
        })
  }


}
