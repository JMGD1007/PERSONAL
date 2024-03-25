import { Component, NgModule, OnInit } from '@angular/core';
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
  codigo: string = ''; 
  marca: string = ''; 
  modelo: string = '';
  anio: number = 0;
  kilometraje: string = '';
  precio: number = 0;
  calificacion: number = 0;


  constructor(
    private vehiculoService: VehiculoService,
    private activedRoute: ActivatedRoute,
  ) {  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        if (data.codigo == '1') {
          this.vehiculo = data.data;
          if (this.vehiculo) {
            this.codigo = this.vehiculo.codigo;
            this.marca = this.vehiculo.marca;
            this.modelo = this.vehiculo.modelo;
            this.anio = this.vehiculo.anio;
            this.kilometraje = this.vehiculo.kilometraje;
            this.precio = this.vehiculo.precio;
            this.calificacion = this.vehiculo.calificacion;
          }
        } else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la informacion",
            icon: "error"
          })
        }

      })
    });
  }
  

  guardar() {
    if (this.vehiculo && this.codigo) {
      const datosVehiculo = {
        codigo: this.codigo,
        marca: this.marca,
        modelo: this.modelo,
        anio: this.anio,
        kilometraje: this.kilometraje,
        precio: this.precio,
        calificacion: this.calificacion
      };
  
      this.vehiculoService.actualizarVehiculo(this.vehiculo, this.codigo).subscribe(data => {
        console.log('Respuesta del servicio de actualización:', data);
        if (data.codigo == '1') {
          this.vehiculo = datosVehiculo;
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
              text: "Falta llenar campos",
              icon: "error"
            });
          }
  }
  
}