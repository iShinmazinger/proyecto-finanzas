import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearfacturaService {
  private apiUrl = 'http://localhost:3000/facturas';

  constructor(private http: HttpClient) { }

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
