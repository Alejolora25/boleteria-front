import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../../../services/eventos.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  evento = {
    nombre: '',
    descripcion: '',
    fecha: '',
  };

  constructor(private eventosService: EventosService, private router: Router) {}

  crearEvento() {
    this.eventosService.createEvento(this.evento).subscribe({
      next: (response) => {
        console.log('Evento creado', response);
        this.router.navigate(['/eventos']);
      },
      error: (error) => {
        console.error('Error al crear evento', error);
      },
      complete: () => {
        console.log('Creación de evento completada');
      },
    });
  }
}
