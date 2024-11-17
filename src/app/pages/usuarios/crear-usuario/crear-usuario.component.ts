import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  usuario = {
    nombre: '',
    email: '',
    contraseña: '',
  };

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  crearUsuario() {
    this.usuariosService.createUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado', response);
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al crear usuario', error);
      },
      complete: () => {
        console.log('Creación de usuario completada');
      },
    });
  }
}
