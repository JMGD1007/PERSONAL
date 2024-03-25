import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PagListVehiculosComponent } from './paginas/PagListVehiculos/PagListVehiculos.component';
import { PagNoFoundComponent } from './paginas/PagNotFound/PagNoFound.component';
import { PagVehiculosComponent } from './paginas/PagVehiculos/PagVehiculos.component';
import { PagVehiculoRegistroComponent } from './paginas/PagVehiculoRegistro/PagVehiculoRegistro.component';
import { VehiculoDetalleComponent } from './paginas/VehiculoDetalle/VehiculoDetalle.component';
import { ClientesComponent } from './servicios/clientes/clientes.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  }, 
  {
    path: "vehiculos",
    component: PagListVehiculosComponent
  },
  {
    path: "clientes",
    component: ClientesComponent
  },
  {
    path: "vehiculo",
    component: PagVehiculoRegistroComponent
  },
  {
    path: "vehiculos/:codigo",
    component: VehiculoDetalleComponent
  },
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: PagNoFoundComponent,
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
