import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {SigninComponent} from "./components/signin/signin.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserViewComponent} from "./components/user-view/user-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      RouterOutlet,
      ToolbarComponent,
    SigninComponent,
    RegisterComponent,
    UserViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-finanzas';
}
