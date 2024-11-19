import { Component, OnInit  } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Para *ngFor y otras directivas
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.css'
})
export class ListarEventosComponent implements OnInit {
  eventos: any[] = [];
  eventosFiltrados: any[] = [];
  filtro: string = '';

  constructor(private eventosService: EventosService, private router: Router) {}

  ngOnInit(): void {
    this.eventosService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.eventosFiltrados = data; // Inicializar eventos filtrados con todos los eventos
      },
      error: (error) => {
        console.error('Error al obtener eventos', error);
      },
    });
  }

  filtrarEventos(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.eventosFiltrados = this.eventos.filter(
      (evento) =>
        evento.nombre.toLowerCase().includes(filtroLower) ||
        evento.descripcion.toLowerCase().includes(filtroLower)
    );
  }

  editarEvento(id: number): void {
    this.router.navigate([`/eventos/editar`, id]);
  }

  eliminarEvento(id: number): void {
    if (confirm('¿Está seguro de eliminar este evento?')) {
      this.eventosService.deleteEvento(id).subscribe({
        next: () => {
          alert('Evento eliminado correctamente');
          this.eventos = this.eventos.filter((evento) => evento.id !== id);
          this.filtrarEventos(); // Actualizar la lista de eventos filtrados
        },
        error: (err) => {
          if (err.status === 409) {
            alert(err.error); // Mostrar el mensaje de error enviado desde el backend
          } else {
            alert('Ocurrió un error al eliminar el evento.');
          }
          console.error('Error al eliminar evento', err);
        },
      });
    }
  }
}