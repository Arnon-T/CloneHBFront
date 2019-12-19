import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalTermComponent } from './rental-term/rental-term.component';

const routes: Routes = [
  { path: "rental-term", component: RentalTermComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
