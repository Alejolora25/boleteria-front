import { Component, OnInit } from '@angular/core';
import { BoletasService } from '../../../services/boletas.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Para *ngFor y otras directivas
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-listar-boletas',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './listar-boletas.component.html',
  styleUrl: './listar-boletas.component.css'
})
export class ListarBoletasComponent implements OnInit {
  boletas: any[] = [];
  vendedores: any[] = []; // Lista de vendedores
  filtro = '';
  criterio = 'nombre'; // Por defecto, buscar por nombre
  vendedorSeleccionado: string = ''; // Vendedor seleccionado
  page = 0;
  size = 20;
  totalPages = 0;
  esAdmin = false; // Nueva bandera para controlar acceso al botón Editar
  private searchSubject = new Subject<string>();

  constructor(private boletasService: BoletasService, private router: Router) {}

  ngOnInit(): void {
    this.verificarRol(); // Verificar si el usuario es admin
    this.cargarBoletas();
    this.cargarVendedores(); // Cargar la lista de vendedores

    // Configurar debounce para el campo de búsqueda
    this.searchSubject.pipe(debounceTime(1000)).subscribe((valor) => {
      this.aplicarFiltros();
    });
  }

  verificarRol(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.esAdmin = payload.roles.includes('ROLE_ADMIN');
    }
  }

  cargarBoletas(): void {
    this.boletasService.obtenerBoletasPaginadas(this.page, this.size).subscribe({
      next: (data) => {
        this.boletas = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => console.error('Error al cargar boletas', err),
    });
  }

  cargarVendedores(): void {
    this.boletasService.obtenerVendedores().subscribe({
      next: (data) => {
        this.vendedores = data; // Cargar los vendedores
      },
      error: (err) => console.error('Error al cargar vendedores', err),
    });
  }

  aplicarFiltros(): void {
    if (this.vendedorSeleccionado) {
      // Filtrar por vendedor y criterio
      this.boletasService
        .filtrarBoletasPorVendedorYCampo(
          this.vendedorSeleccionado,
          this.criterio,
          this.filtro,
          this.page,
          this.size
        )
        .subscribe({
          next: (data) => {
            this.boletas = data.content;
            this.totalPages = data.totalPages;
          },
          error: (err) => console.error('Error al filtrar boletas', err),
        });
    } else {
      // Solo filtrar por criterio
      this.boletasService
        .filtrarBoletas(this.criterio, this.filtro, this.page, this.size)
        .subscribe({
          next: (data) => {
            this.boletas = data.content;
            this.totalPages = data.totalPages;
          },
          error: (err) => console.error('Error al filtrar boletas', err),
        });
    }
  }

  onSearchInputChange(valor: string): void {
    this.filtro = valor; // Actualizar el valor del filtro
    this.searchSubject.next(valor); // Notificar al debounce
  }

  cambiarPagina(pagina: number): void {
    this.page = pagina;
    this.aplicarFiltros();
  }

  editarBoleta(id: number): void {
    if (this.esAdmin) {
      this.router.navigate([`/boletas/editar`, id]);
    } else {
      alert('Acceso denegado. Solo los administradores pueden editar boletas.');
    }
  }

  eliminarBoleta(id: number): void {
    if (confirm('¿Está seguro de eliminar esta boleta?')) {
      this.boletasService.eliminarBoleta(id).subscribe({
        next: () => {
          alert('Boleta eliminada');
          this.cargarBoletas();
        },
        error: (err) => console.error('Error al eliminar boleta', err),
      });
    }
  }

  verBoleta(id: number): void {
    this.router.navigate([`/boletas/ver`, id]);
  }
  
}
