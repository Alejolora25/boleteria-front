import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importar el archivo environment

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = `${environment.apiUrl}/eventos`; // Centralizar la URL

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEventoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEvento(evento: any): Observable<any> {
    return this.http.post(this.apiUrl, evento);
  }

  updateEvento(id: number, evento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, evento);
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
