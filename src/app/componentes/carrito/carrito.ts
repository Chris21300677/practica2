import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../servicios/carrito';
import { Product } from '../../modelos/product';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {
  carrito: Product[] = [];

  constructor(public carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminar(id: number): void {
    this.carritoService.eliminar(id);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  descargarRecibo(): void {
    this.carritoService.descargarXML();
  }
}