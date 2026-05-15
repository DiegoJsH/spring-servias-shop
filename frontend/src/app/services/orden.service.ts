import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  productoId: number;
  nombre: string;
  talla: string;
  cantidad: number;
  precio: number;
}

export interface CartRequest {
  usuarioId: number;
  items: CartItem[];
  total: number;
}

export interface Orden {
  id: number;
  numero: string;
  fechaCreacion: string;
  total: number;
  usuario: any;
  detalles: any[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = 'http://localhost:8080/api/ordenes';

  constructor(private http: HttpClient) { }

  procesarCarrito(cartRequest: CartRequest): Observable<Orden> {
    console.log('Enviando carrito:', cartRequest);
    return this.http.post<Orden>(`${this.apiUrl}/procesar`, cartRequest);
  }

  obtenerOrdenes(usuarioId: number): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  obtenerOrden(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}/${id}`);
  }
}
