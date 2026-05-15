import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/api.models';
import { CarritoItem } from '../../models/carrito.model';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="detalle-container" *ngIf="producto">
      <div class="product-gallery">
        <div class="main-image">
          <img [src]="producto.imagen || 'https://via.placeholder.com/600x800'" [alt]="producto.nombre">
          <div class="tag-label" *ngIf="producto.stock < 10 && producto.stock > 0">Últimas unidades</div>
          <div class="tag-label out-of-stock" *ngIf="producto.stock <= 0">Agotado</div>
        </div>
      </div>

      <div class="product-details">
        <nav class="breadcrumb">
          <a routerLink="/tienda">Tienda</a> / <span>{{ producto.tipoRopa }}</span>
        </nav>

        <h1 class="product-title">{{ producto.nombre }}</h1>
        <p class="product-price">{{ producto.precio | currency:'USD' }}</p>

        <div class="product-description">
          <p>{{ producto.descripcion }}</p>
        </div>

        <div class="product-meta">
          <div class="meta-item">
            <label>Talla:</label>
            <select [(ngModel)]="tallaSelecionada" class="talla-selector">
              <option value="">-- Selecciona una talla --</option>
              <option *ngFor="let t of tallasList" [value]="t">{{ t }}</option>
            </select>
          </div>
          <div class="meta-item">
            <label>Disponibilidad:</label>
            <span class="value" [class.low-stock]="producto.stock < 10">
              {{ producto.stock > 0 ? producto.stock + ' unidades' : 'Agotado' }}
            </span>
          </div>
        </div>

        <div class="purchase-actions" *ngIf="producto.stock > 0">
          <div class="quantity-selector">
            <button (click)="changeQty(-1)" [disabled]="cantidad <= 1">-</button>
            <input type="number" [(ngModel)]="cantidad" readonly>
            <button (click)="changeQty(1)" [disabled]="cantidad >= producto.stock">+</button>
          </div>

          <button class="btn-add-cart" (click)="addToCart()" [disabled]="!tallaSelecionada">
            {{ anadidoAlCarrito ? 'AÑADIDO' : 'AÑADIR A LA CESTA' }}
          </button>
        </div>

        <div class="shipping-info">
          <p><i class="fas fa-truck"></i> Envío gratuito en pedidos superiores a $100</p>
          <p><i class="fas fa-undo"></i> Devoluciones gratuitas en 30 días</p>
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando detalles...</p>
    </div>

    <div *ngIf="error" class="error-state">
      <p>{{ error }}</p>
      <button routerLink="/tienda" class="btn-back">Volver a la tienda</button>
    </div>
  `,
  styles: [`
    .detalle-container {
      max-width: 1200px;
      margin: 40px auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      padding: 0 20px;
    }

    .main-image {
      position: relative;
      background: #f9f9f9;
      aspect-ratio: 3/4;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .tag-label {
      position: absolute;
      top: 20px;
      left: 20px;
      background: #e44d26;
      color: white;
      padding: 5px 12px;
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .tag-label.out-of-stock {
      background: #333;
    }

    .breadcrumb {
      margin-bottom: 20px;
      font-size: 0.85rem;
      color: #888;
    }

    .breadcrumb a {
      color: #888;
      text-decoration: none;
    }

    .breadcrumb a:hover { color: #333; }

    .product-title {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: #111;
      font-weight: 500;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #e44d26;
      margin-bottom: 30px;
    }

    .product-description {
      line-height: 1.6;
      color: #555;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 30px;
    }

    .product-meta {
      margin-bottom: 30px;
    }

    .meta-item {
      margin-bottom: 10px;
    }

    .meta-item label {
      font-weight: 600;
      width: 120px;
      display: inline-block;
    }

    .talla-selector {
      padding: 8px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      min-width: 150px;
    }

    .talla-selector:hover {
      border-color: #333;
    }

    .low-stock { color: #e44d26; font-weight: 600; }

    .purchase-actions {
      display: flex;
      gap: 20px;
      margin-bottom: 40px;
    }

    .quantity-selector {
      display: flex;
      border: 1px solid #ddd;
    }

    .quantity-selector button {
      background: none;
      border: none;
      width: 40px;
      height: 50px;
      cursor: pointer;
      font-size: 1.2rem;
    }

    .quantity-selector input {
      width: 70px;
      text-align: center;
      border: none;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      font-weight: 600;
      color: #333;
      font-size: 1rem;
    }

    .btn-add-cart {
      flex-grow: 1;
      background: linear-gradient(135deg, #e44d26 0%, #d63a1a 100%);
      color: white;
      border: none;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(228, 77, 38, 0.3);
    }

    .btn-add-cart:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(228, 77, 38, 0.4);
    }

    .btn-add-cart:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .shipping-info {
      background: #f8f8f8;
      padding: 20px;
      font-size: 0.9rem;
      color: #666;
    }

    .shipping-info p {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .loading-state, .error-state {
      text-align: center;
      padding: 100px 0;
    }

    .btn-back {
      margin-top: 20px;
      padding: 10px 20px;
      background: #333;
      color: white;
      border: none;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .detalle-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {
  producto?: Producto;
  cantidad: number = 1;
  loading: boolean = true;
  error: string = '';
  tallaSelecionada: string = '';
  tallasList: string[] = [];
  anadidoAlCarrito: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = +params.get('id')!;
          console.log('Cargando producto con ID:', id);
          this.loading = true;
          return this.productoService.getProductoById(id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          console.log('Producto recibido:', data);
          this.producto = data;
          this.cantidad = 1;
          this.tallaSelecionada = '';
          this.anadidoAlCarrito = false;

          if (data.tallasDisponibles) {
            this.tallasList = data.tallasDisponibles.split(',').map(t => t.trim());
          } else if (data.talla) {
            this.tallasList = [data.talla];
          }

          this.loading = false;
          this.error = '';
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.error = 'No se pudo cargar el producto';
          this.loading = false;
          this.cdr.markForCheck();
          console.error('Error en cargarProducto:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeQty(delta: number): void {
    const newQty = this.cantidad + delta;
    if (this.producto && newQty >= 1 && newQty <= this.producto.stock) {
      this.cantidad = newQty;
    }
  }

  addToCart(): void {
    if (this.producto && this.tallaSelecionada) {
      const item: CarritoItem = {
        productoId: this.producto.id!,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        cantidad: this.cantidad,
        talla: this.tallaSelecionada,
        imagen: this.producto.imagen
      };
      this.carritoService.agregarProducto(item);
      this.anadidoAlCarrito = true;
      setTimeout(() => {
        this.anadidoAlCarrito = false;
        this.cdr.markForCheck();
      }, 1500);
    }
  }
}
