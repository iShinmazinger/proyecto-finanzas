import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserViewService } from '../../services/user-view.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  standalone: true,
  styleUrls: ['./user-view.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class UserViewComponent implements OnInit {
  user: User | null = null;

  constructor(private userViewService: UserViewService, private router: Router) {}

  ngOnInit() {
    this.user = this.userViewService.getUser();

    if (!this.user) {
      console.error('No user found');
    }
  }

  onUpdate() {
    if (this.user) {
      this.userViewService.updateUser(this.user).subscribe(response => {
        alert('Perfil actualizado con éxito');
      });
    }
  }

  onDelete() {
    if (this.user) {
      this.userViewService.deleteUser(this.user.id).subscribe(() => {
        alert('Perfil eliminado con éxito');
        this.router.navigate(['/register']);
      });
    }
  }
}