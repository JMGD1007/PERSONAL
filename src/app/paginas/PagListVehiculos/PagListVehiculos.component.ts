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
    this.vehiculoService.addVehiculo({"codigo": "A005", "marca": "HYUNDAI", "modelo":"ACCENT", "color": "AZUL", "kilometraje": "50000", "precio":17000, "foto":"https://th.bing.com/th/id/R.64086b95ab1443ffe710e3e5da210db4?rik=RiDTJckVAE1hLQ&pid=ImgRaw&r=0", "anio":2024, "calificacion":5})
  }

  mostrar(){
    this.mostrarImagen = !this.mostrarImagen
  }

  recepcion(dato:number){
    console.log('Dato:',dato)
  }

}
