import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalTermComponent } from './rental-term/rental-term.component';
import { SelectpageimportComponent } from './selectpageimport/selectpageimport.component';
import { MarcaComponent } from './marca/marca.component';

const routes: Routes = [
  { path: "rental-term", component: RentalTermComponent },
  { path: "gerenciar", component: SelectpageimportComponent },
  { path: "gerenciar/marcas", component: MarcaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
