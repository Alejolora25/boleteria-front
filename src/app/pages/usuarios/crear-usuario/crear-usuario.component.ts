import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  usuario = {
    nombre: '',
    identificacion: '',
    email: '',
    password: '',
  };

  successMessage: string = ''; // Inicializar propiedad para mensajes de éxito
  errorMessage: string = '';   // Inicializar propiedad para mensajes de error

  constructor(private usuariosService: UsuariosService, private  router: Router) {}

  crearUsuario() {
    if (this.usuario.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      this.successMessage = '';
      return;
    }

    const usuarioPayload = {
      nombre: this.usuario.nombre,
      identificacion: this.usuario.identificacion,
      correo: this.usuario.email, // Mapear email a correo
      contraseña: this.usuario.password // Mapear password a contraseña
    };

    this.usuariosService.createUsuario(usuarioPayload).subscribe({
      next: (response) => {
        console.log('Usuario creado', response);
        this.successMessage = 'Usuario creado exitosamente.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/usuarios']);
        }, 2000); // Redirige después de 2 segundos
      },
      error: (error) => {
        console.error('Error al crear usuario', error);
        this.errorMessage = 'Error al crear el usuario. Verifique los datos.';
        this.successMessage = '';
      },
    });
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
