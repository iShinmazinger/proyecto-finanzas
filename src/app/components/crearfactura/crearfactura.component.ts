import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { facture, VerfacturaService } from '../../services/verfactura.service';
import { CrearfacturaService } from '../../services/crearfactura.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crearfactura',
  standalone: true,
  imports: [MatDatepickerModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatNativeDateModule],
  templateUrl: './crearfactura.component.html',
  styleUrl: './crearfactura.component.css'
})
export class CrearfacturaComponent {
  facturaForm: FormGroup;
  constructor(private fb: FormBuilder, private crearfacturaService: CrearfacturaService) {
    this.facturaForm = this.fb.group({
      cliente: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      moneda: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      tasa: ['', Validators.required],
      porcentajeTasa: ['', [Validators.required, Validators.min(0)]],
      capitalizacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura: facture = {
        cliente: this.facturaForm.value.cliente,
        fechaEmision: this.facturaForm.value.fechaEmision,
        fechaVencimiento: this.facturaForm.value.fechaVencimiento,
        moneda: this.facturaForm.value.moneda,
        monto: this.facturaForm.value.monto,
        tipoTasa: this.facturaForm.value.tasa, 
        porcentajeTasa: this.facturaForm.value.porcentajeTasa,
        capitalizacion: this.facturaForm.value.capitalizacion
      };
      
      this.crearfacturaService.postFactura(nuevaFactura).subscribe({
        next: (response) => {
          console.log('Factura registrada:', response);
          alert('Factura registrada con éxito');
          this.facturaForm.reset();
        },
        error: (error) => {
          console.error('Error al registrar la factura:', error);
          alert('Hubo un error al registrar la factura');
        }
      });
    }
  }
}
