import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

  @Input () calificacion:number = 0;

  constructor() { }

  ngOnInit() {
    console.log('Calificacion: ', this.calificacion)
  }

}
