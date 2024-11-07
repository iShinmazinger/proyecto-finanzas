import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteraService } from '../../services/cartera.service';
import { facture, VerfacturaService } from '../../services/verfactura.service';
import { CrearfacturaService } from '../../services/crearfactura.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crearcartera',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatDatepickerModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatNativeDateModule],
  templateUrl: './crearcartera.component.html',
  styleUrl: './crearcartera.component.css'
})
export class CrearcarteraComponent implements OnInit {
  carteraForm: FormGroup;
  facturas: facture[] = [];
  fechaLiquidacion: string = '';
  tipoMoneda: string = '';
  facturasFiltradas: any[] = [];
  carteras: any[] = [];

  constructor(
    private fb: FormBuilder,
    private carteraService: CarteraService,
    private verfacturaService: VerfacturaService,
    private http: HttpClient
  ) {
    this.carteraForm = this.fb.group({
      nombreCartera: ['', Validators.required],
      moneda: ['', Validators.required],
      fechaLiquidacion: ['', Validators.required],
      banco: ['', Validators.required],
      tasaDescuento: [0, [Validators.required, Validators.min(0)]],
      facturas: [[], Validators.required]
    });
    
    this.http.get<any[]>('http://localhost:3000/facturas').subscribe(data => {
      this.facturas = data;
      this.facturasFiltradas = data;  
      this.filtrarPorCartera();
    });

    this.http.get<any[]>('http://localhost:3000/carteras').subscribe(data => {
      this.carteras = data;
      this.filtrarPorCartera();
    });

  }
  ngOnInit(): void {
    const facturasRequest = this.http.get<any[]>('http://localhost:3000/facturas').toPromise();
    const carterasRequest = this.http.get<any[]>('http://localhost:3000/carteras').toPromise();

    Promise.all([facturasRequest, carterasRequest]).then(([facturasData, carterasData]) => {
      this.facturas = facturasData || []; 
      this.carteras = carterasData || []; 
      
      this.filtrarPorCartera();

      // Filtrar las facturas según la moneda
      this.onMonedaChange({ value: this.carteraForm.get('moneda')?.value });

      // Filtrar las facturas según la fecha de liquidación
      const fechaLiquidacion = new Date(this.carteraForm.get('fechaLiquidacion')?.value);
      this.onFechaChange({ value: fechaLiquidacion });
    });
  }
  onMonedaChange(event: any): void {
    const monedaSeleccionada = event.value;
    this.facturasFiltradas = this.facturas.filter(factura => 
      factura.moneda === monedaSeleccionada
    );
    this.filtrarPorCartera();
  }
  onFechaChange(event: any): void {
    const fechaSeleccionada = event.value; 
  this.facturasFiltradas = this.facturas.filter(factura =>
    new Date(factura.fechaVencimiento) >= new Date(fechaSeleccionada) 
  );
  this.filtrarPorCartera();
  }
  
  filtrarPorCartera(): void {
    const facturasEnCarteras = new Set<string>(); 

  this.carteras.forEach(cartera => {
    cartera.facturas.forEach((factura: { id: string; }) => { 
      facturasEnCarteras.add(factura.id); 
    });
  });

  // Filtrar las facturas que no están en ninguna cartera
  this.facturasFiltradas = this.facturasFiltradas.filter(factura =>
    !facturasEnCarteras.has(factura.id) 
  );
  }

  
  onSubmit(): void {
    if (this.carteraForm.valid) {
      const nuevaCartera = this.carteraForm.value;

      this.carteraService.createCartera(nuevaCartera).subscribe(response => {
        console.log('Cartera creada con éxito:', response);
        alert('Cartera creada con éxito');
        this.carteraForm.reset();
      }, error => {
        console.error('Error al crear la cartera:', error);
        alert('Hubo un error al crear la cartera');
      });
    }
  }

}
