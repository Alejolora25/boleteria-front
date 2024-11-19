import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoletasService } from '../../../services/boletas.service';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { QRCodeModule } from 'angularx-qrcode'; // Instalar angularx-qrcode: npm install angularx-qrcode
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ver-boleta',
  standalone: true,
  imports: [QRCodeModule, FormsModule, CommonModule],
  templateUrl: './ver-boleta.component.html',
  styleUrl: './ver-boleta.component.css'
})
export class VerBoletaComponent implements OnInit {
  boletaData: any = null;
  qrData: string = '';

  constructor(
    private boletasService: BoletasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.cargarBoleta(id);
  }

  cargarBoleta(id: number): void {
    this.boletasService.obtenerBoletaPorId(id).subscribe({
      next: (data: any) => {
        this.boletaData = data;
        this.qrData = data.codigoQr; // Asignar el string del QR para convertirlo en imagen
      },
      error: (err: any) => {
        console.error('Error al cargar la boleta', err);
      },
    });
  }

  descargarPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Detalle de la Boleta', 10, 10);
    doc.setFontSize(12);
    doc.text(`Nombre: ${this.boletaData.nombreComprador}`, 10, 20);
    doc.text(`Identificación: ${this.boletaData.identificacionComprador}`, 10, 30);
    doc.text(`Correo: ${this.boletaData.correoComprador}`, 10, 40);
    doc.text(`Celular: ${this.boletaData.celular}`, 10, 50);
    doc.text(`Edad: ${this.boletaData.edad}`, 10, 60);
    doc.text(`Evento: ${this.boletaData.evento.nombre}`, 10, 70);
    doc.text(`Tipo: ${this.boletaData.tipo}`, 10, 80);
    doc.text(`Estado: ${this.boletaData.estado}`, 10, 90);
    doc.text(`Fecha de Compra: ${new Date(this.boletaData.fechaCompra).toLocaleDateString()}`, 10, 100);

    // Agregar el QR
    const canvas = document.querySelector('canvas');
    const imgData = canvas?.toDataURL('image/png');
    if (imgData) {
      doc.addImage(imgData, 'PNG', 10, 110, 50, 50); // Ajustar posición y tamaño
    }

    doc.save(`Boleta_${this.boletaData.nombreComprador}.pdf`);
  }

  regresar(): void {
    this.router.navigate(['/boletas']);
  }
}
