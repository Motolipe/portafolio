import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();
   }

// forma para leer una api
  private cargarProductos() {

    return new Promise( ( resolve, rejects ) =>  {
      this.http.get('https://angular-pyme.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.producto = resp;
        this.cargando = false;
        resolve();
      });

    });

    }

  getProducto( id: string){
   return this.http.get(`https://angular-pyme.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ){
      if ( this.producto.length === 0){
        // cargar productos
        this.cargarProductos().then( () => {
          // ejecutar despues de tener los productos
          // aplicar filtro
          this.filtrarProductos( termino );
        });
      }else{
        // aplicar el filtro
        this.filtrarProductos( termino );
      }
  }
  private filtrarProductos( termino: string ){

    console.log( this.producto );
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.producto.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }
    });
  }

}
