import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../modelos/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() producto!: Product;
  @Output() agregar = new EventEmitter<Product>();

  agregarAlCarrito(): void {
    this.agregar.emit(this.producto);
  }
}