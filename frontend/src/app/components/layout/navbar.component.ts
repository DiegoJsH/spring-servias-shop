import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/api.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">SERVIA'S <span>SHOP</span></a>

        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a></li>
          <li><a routerLink="/tienda" routerLinkActive="active">Hombre</a></li>
          <li><a routerLink="/nosotros" routerLinkActive="active">Sobre Nosotros</a></li>
        </ul>

        <div class="nav-actions">
          <a routerLink="/carrito" class="cart-icon">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge" *ngIf="cantidadCarrito > 0">{{ cantidadCarrito }}</span>
          </a>

          <div class="user-menu" *ngIf="(usuario$ | async) as usuario">
            <span class="usuario-nombre">{{ usuario.username }}</span>
            <button *ngIf="authService.esAdmin()" (click)="irAdmin()" class="btn-admin">Panel Admin</button>
            <button (click)="logout()" class="btn-logout">Salir</button>
          </div>

          <a *ngIf="!(usuario$ | async)" routerLink="/login" class="btn-login">Cuenta</a>
          <a *ngIf="!(usuario$ | async)" routerLink="/registro" class="btn-registro">Registrarse</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      text-decoration: none;
      color: #333;
      letter-spacing: 1px;
    }
    .logo span { color: #e44d26; }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
    }
    .nav-links a {
      text-decoration: none;
      color: #555;
      font-weight: 500;
      transition: color 0.3s;
      text-transform: uppercase;
      font-size: 0.9rem;
    }
    .nav-links a:hover, .active { color: #e44d26; }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .cart-icon {
      position: relative;
      font-size: 1.2rem;
      color: #333;
    }
    .badge {
      position: absolute;
      top: -8px;
      right: -10px;
      background: #e44d26;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 50%;
    }
    .btn-login {
      background: #333;
      color: white;
      padding: 0.5rem 1.2rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.3s;
    }
    .btn-login:hover { background: #e44d26; }

    .btn-registro {
      background: #e44d26;
      color: white;
      padding: 0.5rem 1.2rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.3s;
    }
    .btn-registro:hover { background: #d63a1a; }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .usuario-nombre {
      color: #333;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .btn-admin, .btn-logout {
      background: transparent;
      color: #333;
      border: 1px solid #333;
      padding: 0.4rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-admin:hover {
      background: #333;
      color: white;
    }

    .btn-logout:hover {
      background: #e44d26;
      border-color: #e44d26;
      color: white;
    }
  `]
})
export class NavbarComponent implements OnInit {
  cantidadCarrito: number = 0;
  usuario$!: Observable<Usuario | null>;

  constructor(
    private carritoService: CarritoService,
    public authService: AuthService,
    private router: Router
  ) {
    this.usuario$ = this.authService.usuario$;
  }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadCarrito = carrito.items.length;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  irAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
