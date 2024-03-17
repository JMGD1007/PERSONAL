import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { PagListVehiculosComponent } from './paginas/PagListVehiculos/PagListVehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentesComponent,
    ServiciosComponent,
    PagListVehiculosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }