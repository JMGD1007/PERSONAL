import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { validadorCodigo } from '../../validaciones/VehiculoValidaciones';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {

  vehiculo?: vehiculo;
  formulario:FormGroup;

  
  constructor(
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, validadorCodigo()]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje":['', [Validators.required]],
      "precio": [],
      "calificacion":['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(param =>{
      let codigo = param ['vehiculos/:codigo'];
      this.vehiculoService.getVehiculo
    });
  }

  guardar(){
    if(this.formulario.valid){
      this.vehiculoService.insertVehiculo({...this.formulario.value}).subscribe(
        respuesta => {
          if (respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Vehículo registrado con éxito!",
              icon: "success"
            }). then(res =>{
              this.formulario.reset();
            });
          }
        }
      )
      }else{
      Swal.fire({
        title: "Mensaje",
        text: "No se pudo registrar el vehículo",
        icon: "error"
      })
    }
   
  };

}

export function validarCodigoComparativo(){
  return (formulario: FormGroup): ValidationErrors|null => {
    let valor = formulario.controls["codigo"].value;
    let valor2 = formulario.controls["codigo_confirm"].value;
    if(valor === valor2){
      return null;
    }
    return {"codigo_comparativo":true}
  }
}
export { validadorCodigo };

