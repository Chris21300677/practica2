import { Routes } from '@angular/router';
import { CatalogoComponent } from './componentes/catalogo/catalogo';
import { CarritoComponent } from './componentes/carrito/carrito';
import { PedidoComponent } from './componentes/pedido/pedido';
import { ConfirmacionComponent } from './componentes/confirmacion/confirmacion';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'confirmacion', component: ConfirmacionComponent }
];