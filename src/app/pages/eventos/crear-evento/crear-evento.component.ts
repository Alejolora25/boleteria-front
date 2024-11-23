import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../../../services/eventos.service';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  evento = {
    nombre: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    capacidad: 0,
  };

  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(private eventosService: EventosService, private router: Router) {}

  crearEvento() {
    if (!this.validarFormulario()) {
      return;
    }

    this.eventosService.createEvento(this.evento).subscribe({
      next: (response) => {
        console.log('Evento creado', response);
        this.successMessage = 'Evento creado exitosamente.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/eventos']);
        }, 2000); // Redirige después de 2 segundos
      },
      error: (error) => {
        console.error('Error al crear evento', error);
        this.errorMessage = 'Error al crear el evento. Verifique los datos.';
        this.successMessage = '';
      },
    });
  }

  cancelar() {
    this.router.navigate(['/eventos']);
  }

  private validarFormulario(): boolean {
    if (!this.evento.nombre.trim() || !this.evento.descripcion.trim() || !this.evento.fecha || !this.evento.lugar.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
      return false;
    }

    if (this.evento.capacidad <= 0) {
      this.errorMessage = 'La capacidad debe ser mayor a cero.';
      this.successMessage = '';
      return false;
    }

    return true;
  }
}
