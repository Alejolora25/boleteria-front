import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBoletasComponent } from './listar-boletas/listar-boletas.component';
import { CrearBoletaComponent } from './crear-boleta/crear-boleta.component';
import { EditarBoletaComponent } from './editar-boleta/editar-boleta.component';
import { VerBoletaComponent } from './ver-boleta/ver-boleta.component';
import { authRoleGuard } from '../../guards/auth-role.guard';


const routes: Routes = [
  { 
    path: '', 
    component: ListarBoletasComponent, 
    canActivate: [authRoleGuard], 
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] } // Acceso para ADMIN y USER 
  },
  { 
    path: 'crear', 
    component: CrearBoletaComponent, 
    canActivate: [authRoleGuard], 
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] } // Solo ADMIN puede crear
  },
  { 
    path: 'editar/:id', 
    component: EditarBoletaComponent, 
    canActivate: [authRoleGuard], 
    data: { roles: ['ROLE_ADMIN'] } // Solo ADMIN puede editar
  },
  { 
    path: 'ver/:id', 
    component: VerBoletaComponent, 
    canActivate: [authRoleGuard], 
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletasRoutingModule { }
