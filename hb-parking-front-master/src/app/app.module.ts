import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportModelComponent } from './import-model/import-model.component';
import { FormsModule } from '@angular/forms';
import { ModelService } from './import-model/import-model.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ImportModelComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
