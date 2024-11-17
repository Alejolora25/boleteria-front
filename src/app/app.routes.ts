import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ListarBoletasComponent } from './pages/boletas/listar-boletas/listar-boletas.component';
import { CrearBoletaComponent } from './pages/boletas/crear-boleta/crear-boleta.component';
import { ListarEventosComponent } from './pages/eventos/listar-eventos/listar-eventos.component';
import { CrearEventoComponent } from './pages/eventos/crear-evento/crear-evento.component';
import { ListarUsuariosComponent } from './pages/usuarios/listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from './pages/usuarios/crear-usuario/crear-usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'boletas',
    children: [
      { path: '', component: ListarBoletasComponent },
      { path: 'crear', component: CrearBoletaComponent },
    ],
  },
  {
    path: 'eventos',
    children: [
      { path: '', component: ListarEventosComponent },
      { path: 'crear', component: CrearEventoComponent },
    ],
  },
  {
    path: 'usuarios',
    children: [
      { path: '', component: ListarUsuariosComponent },
      { path: 'crear', component: CrearUsuarioComponent },
    ],
  },
];
