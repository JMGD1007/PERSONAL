import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo'; 

@Component({
  selector: 'app-PagVehiculos',
  templateUrl: './PagVehiculos.component.html',
  styleUrls: ['./PagVehiculos.component.css']
})
export class PagVehiculosComponent implements OnInit {

  vehiculo: vehiculo = {
    codigo: "001",
    marca: "CHEVROLET",
    modelo: "ONIX",
  }

  constructor() { }

  ngOnInit() {
  }

}
