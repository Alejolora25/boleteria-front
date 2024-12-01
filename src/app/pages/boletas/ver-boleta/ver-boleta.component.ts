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
      const doc = new jsPDF({
        orientation: 'portrait', // Vertical
        unit: 'mm',
        format: [216, 279], // Tamaño carta
      });

      // Marco general alrededor de todo el contenido
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1.5); // Borde más grueso
      doc.rect(10, 10, 196, 259); // Ajustamos el tamaño del marco al formato carta

      // Imagen del evento
      const img = new Image();
      img.src = 'assets/images/IMG_0872.PNG';

      img.onload = () => {
        const imgWidth = 70; // Reducido el ancho de la imagen
        const imgHeight = 90; // Reducido el alto de la imagen
        const imgX = (doc.internal.pageSize.width - imgWidth) / 2; // Centrado horizontalmente
        const imgY = 25; // Manteniendo margen superior

        // Título del evento
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16); // Tamaño del título ajustado
        doc.text(`${this.boletaData.evento.nombre}`, 108, 20, { align: 'center' });

        // Agregar la imagen
        doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Marco interior del detalle de la boleta con bordes redondeados
        const contentY = imgY + imgHeight + 5; // Ajustado para espacio después de la imagen
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5); // Borde más delgado
        doc.roundedRect(15, contentY, 186, 100, 5, 5); // Marco ajustado para tamaño carta

        // Encabezado del detalle
        doc.setFontSize(14); // Tamaño del encabezado
        doc.text('Detalle de la Boleta', 108, contentY + 10, { align: 'center' });

        // Información de la boleta
        doc.setFontSize(11); // Fuente aumentada
        let y = contentY + 20;
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombre:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.nombreComprador}`, 60, y);

        y += 8; // Espaciado entre líneas
        doc.setFont('helvetica', 'normal');
        doc.text(`Identificación:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.identificacionComprador}`, 60, y);

        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(`Correo:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.correoComprador}`, 60, y);

        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(`Celular:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.celular}`, 60, y);

        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(`Edad:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.edad}`, 60, y);

        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(`Evento:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.evento.nombre}`, 60, y);

        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(`Tipo:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(`${this.boletaData.tipo}`, 60, y);

        y += 8;
        doc.setFont('helvetica', 'normal');
        doc.text(`Fecha de Compra:`, 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(new Date(this.boletaData.fechaCompra).toLocaleDateString(), 60, y);

        // Código QR
        const qrY = contentY + 25; // Subido ligeramente
        const canvas = document.querySelector('canvas');
        const imgData = canvas?.toDataURL('image/png');
        if (imgData) {
          doc.addImage(imgData, 'PNG', 140, qrY, 50, 50); // QR ajustado
        }

        // Condiciones de uso
        const condicionesY = qrY + 82; // Justo después del QR
        const franjaY = condicionesY - 5; // Para la franja negra
        doc.setFillColor(0, 0, 0); // Negro
        doc.rect(15, franjaY, 186, 10, 'F'); // Franja negra

        // Título de las condiciones
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255); // Blanco
        doc.text('ESTE ES SU TICKET DIGITAL PARA INGRESAR AL EVENTO - RECOMENDACIONES DE USO', 108, condicionesY, {
          align: 'center',
        });

        // Texto de las condiciones
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7); // Tamaño reducido para las condiciones de uso
        doc.setTextColor(85); // Gris oscuro
        const textoY = condicionesY + 5; // Espacio después de la franja
        const condicionesUso = `
          1. POR FAVOR IMPRIMA SOLO LOS TICKET DIGITAL RECIBIDOS. 
          2. SI USTED HA COMPRADO VARIAS ENTRADAS, IMPRIMA CADA TICKET DIGITAL POR SEPARADO.
          3. EN CASO DE REIMPRIMIR O COPIAR UN TICKET DIGITAL, SOLO SE PERMITIRÁ EL INGRESO A UNO DE ELLOS.
          4. EL TICKET DIGITAL PUEDE SER IMPRESO A COLOR O EN BLANCO Y NEGRO, ASEGÚRESE QUE EL CÓDIGO QR SEA LEGIBLE.
          5. NO PUBLIQUE LOS TICKET DIGITAL NI EXPONGA EL CÓDIGO QR EN REDES SOCIALES.
          6. EL TICKET DIGITAL PUEDE SER PRESENTADO EN SU CELULAR O OTRO DISPOSITIVO.
        `;
        doc.text(condicionesUso, 15, textoY, { maxWidth: 186, align: 'left' });

        // Guardar el PDF
        doc.save(`Boleta_${this.boletaData.nombreComprador}.pdf`);
      };
  }


 

  regresar(): void {
    this.router.navigate(['/boletas']);
  }

  enviarBoleta(): void {
    if (!this.boletaData?.id) {
      console.error('No se encontró el ID de la boleta.');
      return;
    }
    this.boletasService.enviarBoleta(this.boletaData.id).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert('Boleta enviada con éxito al correo del comprador.');
        } else {
          console.error('Respuesta inesperada:', response);
          alert('Ocurrió un error inesperado al enviar la boleta.');
        }
      },
      error: (err) => {
        console.error('Error al enviar la boleta', err);
        alert('Ocurrió un error al enviar la boleta. Por favor, inténtalo nuevamente.');
      },
    });
  }
  
  
}
