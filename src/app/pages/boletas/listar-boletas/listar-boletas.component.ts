import { Component, OnInit } from '@angular/core';
import { BoletasService } from '../../../services/boletas.service';


@Component({
  selector: 'app-listar-boletas',
  standalone: true,
  imports: [],
  templateUrl: './listar-boletas.component.html',
  styleUrl: './listar-boletas.component.css'
})
export class ListarBoletasComponent implements OnInit {
  boletas: any[] = [];

  constructor(private boletasService: BoletasService) {}

  ngOnInit(): void {
    this.cargarBoletas();
  }

  cargarBoletas(): void {
    this.boletasService.obtenerBoletas().subscribe(
      (data) => {
        this.boletas = data;
      },
      (error) => {
        console.error('Error al cargar boletas', error);
      }
    );
  }
}
