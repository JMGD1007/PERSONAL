import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService} from '../../servicios/Vehiculo.service';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-VehiculoDetalle',
  templateUrl: './VehiculoDetalle.component.html',
  styleUrls: ['./VehiculoDetalle.component.css']
})

export class VehiculoDetalleComponent implements OnInit {

  vehiculo?: vehiculo;
  formulario: FormGroup;

  constructor(private activedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      "codigo": [],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje":['', [Validators.required]],
      "precio": [],
      "calificacion":['', [Validators.required]],
    });
    this.formulario.controls['codigo'].disable();
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        if(data.codigo == '1'){
          this.vehiculo = data.data
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo)
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca)
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo)
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio)
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje)
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio)
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion)
        }else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la informacion",
            icon: "error"
          }). then(res =>{
            this.formulario.reset();
          });
        }

      })
    });
  }
  

  guardar(){
    if(this.formulario.valid){
      this.vehiculoService.actualizarVehiculo({...this.formulario.value}, this.formulario.controls['codigo'].value).subscribe(data =>{
        if(data.codigo == '1'){
          Swal.fire({
            title: "Mensaje",
            text: "Vehículo actualizado con éxito!",
            icon: "info"
          });
        }
      });
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Faltan llenar campos",
        icon: "error"
      });
    }
  }


}