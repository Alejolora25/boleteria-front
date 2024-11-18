import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBoletasComponent } from './listar-boletas/listar-boletas.component';
import { CrearBoletaComponent } from './crear-boleta/crear-boleta.component';
import { EditarBoletaComponent } from './editar-boleta/editar-boleta.component';

const routes: Routes = [
  { path: '', component: ListarBoletasComponent }, // Ruta para listar boletas
  { path: 'crear', component: CrearBoletaComponent }, // Ruta para crear boletas
  { path: 'editar/:id', component: EditarBoletaComponent }, // Ruta para editar boletas
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletasRoutingModule { }
