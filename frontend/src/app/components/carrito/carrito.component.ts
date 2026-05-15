import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { OrdenService } from '../../services/orden.service';
import { Carrito, CarritoItem } from '../../models/carrito.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="carrito-container">
      <h1>Mi Carrito</h1>

      <div *ngIf="carrito.items.length === 0" class="carrito-vacio">
        <p>Tu carrito está vacío</p>
        <a routerLink="/tienda" class="btn-continuar">Continuar Comprando</a>
      </div>

      <div *ngIf="carrito.items.length > 0" class="carrito-content">
        <table class="carrito-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Talla</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of carrito.items">
              <td>{{ item.nombre }}</td>
              <td>{{ item.talla }}</td>
              <td>{{ item.precio | currency:'USD' }}</td>
              <td>
                <div class="cantidad-control">
                  <button (click)="disminuirCantidad(item)">-</button>
                  <input type="number" [value]="item.cantidad" readonly>
                  <button (click)="aumentarCantidad(item)">+</button>
                </div>
              </td>
              <td><strong>{{ (item.precio * item.cantidad) | currency:'USD' }}</strong></td>
              <td>
                <button class="btn-eliminar" (click)="eliminarItem(item)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="carrito-resumen">
          <div class="resumen-item">
            <span>Subtotal:</span>
            <span>{{ carrito.total | currency:'USD' }}</span>
          </div>
          <div class="resumen-item">
            <span>Envío:</span>
            <span>{{ (carrito.total > 100 ? 0 : 10) | currency:'USD' }}</span>
          </div>
          <div class="resumen-item total">
            <span>Total:</span>
            <span>{{ (carrito.total + (carrito.total > 100 ? 0 : 10)) | currency:'USD' }}</span>
          </div>
        </div>

        <div class="carrito-acciones">
          <button class="btn-continuar" routerLink="/tienda" [disabled]="procesando">Continuar Comprando</button>
          <button class="btn-checkout" (click)="procederAlPago()" [disabled]="procesando">
            {{ procesando ? 'Procesando...' : 'Proceder al Pago' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carrito-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 20px;
    }

    h1 {
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .carrito-vacio {
      text-align: center;
      padding: 60px 20px;
      color: #888;
    }

    .carrito-vacio p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }

    .carrito-tabla {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }

    .carrito-tabla thead {
      background: #f5f5f5;
      border-bottom: 2px solid #333;
    }

    .carrito-tabla th, .carrito-tabla td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .carrito-tabla th {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.9rem;
    }

    .cantidad-control {
      display: flex;
      gap: 5px;
      align-items: center;
      border: 1px solid #ddd;
      width: fit-content;
    }

    .cantidad-control button {
      background: none;
      border: none;
      width: 30px;
      height: 30px;
      cursor: pointer;
      font-weight: 600;
    }

    .cantidad-control input {
      width: 40px;
      border: none;
      text-align: center;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }

    .btn-eliminar {
      background: #e44d26;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-eliminar:hover {
      background: #d63a1a;
    }

    .carrito-resumen {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 4px;
      margin-bottom: 20px;
      max-width: 300px;
      margin-left: auto;
    }

    .resumen-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .resumen-item.total {
      border-top: 2px solid #ddd;
      padding-top: 10px;
      margin-top: 10px;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .carrito-acciones {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
    }

    .btn-continuar, .btn-checkout {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.9rem;
      transition: all 0.3s;
    }

    .btn-continuar {
      background: transparent;
      border: 1px solid #333;
      color: #333;
    }

    .btn-continuar:hover:not(:disabled) {
      background: #333;
      color: white;
    }

    .btn-checkout {
      background: #333;
      color: white;
    }

    .btn-checkout:hover:not(:disabled) {
      background: #000;
    }

    .btn-continuar:disabled, .btn-checkout:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class CarritoComponent implements OnInit {
  carrito: Carrito = { items: [], total: 0 };
  procesando = false;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private authService: AuthService,
    private ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  aumentarCantidad(item: CarritoItem): void {
    this.carritoService.actualizarCantidad(item.productoId, item.talla, item.cantidad + 1);
  }

  disminuirCantidad(item: CarritoItem): void {
    if (item.cantidad > 1) {
      this.carritoService.actualizarCantidad(item.productoId, item.talla, item.cantidad - 1);
    }
  }

  eliminarItem(item: CarritoItem): void {
    this.carritoService.eliminarProducto(item.productoId, item.talla);
  }

  procederAlPago(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.estaAutenticado()) {
      alert('Debes iniciar sesión para proceder al pago');
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.authService.obtenerUsuario();
    console.log('Usuario actual:', usuario);

    if (!usuario) {
      alert('Error: No se pudo obtener la información del usuario');
      return;
    }

    if (!usuario.id) {
      alert('Error: El usuario no tiene ID. Por favor, inicia sesión nuevamente.');
      return;
    }

    // Validar que el carrito no esté vacío
    if (this.carrito.items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    this.procesando = true;

    // Preparar la solicitud
    const cartRequest = {
      usuarioId: usuario.id,
      items: this.carrito.items.map(item => ({
        productoId: item.productoId,
        nombre: item.nombre,
        talla: item.talla,
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: this.carrito.total
    };

    console.log('Enviando solicitud de orden:', cartRequest);

    // Procesar el carrito en el backend
    this.ordenService.procesarCarrito(cartRequest).subscribe({
      next: (orden) => {
        console.log('Orden creada exitosamente:', orden);
        const envio = this.carrito.total > 100 ? 0 : 10;
        const totalConEnvio = this.carrito.total + envio;

        // Mostrar confirmación
        const mensaje = `✓ PEDIDO CONFIRMADO

Cliente: ${usuario.username}
Número de Orden: #${orden.numero}
Subtotal: $${this.carrito.total.toFixed(2)}
Envío: $${envio.toFixed(2)}
Total: $${totalConEnvio.toFixed(2)}

Tu pedido ha sido procesado exitosamente.
Recibirás un correo de confirmación pronto.`;

        alert(mensaje);

        // Limpiar el carrito
        this.carritoService.limpiarCarrito();

        // Redirigir a la tienda
        this.router.navigate(['/tienda']);
        this.procesando = false;
      },
      error: (err) => {
        console.error('Error al procesar la orden:', err);
        let mensajeError = 'Error al procesar tu pedido. Por favor, intenta nuevamente.';

        if (err.error && err.error.mensaje) {
          mensajeError = err.error.mensaje;
        } else if (err.status === 401) {
          mensajeError = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
        } else if (err.status === 403) {
          mensajeError = 'No tienes permiso para realizar esta acción.';
        }

        alert(mensajeError);
        this.procesando = false;
      }
    });
  }
}
