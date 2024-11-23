import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Para *ngFor y otras directivas


@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  filtro: string = '';

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = data; // Inicializar los usuarios filtrados con todos los usuarios
      },
      error: (error) => {
        console.error('Error al obtener usuarios', error);
      },
    });
  }

  filtrarUsuarios(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(filtroLower) || usuario.correo.toLowerCase().includes(filtroLower)
    );
  }

  editarUsuario(id: number) {
    this.router.navigate([`/usuarios/editar`, id]);
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado');
          this.usuarios = this.usuarios.filter((u) => u.id !== id);
          this.filtrarUsuarios(); // Actualizar la lista de filtrados
        },
        error: (err) => {
          console.error('Error al eliminar usuario', err);
        },
      });
    }
  }
}
