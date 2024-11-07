import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface facture {
  id?: number;
  fechaEmision: string;
  fechaVencimiento: string;
  moneda: string;
  monto: number;
  tipoTasa: string;
  porcentajeTasa: number;
  capitalizacion: string;
  cliente: string;
}

@Injectable({
  providedIn: 'root'
})
export class VerfacturaService {

  private apiUrl = 'http://localhost:3000/facturas';

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<facture[]> {
    return this.http.get<facture[]>(this.apiUrl);
  }
}
