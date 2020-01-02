import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModule } from './_alert';
import { MessageModule } from './_message';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { RentalTermComponent } from './rental-term/rental-term.component';
import { HeaderComponent } from './header/header.component';
import { MarcaComponent } from './marca/marca.component';
import { VehicleModelComponent } from './import-model/import-model.component';

import { RentalTermService } from './rental-term/rental-term.service';
import { MarcaService } from './marca/marca.service';
import { ModelService } from './import-model/import-model.service';
import { CadastroColaboradoresComponent } from './cadastro-colaboradores/cadastro-colaboradores.component';
import { LoginComponent } from './login/login.component';
import { LocationGarageComponent } from './location-garage/location-garage.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { httpInterceptorProvider } from './auth/auth-interceptor';
import { GlobalAuth } from './global-auth';
import { FunctionalityButtonAreaComponent } from './functionality-button-area/functionality-button-area.component';
import { FuncionalityPageComponent } from './funcionality-page/funcionality-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RentalTermComponent,
    HeaderComponent,
    MarcaComponent,
    VehicleModelComponent,
    CadastroColaboradoresComponent,
    LoginComponent,
    LocationGarageComponent,
    MainPageComponent,
    NotfoundComponent,
    FunctionalityButtonAreaComponent,
    FuncionalityPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule,
    MessageModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    RentalTermService,
    MarcaService,
    ModelService,
    httpInterceptorProvider,
    GlobalAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
