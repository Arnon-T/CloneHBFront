import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RentalTermComponent } from './rental-term/rental-term.component';
import { HeaderComponent } from './header/header.component';
import { SelectpageimportComponent } from './selectpageimport/selectpageimport.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcaService } from './marca/marca.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { RentalTermService } from './rental-term/rental-term.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    RentalTermComponent,
    HeaderComponent,
    SelectpageimportComponent,
    MarcaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    RentalTermService,
    MarcaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
