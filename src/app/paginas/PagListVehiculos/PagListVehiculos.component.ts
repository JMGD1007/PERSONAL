import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-PagListVehiculos',
  templateUrl: './PagListVehiculos.component.html',
  styleUrls: ['./PagListVehiculos.component.css']
})
export class PagListVehiculosComponent implements OnInit {
  mostrarImagen = true;
  private _filtro: string = '';

  get filtro (){
    return this._filtro
  }

  set filtro(data:string){
    this._filtro = data;
    this.consultaVehiculos;
  }

  @Input() valor:string = '';
  listaVehiculos: Array <any> = [];

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
    this.vehiculoService.getVehiculos(this.filtro).subscribe(data =>{ 
      this.listaVehiculos = data;
    })
  }

  recepcion(dato:number){
    console.log('Dato:',dato)
  }

}
