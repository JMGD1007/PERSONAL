import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PagListVehiculosComponent } from './paginas/PagListVehiculos/PagListVehiculos.component';
import { PagNoFoundComponent } from './paginas/PagNotFound/PagNoFound.component';
import { PagVehiculosComponent } from './paginas/PagVehiculos/PagVehiculos.component';

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
    path: "vehiculos/:codigo",
    component: PagVehiculosComponent
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
