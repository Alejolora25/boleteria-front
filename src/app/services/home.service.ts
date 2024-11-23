import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importar el archivo environment

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/boletas`; // Centralizar la URL 

  constructor(private http: HttpClient) {}

  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estadisticas`);
  }
}

