import { NgModule } from "@angular/core";

import { PagListVehiculosComponent } from "./PagListVehiculos/PagListVehiculos.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/UtilitariosModule";
import { PagVehiculosComponent } from "./PagVehiculos/PagVehiculos.component";
import { RouterModule } from "@angular/router";
import { PagVehiculoRegistroComponent } from "./PagVehiculoRegistro/PagVehiculoRegistro.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        UtilitariosModule,
        RouterModule,
    ],
    declarations:[
        PagListVehiculosComponent,
        PagVehiculosComponent,
        PagVehiculoRegistroComponent,
    ],
    exports: [
        PagListVehiculosComponent,
        PagVehiculosComponent,
        PagVehiculoRegistroComponent,
    ],
})

export class PaginaModule{

}