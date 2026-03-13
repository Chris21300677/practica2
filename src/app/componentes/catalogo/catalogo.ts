import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../servicios/products';
import { CarritoService } from '../../servicios/carrito';
import { Product } from '../../modelos/product';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  productos: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.productsService.getProductos().subscribe(p => this.productos = p);
  }

  agregarAlCarrito(producto: Product): void {
    this.carritoService.agregar(producto);
    alert(`${producto.nombre} agregado al carrito ✓`);
  }
}
