import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarritoItem, Carrito } from '../models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<Carrito>({ items: [], total: 0 });
  public carrito$: Observable<Carrito> = this.carritoSubject.asObservable();

  private readonly STORAGE_KEY = 'servia-carrito';

  constructor() {
    this.cargarCarrito();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private cargarCarrito(): void {
    if (!this.isBrowser()) {
      return;
    }
    
    const carritoGuardado = localStorage.getItem(this.STORAGE_KEY);
    if (carritoGuardado) {
      try {
        const carrito = JSON.parse(carritoGuardado);
        this.carritoSubject.next(carrito);
      } catch (e) {
        console.error('Error al cargar carrito:', e);
        this.limpiarCarrito();
      }
    }
  }

  private guardarCarrito(): void {
    if (!this.isBrowser()) {
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carritoSubject.value));
  }

  agregarProducto(item: CarritoItem): void {
    const carrito = this.carritoSubject.value;
    
    // Buscar si ya existe el producto con la misma talla
    const indexExistente = carrito.items.findIndex(
      p => p.productoId === item.productoId && p.talla === item.talla
    );

    if (indexExistente > -1) {
      // Incrementar cantidad
      carrito.items[indexExistente].cantidad += item.cantidad;
    } else {
      // Agregar nuevo item
      carrito.items.push(item);
    }

    this.actualizarTotal(carrito);
    this.carritoSubject.next(carrito);
    this.guardarCarrito();
  }

  eliminarProducto(productoId: number, talla: string): void {
    const carrito = this.carritoSubject.value;
    carrito.items = carrito.items.filter(
      item => !(item.productoId === productoId && item.talla === talla)
    );
    this.actualizarTotal(carrito);
    this.carritoSubject.next(carrito);
    this.guardarCarrito();
  }

  actualizarCantidad(productoId: number, talla: string, cantidad: number): void {
    const carrito = this.carritoSubject.value;
    const item = carrito.items.find(
      p => p.productoId === productoId && p.talla === talla
    );

    if (item) {
      if (cantidad <= 0) {
        this.eliminarProducto(productoId, talla);
      } else {
        item.cantidad = cantidad;
        this.actualizarTotal(carrito);
        this.carritoSubject.next(carrito);
        this.guardarCarrito();
      }
    }
  }

  private actualizarTotal(carrito: Carrito): void {
    carrito.total = carrito.items.reduce(
      (total, item) => total + (item.precio * item.cantidad),
      0
    );
  }

  obtenerCarrito(): Carrito {
    return this.carritoSubject.value;
  }

  limpiarCarrito(): void {
    this.carritoSubject.next({ items: [], total: 0 });
    if (this.isBrowser()) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  obtenerCantidadItems(): number {
    return this.carritoSubject.value.items.length;
  }
}
