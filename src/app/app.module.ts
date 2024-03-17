import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaAutosComponent } from './Lista-Autos/Lista-Autos.component';
import { PaginasComponent } from './paginas/paginas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ComponentesComponent } from './componentes/componentes.component';

@NgModule({
  declarations: [				
    AppComponent,
      ListaAutosComponent,
      PaginasComponent,
      ServiciosComponent,
      ComponentesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
