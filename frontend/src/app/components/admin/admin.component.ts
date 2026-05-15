import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { Producto } from '../../models/api.models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-container">
      <div *ngIf="!authService.esAdmin()" class="acceso-denegado">
        <p>No tienes acceso a esta sección</p>
        <a routerLink="/tienda" class="btn-volver">Volver</a>
      </div>

      <div *ngIf="authService.esAdmin()" class="admin-content">
        <h1>Panel de Administración</h1>

        <div class="admin-actions">
          <button class="btn-nuevo" (click)="abrirFormulario()">+ Nuevo Producto</button>
          <a routerLink="/tienda" class="btn-volver">Volver a Tienda</a>
        </div>

        <div *ngIf="mostrarFormulario" class="formulario-producto">
          <h2>{{ editando ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
          
          <form (ngSubmit)="guardarProducto()">
            <div class="form-group">
              <label>Nombre</label>
              <input [(ngModel)]="productoForm.nombre" name="nombre" required>
            </div>

            <div class="form-group">
              <label>Descripción</label>
              <textarea [(ngModel)]="productoForm.descripcion" name="descripcion" required></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Precio</label>
                <input type="number" [(ngModel)]="productoForm.precio" name="precio" step="0.01" required>
              </div>
              <div class="form-group">
                <label>Stock</label>
                <input type="number" [(ngModel)]="productoForm.stock" name="stock" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Tipo de Ropa</label>
                <select [(ngModel)]="productoForm.tipoRopa" name="tipoRopa" required>
                  <option value="CAMISA">Camisa</option>
                  <option value="PANTALON">Pantalón</option>
                  <option value="CHAQUETA">Chaqueta</option>
                  <option value="ZAPATILLA">Zapatilla</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tallas Disponibles (ej: XS,S,M,L,XL)</label>
                <input [(ngModel)]="productoForm.tallasDisponibles" name="tallasDisponibles" placeholder="XS,S,M,L,XL" required>
              </div>
            </div>

            <div class="form-group">
              <label>URL de Imagen</label>
              <input [(ngModel)]="productoForm.imagen" name="imagen" type="url">
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-guardar">{{ editando ? 'Actualizar' : 'Crear' }}</button>
              <button type="button" class="btn-cancelar" (click)="cancelarFormulario()">Cancelar</button>
            </div>
          </form>
        </div>

        <div class="productos-tabla">
          <h2>Productos</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Tallas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let producto of productos">
                <td>{{ producto.id }}</td>
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.precio | currency:'USD' }}</td>
                <td>{{ producto.stock }}</td>
                <td>{{ producto.tallasDisponibles || producto.talla }}</td>
                <td>
                  <button class="btn-editar" (click)="editarProducto(producto)">Editar</button>
                  <button class="btn-eliminar" (click)="eliminarProducto(producto.id!)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .acceso-denegado {
      text-align: center;
      padding: 60px 20px;
      color: #c00;
      font-size: 1.2rem;
    }

    h1 {
      margin-bottom: 30px;
      font-size: 2rem;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
      color: #333;
    }

    .admin-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }

    .btn-nuevo, .btn-guardar, .btn-editar, .btn-volver {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-nuevo, .btn-guardar {
      background: #333;
      color: white;
    }

    .btn-nuevo:hover, .btn-guardar:hover {
      background: #e44d26;
    }

    .btn-volver {
      background: transparent;
      border: 1px solid #333;
      color: #333;
    }

    .btn-volver:hover {
      background: #333;
      color: white;
    }

    .btn-cancelar {
      background: #999;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-cancelar:hover {
      background: #777;
    }

    .btn-editar {
      background: #007bff;
      color: white;
      padding: 5px 10px;
      font-size: 0.85rem;
    }

    .btn-editar:hover {
      background: #0056b3;
    }

    .btn-eliminar {
      background: #e44d26;
      color: white;
      padding: 5px 10px;
      font-size: 0.85rem;
      margin-left: 5px;
    }

    .btn-eliminar:hover {
      background: #d63a1a;
    }

    .formulario-producto {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 4px;
      margin-bottom: 30px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 5px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    input, textarea, select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .productos-tabla {
      background: white;
      padding: 20px;
      border-radius: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    table th, table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    table th {
      background: #f5f5f5;
      font-weight: 600;
      border-bottom: 2px solid #333;
    }

    table tr:hover {
      background: #f9f9f9;
    }
  `]
})
export class AdminComponent implements OnInit {
  productos: Producto[] = [];
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  productoForm: Producto = this.resetForm();

  constructor(
    private productoService: ProductoService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.authService.esAdmin()) {
      this.router.navigate(['/tienda']);
      return;
    }
    this.cargarProductos();
  }

  private resetForm(): Producto {
    return {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
      tipoRopa: 'CAMISA',
      talla: '',
      tallasDisponibles: 'XS,S,M,L,XL'
    };
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.markForCheck();
        console.log('Productos cargados:', this.productos);
      },
      error: (err) => console.error('Error:', err)
    });
  }

  abrirFormulario(): void {
    this.editando = false;
    this.productoForm = this.resetForm();
    this.mostrarFormulario = true;
  }

  editarProducto(producto: Producto): void {
    this.editando = true;
    this.productoForm = { ...producto };
    this.mostrarFormulario = true;
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.productoForm = this.resetForm();
  }

  guardarProducto(): void {
    if (this.editando) {
      this.productoService.actualizarProducto(this.productoForm.id!, this.productoForm).subscribe({
        next: () => {
          alert('Producto actualizado');
          this.cancelarFormulario();
          this.cargarProductos();
        },
        error: (err) => alert('Error al actualizar: ' + err.error?.message)
      });
    } else {
      this.productoService.crearProducto(this.productoForm).subscribe({
        next: () => {
          alert('Producto creado');
          this.cancelarFormulario();
          this.cargarProductos();
        },
        error: (err) => alert('Error al crear: ' + err.error?.message)
      });
    }
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.cargarProductos();
        },
        error: (err) => alert('Error: ' + err.error?.message)
      });
    }
  }
}
