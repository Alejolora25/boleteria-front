import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoletasService } from '../../../services/boletas.service';

@Component({
  selector: 'app-crear-boleta',
  standalone: true,
  imports: [],
  templateUrl: './crear-boleta.component.html',
  styleUrl: './crear-boleta.component.css'
})
export class CrearBoletaComponent {
  boletaData = {
    nombreComprador: '',
    identificacionComprador: '',
    correoComprador: '',
    celular: '',
    edad: 0,
    valorTotal: 0,
    metodoPago: '',
    etapaVenta: '',
    tipo: 'General',
  };

  constructor(private boletasService: BoletasService, private router: Router) {}

  crearBoleta(): void {
    this.boletasService.crearBoleta({ boleta: this.boletaData, cantidad: 1 }).subscribe({
      next: () => {
        alert('Boleta creada con éxito');
        this.router.navigate(['/boletas']);
      },
      error: (error) => {
        console.error('Error al crear boleta', error);
      },
      complete: () => {
        console.log('Creación de boleta completada');
      },
    });
  }
}
