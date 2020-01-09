import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { RentalTermComponent } from './rental-term/rental-term.component';
import { FuncionalityPageComponent } from './funcionality-page/funcionality-page.component';
import { MarcaComponent } from './marca/marca.component';
import { VehicleModelComponent } from './import-model/import-model.component';
import { CadastroColaboradoresComponent } from './cadastro-colaboradores/cadastro-colaboradores.component';
import { LoginComponent } from './login/login.component';
import { LocationGarageComponent } from './location-garage/location-garage.component';
import { InformacoesLocatarioComponent } from './informacoes-locatario/informacoes-locatario.component';
import { AprovaPageComponent } from './aprova-page/aprova-page.component';
import { ProfileComponent } from './profile/profile.component';
import { CadastroVagaInfoComponent } from './cadastro-vaga-info/cadastro-vaga-info.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "termo-locacao", component: RentalTermComponent },
  { path: "gerenciar", component: FuncionalityPageComponent },
  { path: "gerenciar/marcas", component: MarcaComponent },
  { path: "gerenciar/modelos", component: VehicleModelComponent },
  { path: "gerenciar/colaboradores", component: CadastroColaboradoresComponent },
  { path: "gerenciar/locatarios", component: InformacoesLocatarioComponent },
  { path: "gerenciar/aprovacao", component: AprovaPageComponent },
  { path: "gerenciar/info-vaga", component: CadastroVagaInfoComponent },
  { path: "login", component: LoginComponent },
  { path: "locacao-vaga", component: LocationGarageComponent },
  { path: "perfil", component: ProfileComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
