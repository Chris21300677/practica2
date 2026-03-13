import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../modelos/product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private xmlUrl = 'productos.xml';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Product[]> {
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xmlStr => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlStr, 'application/xml');
        const nodos = xml.querySelectorAll('producto');
        const productos: Product[] = [];
        nodos.forEach(n => {
          productos.push({
            id: Number(n.querySelector('id')?.textContent),
            nombre: n.querySelector('nombre')?.textContent || '',
            precio: Number(n.querySelector('precio')?.textContent),
            imagen: n.querySelector('imagen')?.textContent || ''
          });
        });
        return productos;
      })
    );
  }
}