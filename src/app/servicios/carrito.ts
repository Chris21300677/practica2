import { Injectable } from '@angular/core';
import { Product } from '../modelos/product';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carrito: Product[] = [];

  agregar(producto: Product): void {
    const existe = this.carrito.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad = (existe.cantidad || 1) + 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  obtenerCarrito(): Product[] {
    return this.carrito;
  }

  eliminar(id: number): void {
    this.carrito = this.carrito.filter(p => p.id !== id);
  }

  vaciar(): void {
    this.carrito = [];
  }

  get total(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio * (p.cantidad || 1), 0);
  }

  descargarXML(): void {
    const iva = this.total * 0.16;
    const totalConIva = this.total + iva;
    const fecha = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;
    xml += `  <factura>\n`;
    xml += `    <Encabezado>\n`;
    xml += `      <Emisor>\n`;
    xml += `        <Nombre>Mi Tienda SA de CV</Nombre>\n`;
    xml += `        <RFC>MITI123456ABC</RFC>\n`;
    xml += `        <Domicilio>Av. Principal 100</Domicilio>\n`;
    xml += `      </Emisor>\n`;
    xml += `      <Fecha>${fecha}</Fecha>\n`;
    xml += `    </Encabezado>\n`;
    xml += `    <Detalles>\n`;

    this.carrito.forEach(p => {
      xml += `      <producto>\n`;
      xml += `        <id>${p.id}</id>\n`;
      xml += `        <nombre>${p.nombre}</nombre>\n`;
      xml += `        <precio>${p.precio}</precio>\n`;
      xml += `        <cantidad>${p.cantidad || 1}</cantidad>\n`;
      xml += `        <subtotal>${p.precio * (p.cantidad || 1)}</subtotal>\n`;
      xml += `      </producto>\n`;
    });

    xml += `    </Detalles>\n`;
    xml += `    <Totales>\n`;
    xml += `      <subtotal>${this.total.toFixed(2)}</subtotal>\n`;
    xml += `      <iva>${iva.toFixed(2)}</iva>\n`;
    xml += `      <total>${totalConIva.toFixed(2)}</total>\n`;
    xml += `    </Totales>\n`;
    xml += `  </factura>\n</recibo>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    a.click();
    URL.revokeObjectURL(url);
  }
}
