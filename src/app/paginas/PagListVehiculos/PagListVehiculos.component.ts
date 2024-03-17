import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-PagListVehiculos',
  templateUrl: './PagListVehiculos.component.html',
  styleUrls: ['./PagListVehiculos.component.css']
})
export class PagListVehiculosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public listavehiculos: Array<any> = [
    {"codigo": "A001", "marca": "CHEVROLET", "modelo":"ONIX", "color": "AZUL", "foto":null, "anio":"2024", "calificacion":3},

  ]

}
