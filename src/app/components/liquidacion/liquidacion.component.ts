import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liquidacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liquidacion.component.html',
  styleUrl: './liquidacion.component.css'
})
export class LiquidacionComponent implements OnInit {
  cartera: any;
  tasaEfectivaAnual: number | null = null;
  valoresNetos: any[] = [];
  tceaCartera: number = 0;
  capitalizacionFrecuencias: { [key: string]: number } = {
    'Anual': 360,
    'Semestral': 180,
    'Cuatrimestral': 120,
    'Trimestral': 90,
    'Bimestral': 60,
    'Mensual': 30,
    'Quincenal': 15,
    'Diaria': 1
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/carteras/${id}`).subscribe(data => {
      this.cartera = data;

      this.calcularTasaEfectivaAnual();
      this.calcularValoresNetosPorFactura();
    });
  }
  
  calcularTasaEfectivaAnual(): void {
    if (this.cartera && this.cartera.tasa === 'Nominal') {
      const tasaNominal = this.cartera.porcentajeTasa / 100;
      const frecuencia = this.capitalizacionFrecuencias[this.cartera.capitalizacion2]; 

      if (frecuencia) {
        this.tasaEfectivaAnual = (Math.pow(1 + tasaNominal / frecuencia, frecuencia) - 1) * 100;
      } else {
        console.error('No se encontró la frecuencia de capitalización para:', this.cartera.capitalizacion2);
        this.tasaEfectivaAnual = null;
      }
    }
  }
  calcularValoresNetosPorFactura(): void {
    if (this.cartera && this.tasaEfectivaAnual !== null) {
      const fechaLiquidacion = new Date(this.cartera.fechaLiquidacion);
      const n = 360; 
      let valorNominalTotal = 0; 
      let valorNetoTotal = 0;    
      let sumaPonderadaNd = 0;   
      let sumaValoresNominales = 0;

      this.valoresNetos = this.cartera.facturas.map((factura: any) => {
        const fechaVencimiento = new Date(factura.fechaVencimiento);
        const nd = (fechaVencimiento.getTime() - fechaLiquidacion.getTime()) / (1000 * 60 * 60 * 24); 
        const valorNominal = factura.monto;

        if (nd > 0 && valorNominal > 0) {
          
          const basePotencia = 1 + this.tasaEfectivaAnual!/100;
          const exponente = -(nd / n);
          const factorDescuento = Math.pow(basePotencia, exponente);
          const valorNeto = valorNominal * Math.pow(1 + (this.tasaEfectivaAnual!/100), -(nd / n));
          const costoTotal = valorNominal - valorNeto;

          valorNominalTotal += valorNominal;
          valorNetoTotal += valorNeto;
          sumaPonderadaNd += nd * valorNominal; 
          sumaValoresNominales += valorNominal;
          
          return {
            id: factura.id,
            cliente: factura.cliente,
            valorNeto: valorNeto,
            costoTotal: costoTotal
          };
        } else {
          console.error(`Error al calcular Valor Neto para la factura ${factura.id}`);
          return {
            id: factura.id,
            cliente: factura.cliente,
            valorNeto: null,
            costoTotal: null
          };
        }
      });
      if (valorNominalTotal > 0 && valorNetoTotal > 0 && sumaValoresNominales > 0) {
        const ndPromedio = sumaPonderadaNd / sumaValoresNominales; 
        this.tceaCartera = Math.pow(1 + (valorNominalTotal - valorNetoTotal) / valorNominalTotal, n / ndPromedio) - 1;
        this.tceaCartera=this.tceaCartera*100;
        console.log('TCEA de la cartera:', this.tceaCartera * 100); 
      } else {
        console.error('No se puede calcular la TCEA. Los valores nominales o netos son inválidos.');
      }
    }
  }
}


