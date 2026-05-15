import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/api.models';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  loading = true;
  error = '';

  // Filtros
  tipoRopaSeleccionado: string = 'TODOS';
  ordenPrecio: string = 'default';

  tiposRopa = ['CAMISA', 'PANTALON', 'CHAQUETA', 'ZAPATILLA'];
  private destroy$ = new Subject<void>();

  constructor(private productoService: ProductoService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    // Cargar productos al iniciar y cada vez que se navega a /tienda
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: any) => event.urlAfterRedirects.includes('/tienda')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('Navegando a tienda, recargando productos...');
        this.cargarProductos();
      });

    // Cargar productos la primera vez
    this.cargarProductos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productoService.getProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Productos cargados:', data);
          this.productos = data;
          this.aplicarFiltros();
          this.loading = false;
          this.error = '';
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.error = 'Error al cargar los productos. Asegúrate de que el backend esté corriendo.';
          this.loading = false;
          this.cdr.markForCheck();
          console.error('Error en cargarProductos:', err);
        }
      });
  }

  aplicarFiltros(): void {
    let resultado = [...this.productos];

    // Filtro por tipo de ropa
    if (this.tipoRopaSeleccionado !== 'TODOS') {
      resultado = resultado.filter(p => p.tipoRopa === this.tipoRopaSeleccionado);
    }

    // Ordenar por precio
    if (this.ordenPrecio === 'asc') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (this.ordenPrecio === 'desc') {
      resultado.sort((a, b) => b.precio - a.precio);
    }

    this.productosFiltrados = resultado;
    this.cdr.markForCheck();
  }

  onFiltroChange(): void {
    this.aplicarFiltros();
  }
}
