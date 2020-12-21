import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //flag when inicialized the constructor of my class charged my products
  cargando=true;

  productos : Producto[] = [];
  productosFiltrado: Producto[]=[];


  constructor( private http:HttpClient) { 

    this.cargarProductos();


  }

  private cargarProductos () {
    //promise 
    return new Promise((resolve, reject) => {
      this.http.get ('https://angular-basic-430ce-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[])=>{

      console.log(resp);
//when have the products init = false
      
      this.productos = resp; 
        this.cargando = false;
        resolve();


    });
  }); 
    
}

getProducto (id:string){

 return this.http.get (`https://angular-basic-430ce-default-rtdb.firebaseio.com/productos/${id}.json`);

}

buscarProducto (termino:string) {

if (this.productos.length===0){
//load productos
this.cargarProductos().then( () => {
//exe after to have productos
this.filtrarProductos(termino);
});
} else {
  //applied filter
  this.filtrarProductos(termino);
}

  // this.productosFiltrado= this.productos.filter (producto => {
    
  //   return true;
  // });

  // console.log(this.productosFiltrado);
}

private filtrarProductos ( termino:string) {
//console.log(this.productos);

this.productosFiltrado=[];

termino = termino.toLocaleLowerCase();

this.productos.forEach(prod => {
const tituloLower = prod.titulo.toLocaleLowerCase();
  if (prod.categoria.indexOf(termino)>= 0 || tituloLower.indexOf(termino)>=0) {
     this.productosFiltrado.push(prod);
    }
  });
}

}
