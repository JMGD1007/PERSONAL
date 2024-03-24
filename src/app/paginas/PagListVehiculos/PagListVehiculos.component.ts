import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagListVehiculos',
  templateUrl: './PagListVehiculos.component.html',
  styleUrls: ['./PagListVehiculos.component.css']
})
export class PagListVehiculosComponent implements OnInit {
  public mostrarImagen = true;
  public listaVehiculos: Array<vehiculo> = []
  private _filtro: string = '';

  get filtro (){
    return this._filtro
  }

  set filtro(_data:string){
    //this._filtro = this.filtro;
    this.consultaVehiculos;
  }

  constructor(
    private vehiculoService: VehiculoService,
  ) { 
    
  }

  ngOnInit() {
    this.consultaVehiculos();
  }

  mostrar(){
    this.mostrarImagen = !this.mostrarImagen
  }

  consultaVehiculos(){
    this.vehiculoService.getVehiculos().subscribe(respuesta => {
      console.log(respuesta);
      this.listaVehiculos = respuesta;
    });
  }

  recepcion(dato:number){
    console.log('Dato:',dato)
  }

  eliminar(codigo:string){
    Swal.fire({
      title: "Estás seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `No`,
      icon: "question", 
    }).then((res)=>{
      if(res.isConfirmed){
        this.vehiculoService.eliminarVehiculo(codigo).subscribe(data => {
          if(data.codigo == '1')
          this.consultaVehiculos();
          Swal.fire({
            title: "Mensaje",
            text: "Vehiculo eliminado con éxito",
            icon: "success"
          })
            
        });
      }

    })
  }


}
