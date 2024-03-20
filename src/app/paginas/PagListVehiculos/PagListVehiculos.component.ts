import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';

@Component({
  selector: 'app-PagListVehiculos',
  templateUrl: './PagListVehiculos.component.html',
  styleUrls: ['./PagListVehiculos.component.css']
})
export class PagListVehiculosComponent implements OnInit {
  mostrarImagen = true;
  filtro: string= ""; 

  @Input() valor:string = '';
  listaVehiculos: Array <any> = [];


  constructor(
    private vehiculoService: VehiculoService
  ) { 
    
  }

  ngOnInit() {
    this.listaVehiculos = this.vehiculoService.getVehiculos();
  }

  mostrar(){
    this.mostrarImagen = !this.mostrarImagen
  }

  recepcion(dato:number){
    console.log('Dato:',dato)
  }

}
