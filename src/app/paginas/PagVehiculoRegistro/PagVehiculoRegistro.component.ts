import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {

  vehiculo?: vehiculo
  formulario:FormGroup;

  
  constructor(
    private vehiculoServicio: VehiculoService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": [],
      "marca": [],
      "modelo": [],
      "anio": [],
      "color": [],
      "kilometraje":[],
      "precio": [],
      "calificacion":[],
    });
  }

  ngOnInit() {
  }

  guardar(){
    let vehiculo:vehiculo = (this.formulario.value);
    this.vehiculoServicio.addVehiculo(vehiculo);
    console.log("Formulario", this.formulario.value);
  }

}
