import { NgModule } from "@angular/core";

import { PagListVehiculosComponent } from "./PagListVehiculos/PagListVehiculos.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports:[
        CommonModule
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