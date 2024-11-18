import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'boletas',
    loadChildren: () =>
      import('./pages/boletas/boletas.module').then((m) => m.BoletasModule),
  },
  {
    path: 'eventos',
    loadChildren: () =>
      import('./pages/eventos/eventos.module').then((m) => m.EventosModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
];
