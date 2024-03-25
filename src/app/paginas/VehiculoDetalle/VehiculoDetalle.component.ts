import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService} from '../../servicios/Vehiculo.service';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';
import { validadorCodigo } from '../PagVehiculoRegistro/PagVehiculoRegistro.component';


@Component({
  selector: 'app-VehiculoDetalle',
  templateUrl: './VehiculoDetalle.component.html',
  styleUrls: ['./VehiculoDetalle.component.css']
})

export class VehiculoDetalleComponent implements OnInit {

  vehiculo?: vehiculo;
  formulario: FormData = new FormData();
  formData: any;

  constructor(
    private vehiculoService: VehiculoService,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        if (data.codigo == '1') {
          this.vehiculo = data.data;
          if (this.vehiculo) {
            this.formData.append('codigo', this.vehiculo.codigo);
            this.formData.append('marca', this.vehiculo.marca);
            this.formData.append('modelo', this.vehiculo.modelo);
            this.formData.append('anio', this.vehiculo.anio);
            this.formData.append('kilometraje', this.vehiculo.kilometraje);
            this.formData.append('precio', this.vehiculo.precio);
            this.formData.append('calificacion', this.vehiculo.calificacion);
          }
        }else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la informacion",
            icon: "error"
          }). then(res =>{
            this.formData = new FormData();
          });
        }

      })
    });
  }
  

  guardar() {
    if (this.formData && this.formData.get('codigo')) {
      this.vehiculoService.actualizarVehiculo(this.formData, this.formData.get('codigo').toString()).subscribe(data => {
        if (data.codigo == '1') {
          Swal.fire({
            title: "Mensaje",
            text: "Vehículo actualizado con éxito!",
            icon: "info"
          });
        }
      });
    } else {
      Swal.fire({
        title: "Mensaje",
        text: "El código del vehículo no está presente en el formulario",
        icon: "error"
      });
    }
  }
  
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