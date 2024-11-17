import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:8080/api/eventos'; // Ajusta la URL según tu backend

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
