import { NgModule } from "@angular/core";

import { PagListVehiculosComponent } from "./PagListVehiculos/PagListVehiculos.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
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