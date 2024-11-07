import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Factura {
    id?: number;
    cliente: string;
    fechaEmision: string;
    fechaVencimiento: string;
    moneda: string;
    monto: number;
    tipoTasa: string;
    porcentajeTasa: number;
    capitalizacion: string;
  }

@Injectable({
  providedIn: 'root'
})
export class CrearfacturaService {
  private apiUrl = 'http://localhost:3000/facturas';

  constructor(private http: HttpClient) { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  postFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.apiUrl, factura);
  }




  registerfactura(factura: any): Observable<any> {
    return this.http.post(this.apiUrl, factura);
    }

setfactura(factura: any) {
    localStorage.setItem('factura', JSON.stringify(factura));
    }

getfactura() {
    const factura = localStorage.getItem('factura');
    return factura ? JSON.parse(factura) : null;
    }

updatefactura(factura: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${factura.id}`, factura);
    }

deletefactura(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
