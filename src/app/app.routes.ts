import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authRoleGuard } from './guards/auth-role.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'boletas',
    loadChildren: () =>
      import('./pages/boletas/boletas.module').then((m) => m.BoletasModule),
    canActivate: [authRoleGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }, // Acceso para ADMIN y USER
  },
  {
    path: 'eventos',
    loadChildren: () =>
      import('./pages/eventos/eventos.module').then((m) => m.EventosModule),
    canActivate: [authRoleGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }, // Acceso para ADMIN y USER
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canActivate: [authRoleGuard],
    data: { roles: ['ROLE_ADMIN'] }, // Solo accesible para ADMIN
  },
];
