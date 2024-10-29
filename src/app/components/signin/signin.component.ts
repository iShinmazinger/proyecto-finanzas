import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

export interface SignIn {
  email: string;
  contrasena: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink
  ]
})
export class SigninComponent {
  signin: SignIn = {
    email: '',
    contrasena: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  signIn() {
    this.authService.signInUser(this.signin).subscribe(
        (user) => {
          if (user === null) {
            console.error('Invalid credentials');

          }
          else if (user) {
            this.router.navigate(['/user-view']);
          }
          else {
            console.error('Invalid credentials');
          }
        },
        (error) => {
          console.error('Error signing in:', error);
        }
    );
  }
}