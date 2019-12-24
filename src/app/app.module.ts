import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModule } from './_alert';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { RentalTermComponent } from './rental-term/rental-term.component';
import { HeaderComponent } from './header/header.component';
import { SelectpageimportComponent } from './selectpageimport/selectpageimport.component';
import { MarcaComponent } from './marca/marca.component';
import { VehicleModelComponent } from './import-model/import-model.component';

import { RentalTermService } from './rental-term/rental-term.service';
import { MarcaService } from './marca/marca.service';
import { ModelService } from './import-model/import-model.service';


@NgModule({
  declarations: [
    AppComponent,
    RentalTermComponent,
    HeaderComponent,
    SelectpageimportComponent,
    MarcaComponent,
    VehicleModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AlertModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    RentalTermService,
    MarcaService,
    ModelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
