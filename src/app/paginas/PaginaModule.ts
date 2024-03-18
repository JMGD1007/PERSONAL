import { NgModule } from "@angular/core";

import { PagListVehiculosComponent } from "./PagListVehiculos/PagListVehiculos.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/UtilitariosModule";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        UtilitariosModule,
    ],
    declarations:[
        PagListVehiculosComponent,
    ],
    exports: [
        PagListVehiculosComponent,
    ],
})

export class PaginaModule{

}