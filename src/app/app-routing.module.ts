import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalTermComponent } from './rental-term/rental-term.component';
import { SelectpageimportComponent } from './selectpageimport/selectpageimport.component';

const routes: Routes = [
  { path: "rental-term", component: RentalTermComponent },
  { path: "import", component: SelectpageimportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
