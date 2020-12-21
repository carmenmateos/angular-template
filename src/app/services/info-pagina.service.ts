import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
//declaro la propiedad equipo
  equipo: any[]=[];

  constructor(private http:HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();

    // //Leer el archivo Json
    // this.http.get('assets/data/data-pagina.json')
    // .subscribe( (resp:InfoPagina) => {

    //   this.cargada = true;
    //   this.info = resp;
      
    
    // });
  }
  private cargarInfo () {


    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp:InfoPagina) => {

      this.cargada = true;
      this.info = resp;
    
    });  
    
  }


  private cargarEquipo () {

    console.log('Servicio de infoPagina listo');

    //Leer el archivo Json
    this.http.get('https://angular-basic-430ce-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp:any[]) => {

    this.equipo =resp;
    console.log (resp);

    console.log(this.equipo);

    console.log('carga equipo');
    
    });  
    
  }
}
