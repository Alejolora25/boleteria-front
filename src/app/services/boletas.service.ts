import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoletasService {
  private apiUrl = 'http://localhost:8080/api/boletas';

  constructor(private http: HttpClient) {}

  obtenerBoletas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearBoleta(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  eliminarBoleta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

