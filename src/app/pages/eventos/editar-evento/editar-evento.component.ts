import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from '../../../services/eventos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})
export class EditarEventoComponent implements OnInit {
  evento: any = {
    nombre: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    capacidad: 0,
  };

  constructor(
    private eventosService: EventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventosService.getEventoById(+id).subscribe({
        next: (data) => (this.evento = data),
        error: (err) => console.error('Error al cargar el evento', err),
      });
    }
  }

  actualizarEvento(): void {
    this.eventosService.updateEvento(this.evento.id, this.evento).subscribe({
      next: () => {
        alert('Evento actualizado con éxito');
        this.router.navigate(['/eventos']);
      },
      error: (err) => console.error('Error al actualizar el evento', err),
    });
  }

  cancelar(): void {
    this.router.navigate(['/eventos']);
  }
}
