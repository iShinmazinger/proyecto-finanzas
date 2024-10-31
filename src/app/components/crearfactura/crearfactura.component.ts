import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-crearfactura',
  standalone: true,
  imports: [MatDatepickerModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatNativeDateModule],
  templateUrl: './crearfactura.component.html',
  styleUrl: './crearfactura.component.css'
})
export class CrearfacturaComponent {
  facturaForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.facturaForm = this.fb.group({
      fechaEmision: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      tasa: ['', Validators.required],
      porcentajeTasa: ['', [Validators.required, Validators.min(0)]],
      capitalizacion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.facturaForm.valid) {
      console.log('Formulario enviado:', this.facturaForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
