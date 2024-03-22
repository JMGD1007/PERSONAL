import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
      "codigo": ['', [Validators.required, validadorCodigo()]],
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
    if (this.formulario.valid){
      Swal.fire({
        title: "Mensaje",
        text: "Se grabó con éxito!",
        icon: "info"
      })
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Te faltan campos",
        icon: "info"
      })
    };

  }

}

export function validadorCodigo(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors|null =>{
    const codigoV = /^\d{4}$/;
    let value = control.value;
    if(codigoV.test(value)){
      return null;
    }
    return {'codigoValidate': true}
  }
}
