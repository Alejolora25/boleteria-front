import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {
  usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.usuariosService.getUsuarioById(id).subscribe({
      next: (data) => {
        this.usuario = { ...data, password: '' }; // No mostrar la contraseña
      },
      error: (err) => {
        console.error('Error al cargar el usuario', err);
        this.errorMessage = 'Error al cargar el usuario.';
      },
    });
  }

  actualizarUsuario(): void {
    // Validar si la contraseña tiene menos de 6 caracteres
    if (this.usuario.password.trim() !== '' && this.usuario.password.trim().length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
  
    // Crear el payload para mapear al backend
    const usuarioPayload: any = {
      id: this.usuario.id,
      nombre: this.usuario.nombre,
      correo: this.usuario.correo,
      ...(this.usuario.password.trim() !== '' && { contraseña: this.usuario.password }),
    };
  
    this.usuariosService.updateUsuario(this.usuario.id, usuarioPayload).subscribe({
      next: () => {
        this.successMessage = 'Usuario actualizado con éxito.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/usuarios']);
        }, 2000); // Redirige después de 2 segundos
      },
      error: (err) => {
        console.error('Error al actualizar el usuario', err);
        this.errorMessage = 'Error al actualizar el usuario.';
      },
    });
  }
  

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
