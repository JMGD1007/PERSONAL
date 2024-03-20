import { Component, OnInit } from '@angular/core';
import { vehiculo } from '../../utilitarios/modelos/Vehiculo'; 
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-PagVehiculos',
  templateUrl: './PagVehiculos.component.html',
  styleUrls: ['./PagVehiculos.component.css']
})
export class PagVehiculosComponent implements OnInit {

  vehiculo?: vehiculo 

  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.vehiculo = params['vehiculos/:codigo']
    })

  }

}
