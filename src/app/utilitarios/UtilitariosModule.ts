import { NgModule } from "@angular/core";
import { AEspacioPipe } from "./pipes/AEspacio.pipe";
import { CalificacionComponent } from "./componentes/calificacion/calificacion.component";


@NgModule({
    declarations: [
        AEspacioPipe,
        CalificacionComponent,
    ],
    imports: [],
    exports: [
        AEspacioPipe,
        CalificacionComponent,
    ],
})

export class UtilitariosModule{

}