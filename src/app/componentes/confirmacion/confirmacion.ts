import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css'
})
export class ConfirmacionComponent implements OnInit {
  orderId = '';
  nombre = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || '';
      this.nombre = params['nombre'] || 'Cliente';
    });
  }
}