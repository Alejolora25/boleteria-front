import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoletasService } from '../../../services/boletas.service';
import { EventosService } from '../../../services/eventos.service'; // Servicio para cargar eventos
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf

@Component({
  selector: 'app-crear-boleta',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './crear-boleta.component.html',
  styleUrl: './crear-boleta.component.css'
})
export class CrearBoletaComponent implements OnInit{
  boletaData = {
    nombreComprador: '',
    identificacionComprador: '',
    correoComprador: '',
    celular: '',
    edad: '',
    valorTotal: '',
    metodoPago: '',
    numeroTransaccion: '',
    etapaVenta: '',
    tipo: 'General',
    eventoId: '', // Evento seleccionado
    cantidad: 1,
  };

  eventos: any[] = []; // Lista de eventos disponibles
  metodosPago = ['Efectivo', 'Nequi', 'Transferencia', 'Tarjeta Débito', 'Tarjeta Crédito'];
  etapasVenta = ['Preventa Etapa 1', 'Preventa Etapa 2', 'Precio Full'];
  tiposBoleta = ['General', 'VIP'];

  constructor(private boletasService: BoletasService, private eventosService: EventosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEventos(); // Cargar lista de eventos disponibles
  }

  cargarEventos(): void {
    this.eventosService.getEventos().subscribe({
      next: (data: any[]) => {
        this.eventos = data;
      },
      error: (err: any) => {
        console.error('Error al cargar eventos', err);
      },
    });
  }

  crearBoleta(): void {
    // Construir el payload con el formato correcto
    const payload = {
      boleta: {
        nombreComprador: this.boletaData.nombreComprador,
        identificacionComprador: this.boletaData.identificacionComprador,
        correoComprador: this.boletaData.correoComprador,
        celular: this.boletaData.celular,
        edad: this.boletaData.edad,
        valorTotal: this.boletaData.valorTotal,
        metodoPago: this.boletaData.metodoPago,
        numeroTransaccion: this.boletaData.numeroTransaccion,
        etapaVenta: this.boletaData.etapaVenta,
        tipo: this.boletaData.tipo,
        evento: { id: this.boletaData.eventoId }, // Solo enviar `evento` con su `id`
      },
      cantidad: this.boletaData.cantidad,
    };

    this.boletasService.crearBoleta(payload).subscribe({
      next: () => {
        alert('Boleta creada con éxito');
        this.router.navigate(['/boletas']);
      },
      error: (error: any) => {
        console.error('Error al crear boleta', error);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/boletas']);
  }
}
