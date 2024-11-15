import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponentComponent } from '../confirm-dialog-component/confirm-dialog-component.component';

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
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/carteras').subscribe(data => {
      this.carteras = data;
    });
  }
  liquidarCartera(cartera: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
      data: {
        message: '¿Estás seguro que deseas liquidar esta cartera?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/liquidacion', cartera.id]);
      }
    });
  }
}

