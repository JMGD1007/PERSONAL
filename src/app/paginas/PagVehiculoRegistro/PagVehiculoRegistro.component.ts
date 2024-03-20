import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {

  vehiculo: vehiculo
  
  constructor(
    private vehiculoServicio: VehiculoService
  ) {
    this.vehiculo = {
      codigo: '',
      marca: '',
      color: '',
      modelo: '',
      kilometraje: '',
      precio: 0,
      foto: null,
      anio: 0,
      calificacion: 0
    }
  }

  ngOnInit() {
  }

  guardar(){
    this.vehiculoServicio.addVehiculo(this.vehiculo)
    console.log("Grabado con éxito")
  }

}
