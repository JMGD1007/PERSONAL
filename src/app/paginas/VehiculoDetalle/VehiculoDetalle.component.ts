import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { validadorCodigo, validarCodigoComparativo } from '../PagVehiculoRegistro/PagVehiculoRegistro.component';
import Swal from 'sweetalert2';

/*@Component({
  selector: 'app-VehiculoDetalle',
  templateUrl: './VehiculoDetalle.component.html',
  styleUrls: ['./VehiculoDetalle.component.css']
})
export class VehiculoDetalleComponent implements OnInit {

  vehiculo?: vehiculo;
  formulario:FormGroup;

  constructor(
    private activedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
  ) {
    this.formulario = this.formBuilder.group({
      "password": ['', [Validators.required]],
      "password_confirm": ['', [Validators.required]],
      "cedula": ['', [Validators.required, validarCedula()]],
    },{
      validators: paswordMatchValidator()
    });
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        this.vehiculo = data;
        Swal.fire({
          title: "Mensaje de alerta",
          text: "Carga existosa",
          icon: "info"
        })
      })
    });
  }
  
  imprimir(){
    console.log('Formulario: ', this.formulario);
    let password = this.formulario.get('password');
    let nuevosValidadores = [Validators.required, Validators.email];
    if(password){
      password.setValidators(nuevosValidadores);
      password.updateValueAndValidity();
    }
    if (this.formulario.valid){}

  }

  /*export function passwordMatchValidator() {
    return (control:FormGroup): ValidationErrors| null => (
      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get(passwordConfirm);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
    )
    
  }
}*/
