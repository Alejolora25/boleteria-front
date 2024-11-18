import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoletasService } from '../../../services/boletas.service';
import { EventosService } from '../../../services/eventos.service'; // Servicio para cargar eventos
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-boleta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-boleta.component.html',
  styleUrl: './editar-boleta.component.css'
})
export class EditarBoletaComponent implements OnInit {
  boletaData: any = {
    id: '', // ID de la boleta (se llenará al cargar los datos)
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
  };

  eventos: any[] = []; // Lista de eventos disponibles
  metodosPago = ['Efectivo', 'Nequi', 'Transferencia', 'Tarjeta Débito', 'Tarjeta Crédito'];
  etapasVenta = ['Preventa Etapa 1', 'Preventa Etapa 2', 'Precio Full'];
  tiposBoleta = ['General', 'VIP'];

  constructor(
    private boletasService: BoletasService,
    private eventosService: EventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.cargarEventos();
    this.cargarBoleta(id);
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

  cargarBoleta(id: number): void {
    this.boletasService.obtenerBoletaPorId(id).subscribe({
      next: (data: any) => {
        this.boletaData = {
          ...data,
          eventoId: data.evento.id, // Mapear el evento a `eventoId`
        };
      },
      error: (err: any) => {
        console.error('Error al cargar la boleta', err);
      },
    });
  }

  actualizarBoleta(): void {
    // Construir el payload con el formato correcto
    const payload = {
      id: this.boletaData.id, // ID de la boleta
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
      evento: { id: this.boletaData.eventoId }, // Mapear correctamente el evento
    };

    this.boletasService.actualizarBoleta(payload.id, payload).subscribe({
      next: () => {
        alert('Boleta actualizada con éxito');
        this.router.navigate(['/boletas']);
      },
      error: (err: any) => {
        console.error('Error al actualizar la boleta', err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/boletas']);
  }
}
