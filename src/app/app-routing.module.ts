import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalTermComponent } from './rental-term/rental-term.component';
import { SelectpageimportComponent } from './selectpageimport/selectpageimport.component';
import { MarcaComponent } from './marca/marca.component';
import { VehicleModelComponent } from './import-model/import-model.component';
import { PeriodosComponent } from './periodos/periodos.component';

const routes: Routes = [
  { path: "rental-term", component: RentalTermComponent },
  { path: "gerenciar", component: SelectpageimportComponent },
  { path: "gerenciar/marcas", component: MarcaComponent },
  { path: "gerenciar/modelos", component: VehicleModelComponent },
  { path: "gerenciar/periodos", component: PeriodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
