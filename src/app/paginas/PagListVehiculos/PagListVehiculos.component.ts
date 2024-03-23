import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo';

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
    this.vehiculoService.getVehiculos().subscribe(respuesta => {
      console.log(respuesta);
      this.listaVehiculos = respuesta;
    });
  }

  mostrar(){
    this.mostrarImagen = !this.mostrarImagen
  }

  consultaVehiculos(){
    this.vehiculoService.getVehiculos(/*this.filtro*/).subscribe(data =>{ 
      this.listaVehiculos = data;
    })
  }

  recepcion(dato:number){
    console.log('Dato:',dato)
  }

}
