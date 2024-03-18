import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-PagListVehiculos',
  templateUrl: './PagListVehiculos.component.html',
  styleUrls: ['./PagListVehiculos.component.css']
})
export class PagListVehiculosComponent implements OnInit {
  mostrarImagen = true;
  filtro: string= ""; 

  @Input() valor:string = '';


  constructor() { }

  ngOnInit() {
  }

  mostrar(){
    this.mostrarImagen = !this.mostrarImagen
  }

  public listavehiculos: Array<any> = [
    {"codigo": "A001", "marca": "CHEVROLET", "modelo":"ONIX", "color": "AZUL", "kilometraje": "50000", "precio":"17000", "foto":"https://th.bing.com/th/id/OIP.EmPaXsyNiOvaTmXbapEgLAHaDy?rs=1&pid=ImgDetMain", "anio":"2024", "calificacion":3},
    {"codigo": "A002", "marca": "KIA", "modelo":"RIO", "color": "AZUL", "kilometraje": "50000", "precio":"17000", "foto":"https://www.grupomax.mx/wp-content/uploads/2021/10/rio-sd-22-azul3.png", "anio":"2024", "calificacion":4},
    {"codigo": "A003", "marca": "CHERY", "modelo":"ARRIZO 5", "color": "AZUL", "kilometraje": "50000", "precio":"17000", "foto":"https://th.bing.com/th/id/OIP.B6WWJU7kiXMiTAjsYDDJ9wHaFS?rs=1&pid=ImgDetMain", "anio":"2024", "calificacion":5},
    {"codigo": "A004", "marca": "TOYOTA", "modelo":"AGYA", "color": "AZUL", "kilometraje": "50000", "precio":"17000", "foto":"https://s1.cdn.autoevolution.com/images/gallery/TOYOTA-Agya-4995_13.jpg", "anio":"2024", "calificacion":4},
    {"codigo": "A005", "marca": "HYUNDAI", "modelo":"ACCENT", "color": "AZUL", "kilometraje": "50000", "precio":"17000", "foto":"https://th.bing.com/th/id/R.64086b95ab1443ffe710e3e5da210db4?rik=RiDTJckVAE1hLQ&pid=ImgRaw&r=0", "anio":"2024", "calificacion":5},

  ]

}
