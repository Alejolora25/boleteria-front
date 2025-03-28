import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importar el archivo environment

@Injectable({
  providedIn: 'root',
})
export class BoletasService {
  private apiUrl = `${environment.apiUrl}/boletas`; // Centralizar la URL

  constructor(private http: HttpClient) {}

  obtenerBoletas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerBoletaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearBoleta(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  actualizarBoleta(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarBoleta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  obtenerBoletasPaginadas(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paginadas?page=${page}&size=${size}`);
  }

  filtrarBoletas(campo: string, valor: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/filtrar?campo=${campo}&valor=${valor}&page=${page}&size=${size}`);
  }

  enviarBoleta(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/enviar`, {}, { observe: 'response' });
  }  

  obtenerVendedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendedores`);
  }

  filtrarBoletasPorVendedorYCampo(
    vendedor: string,
    campo: string,
    valor: string,
    page: number,
    size: number
  ): Observable<any> {
    const url = `${this.apiUrl}/filtrar-por-vendedor?nombreVendedor=${encodeURIComponent(vendedor)}&campo=${encodeURIComponent(campo)}&valor=${encodeURIComponent(valor)}&page=${page}&size=${size}`;
    return this.http.get(url);
  }
  
  
  
}

