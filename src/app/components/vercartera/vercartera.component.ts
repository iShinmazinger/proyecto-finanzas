import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vercartera',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './vercartera.component.html',
  styleUrl: './vercartera.component.css'
})
export class VercarteraComponent implements OnInit {
  carteras: any[] = []; 

  moneda: string = 'S/';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/carteras').subscribe(data => {
      this.carteras = data;
    });
  }
  liquidarCartera(cartera: any): void {
  }
}
