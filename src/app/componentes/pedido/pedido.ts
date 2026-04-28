import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito';
import { Product } from '../../modelos/product';
import { loadScript } from '@paypal/paypal-js';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class PedidoComponent implements OnInit {
  carrito: Product[] = [];
  nombre = '';
  email = '';
  direccion = '';
  pagoExitoso = false;

  constructor(
    public carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.cargarPayPal();
  }

  async cargarPayPal() {
    const paypal = await loadScript({
      clientId: 'AaPkzhTmG3d3KmHwKwQT2hSFrNZsi7av9nmWNebT04Q5EpHPHMmwPoga3_XCCPk6iPfDdg-zASkJsff8',
      currency: 'MXN'
    });

    if (paypal && paypal.Buttons) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: (this.carritoService.total * 1.16).toFixed(2),
                currency_code: 'MXN'
              },
              description: 'Compra en Mi Tienda'
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.pagoExitoso = true;
            this.carritoService.vaciar();
            this.router.navigate(['/confirmacion'], {
              queryParams: { orderId: details.id, nombre: details.payer.name.given_name }
            });
          });
        },
        onError: (err: any) => {
          console.error('Error en PayPal:', err);
          alert('Ocurrió un error con el pago. Intenta de nuevo.');
        }
      }).render('#paypal-button-container');
    }
  }
}