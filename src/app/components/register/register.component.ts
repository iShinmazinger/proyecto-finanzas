import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {UserViewService} from "../../services/user-view.service";

export interface Register {
    usuario: string;
    email: string;
    telefono: string;
    contrasena: string;
    foto: string;

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.css'],
  imports: [
      FormsModule,
      CommonModule,
      HttpClientModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      RouterLink,
      CommonModule,
      MatButton
  ]
})
export class RegisterComponent {
  user: Register = {
    usuario: '',
    email: '',
    telefono: '',
    contrasena: '',
    foto: ''
  };

    constructor(private userViewService: UserViewService, private router: Router) {}

    register() {
        this.userViewService.registerUser(this.user).subscribe(
            () => {
                this.router.navigate(['/signin']);
            },
            (error) => {
                console.error('Error registering user:', error);
            }
        );
    }
}