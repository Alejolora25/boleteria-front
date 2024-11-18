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
  filtro = '';
  criterio = 'nombre'; // Por defecto, buscar por nombre
  page = 0;
  size = 5;
  totalPages = 0;
  private searchSubject = new Subject<string>();

  constructor(private boletasService: BoletasService, private router: Router) {}

  ngOnInit(): void {
    this.cargarBoletas();

    // Configurar debounce para el campo de búsqueda
    this.searchSubject.pipe(debounceTime(1000)).subscribe((valor) => {
      if (valor) {
        this.filtrarBoletas(valor);
      } else {
        this.cargarBoletas();
      }
    });
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

  filtrarBoletas(valor: string): void {
    this.page = 0; // Reiniciar a la página 0 antes de buscar
    this.boletasService.filtrarBoletas(this.criterio, valor, this.page, this.size).subscribe({
      next: (data) => {
        this.boletas = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => console.error('Error al filtrar boletas', err),
    });
  }

  onSearchInputChange(valor: string): void {
    this.filtro = valor; // Actualizar el valor del filtro
    this.searchSubject.next(valor); // Notificar al debounce
  }

  cambiarPagina(pagina: number): void {
    this.page = pagina;
    if (this.filtro) {
      // Continuar paginación con filtro aplicado
      this.boletasService.filtrarBoletas(this.criterio, this.filtro, this.page, this.size).subscribe({
        next: (data) => {
          this.boletas = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err) => console.error('Error al cargar página filtrada', err),
      });
    } else {
      // Continuar paginación sin filtro
      this.cargarBoletas();
    }
  }

  editarBoleta(id: number): void {
    this.router.navigate([`/boletas/editar`, id]);
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
}
