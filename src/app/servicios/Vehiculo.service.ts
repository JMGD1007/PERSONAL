import { Injectable } from '@angular/core';
import { vehiculo } from '../utilitarios/modelos/Vehiculo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

constructor(
  private http: HttpClient,
) { }
baseUrl = "https://epico.gob.ec/vehiculo/public/api/";

getVehiculos():Observable<vehiculo[]>{
  return this.http.get<Respuesta>(this.baseUrl+"vehiculos/").pipe(
    map (respuesta => {
      return respuesta.data;
    })
    );
}

/*getVehiculos(filtro:any):Observable<Array<vehiculo>>{
  const escucha: Observable<Array<vehiculo>> = new Observable(escuchando => { 
    let lista = this.listavehiculos.filter(elem => elem.marca.toLowerCase().includes (filtro));
    escuchando.next(lista);
  })
  return escucha;
}*/

/*getVehiculo(codigo:string): vehiculo | undefined{
  let vehiculo = this.listavehiculos.find(ele => ele.codigo === codigo);
  return vehiculo;
}*/

addVehiculo(vehiculo: vehiculo){
  this.listavehiculos.push(vehiculo);
}

private listavehiculos: Array<vehiculo> = [
  {"codigo": "A001", "marca": "CHEVROLET", "modelo":"ONIX-6", "color": "AZUL", "kilometraje": "50000", "precio":17000, "foto":"https://th.bing.com/th/id/OIP.EmPaXsyNiOvaTmXbapEgLAHaDy?rs=1&pid=ImgDetMain", "anio":2024, "calificacion":3},
  {"codigo": "A002", "marca": "KIA", "modelo":"RIO", "color": "AZUL", "kilometraje": "50000", "precio":17000, "foto":"https://www.grupomax.mx/wp-content/uploads/2021/10/rio-sd-22-azul3.png", "anio":2024, "calificacion":4},
  {"codigo": "A003", "marca": "CHERY", "modelo":"ARRIZO-5", "color": "AZUL", "kilometraje": "50000", "precio":17000, "foto":"https://th.bing.com/th/id/OIP.B6WWJU7kiXMiTAjsYDDJ9wHaFS?rs=1&pid=ImgDetMain", "anio":2024, "calificacion":5},
  {"codigo": "A004", "marca": "TOYOTA", "modelo":"AGYA", "color": "AZUL", "kilometraje": "50000", "precio":17000, "foto":"https://s1.cdn.autoevolution.com/images/gallery/TOYOTA-Agya-4995_13.jpg", "anio":2024, "calificacion":4},
  {"codigo": "A005", "marca": "HYUNDAI", "modelo":"ACCENT", "color": "AZUL", "kilometraje": "50000", "precio":17000, "foto":"https://th.bing.com/th/id/R.64086b95ab1443ffe710e3e5da210db4?rik=RiDTJckVAE1hLQ&pid=ImgRaw&r=0", "anio":2024, "calificacion":5},

]

}

export interface Respuesta{
  codigo: string;
  marca: string;
  modelo: string;
  mensaje: string;
  data: any;
}
