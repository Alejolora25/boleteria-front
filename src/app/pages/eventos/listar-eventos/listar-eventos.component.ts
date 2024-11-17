import { Component, OnInit  } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.css'
})
export class ListarEventosComponent implements OnInit {
  eventos: any[] = [];

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.eventosService.getEventos().subscribe(
      (data) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al obtener eventos', error);
      }
    );
  }
}