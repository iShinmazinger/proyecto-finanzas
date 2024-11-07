import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import {UserViewComponent} from "./components/user-view/user-view.component";
import { CrearfacturaComponent } from './components/crearfactura/crearfactura.component';
import { CrearletraComponent } from './components/crearletra/crearletra.component';
import { VerfacturaComponent } from './components/verfactura/verfactura.component';
import { VerletraComponent } from './components/verletra/verletra.component';
import { CrearcarteraComponent } from './components/crearcartera/crearcartera.component';
import { VercarteraComponent } from './components/vercartera/vercartera.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'crearfactura', component: CrearfacturaComponent},
  { path: 'crearcartera', component: CrearcarteraComponent},
  { path: 'vercartera', component: VercarteraComponent},
  { path: 'crearletra', component: CrearletraComponent},
  { path: 'verfactura', component: VerfacturaComponent},
  { path: 'verletra', component: VerletraComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
