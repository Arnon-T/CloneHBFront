import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MarcaComponent} from './marca/marca.component';


const routes: Routes = [
{path: "import-marca", component: MarcaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
