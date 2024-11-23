import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Para *ngFor y otras directivas

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  estadisticas: any = {};
  cargando: boolean = true;

  // Propiedades específicas para datos desglosados
  boletasPorVendedor: any[] = [];
  ingresosPorVendedor: any[] = [];
  porcentajeMetodoPago: any[] = [];
  topClientes: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(): void {
    this.homeService.obtenerEstadisticas().subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.boletasPorVendedor = data.boletasPorVendedor || [];
        this.ingresosPorVendedor = data.ingresosPorVendedor || [];
        this.porcentajeMetodoPago = data.porcentajeMetodoPago || [];
        this.topClientes = data.topClientes || [];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener estadísticas:', err);
        this.cargando = false;
      },
    });
  }

  obtenerIngresoPorVendedor(nombre: string): number {
    const vendedor = this.ingresosPorVendedor.find((v: any) => v[0] === nombre);
    return vendedor ? vendedor[1] : 0;
  }

  obtenerPorcentajeMetodoPago(metodo: string): number {
    const metodoPago = this.porcentajeMetodoPago.find((m: any) => m[0] === metodo);
    return metodoPago ? (metodoPago[1] / this.estadisticas.totalVendidas) * 100 : 0;
  }
}
