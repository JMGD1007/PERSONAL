import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaModule } from './paginas/PaginaModule';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserInterceptorService } from './interceptores/UserInterceptor.service';
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './servicios/clientes/clientes.component';
import { VehiculoDetalleComponent } from './paginas/VehiculoDetalle/VehiculoDetalle.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    VehiculoDetalleComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginaModule,
    HttpClientModule,
    FormsModule,
  ],
  /*providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi:true}
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }