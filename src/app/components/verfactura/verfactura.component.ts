import { Component, OnInit } from '@angular/core';
import { VerfacturaService, facture } from '../../services/verfactura.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verfactura',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './verfactura.component.html',
  styleUrl: './verfactura.component.css'
})
export class VerfacturaComponent implements OnInit{
  facturas: facture[] = [];

  constructor(private verfacturaService: VerfacturaService) {}

  ngOnInit(): void {
    this.verfacturaService.getFacturas().subscribe((data: facture[]) => {
      this.facturas = data;
    });
  }
}
