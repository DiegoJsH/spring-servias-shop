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
        <a routerLink="/" class="logo">
          <i class="fas fa-shopping-bag"></i>
          <span class="logo-text">SERVIA'S <span class="logo-accent">SHOP</span></span>
        </a>

        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <i class="fas fa-home"></i> Inicio
          </a></li>
          <li><a routerLink="/tienda" routerLinkActive="active">
            <i class="fas fa-tshirt"></i> Hombre
          </a></li>
        </ul>

        <div class="nav-actions">
          <a routerLink="/carrito" class="cart-icon" [class.has-items]="cantidadCarrito > 0">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge" *ngIf="cantidadCarrito > 0">{{ cantidadCarrito }}</span>
          </a>

          <div class="user-menu" *ngIf="(usuario$ | async) as usuario">
            <div class="user-info">
              <i class="fas fa-user-circle"></i>
              <span class="usuario-nombre">{{ usuario.username }}</span>
            </div>
            <button *ngIf="authService.esAdmin()" (click)="irAdmin()" class="btn-admin">
              <i class="fas fa-crown"></i> Admin
            </button>
            <button (click)="logout()" class="btn-logout">
              <i class="fas fa-sign-out-alt"></i> Salir
            </button>
          </div>

          <div class="auth-buttons" *ngIf="!(usuario$ | async)">
            <a routerLink="/login" class="btn-login">
              <i class="fas fa-sign-in-alt"></i> Ingresar
            </a>
            <a routerLink="/registro" class="btn-registro">
              <i class="fas fa-user-plus"></i> Registrarse
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      backdrop-filter: blur(10px);
      box-shadow: var(--shadow-md);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid var(--border);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      gap: 2rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Poppins', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      text-decoration: none;
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    .logo i {
      color: var(--primary);
      font-size: 1.8rem;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .logo-text {
      letter-spacing: 1px;
    }

    .logo-accent {
      color: var(--primary);
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 2.5rem;
      margin: 0;
      flex: 1;
    }

    .nav-links li {
      position: relative;
    }

    .nav-links a {
      font-family: 'Poppins', sans-serif;
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      transition: width 0.3s ease;
      border-radius: 2px;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--primary);
    }

    .nav-links a.active::after,
    .nav-links a:hover::after {
      width: 100%;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .cart-icon {
      position: relative;
      font-size: 1.3rem;
      color: var(--text-primary);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }

    .cart-icon:hover {
      color: var(--primary);
      transform: scale(1.15);
    }

    .cart-icon.has-items {
      animation: bounce 0.6s ease;
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -12px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(228, 77, 38, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-primary);
    }

    .user-info i {
      font-size: 1.5rem;
      color: var(--primary);
    }

    .usuario-nombre {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-primary);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-left: 1.5rem;
      border-left: 2px solid var(--border);
    }

    .btn-admin, .btn-logout {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-admin {
      background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
      color: white;
      box-shadow: var(--shadow-sm);
    }

    .btn-admin:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn-logout {
      background: transparent;
      color: var(--text-primary);
      border: 2px solid var(--primary);
    }

    .btn-logout:hover {
      background: var(--primary);
      color: white;
      transform: translateY(-2px);
    }

    .auth-buttons {
      display: flex;
      gap: 0.75rem;
      padding-left: 1.5rem;
      border-left: 2px solid var(--border);
    }

    .btn-login, .btn-registro {
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      text-decoration: none;
      font-family: 'Poppins', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-login {
      background: transparent;
      color: var(--secondary);
      border: 2px solid var(--secondary);
    }

    .btn-login:hover {
      background: var(--secondary);
      color: white;
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn-registro {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      box-shadow: var(--shadow-sm);
    }

    .btn-registro:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .container {
        gap: 1rem;
      }

      .nav-links {
        display: none;
      }

      .user-menu,
      .auth-buttons {
        border-left: none;
        padding-left: 0;
      }

      .logo-text {
        display: none;
      }
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
