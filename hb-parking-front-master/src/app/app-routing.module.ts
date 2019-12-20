import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportModelComponent } from './import-model/import-model.component';


const routes: Routes = [
  {path: "importModel", component: ImportModelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
