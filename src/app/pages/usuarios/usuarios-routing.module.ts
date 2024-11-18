import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component'; // Importar el componente
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component'; // Importar el componente
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component'; // Importar el componente


const routes: Routes = [
  { path: '', component: ListarUsuariosComponent }, // Ruta para listar usuarios
  { path: 'crear', component: CrearUsuarioComponent }, // Ruta para crear usuario
  { path: 'editar/:id', component: EditarUsuarioComponent }, // Ruta para editar usuario
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
