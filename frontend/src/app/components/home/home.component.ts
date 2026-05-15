import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>NUEVA COLECCIÓN 2026</h1>
        <p>Descubre el estilo que te define con Servia's Shop</p>
        <a routerLink="/tienda" class="btn-primary">Ver Catálogo Hombre</a>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="feature-item">
          <i class="fas fa-shipping-fast"></i>
          <h3>Envío Gratis</h3>
          <p>En compras mayores a $150</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-lock"></i>
          <h3>Pago Seguro</h3>
          <p>Garantía de protección total</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-sync-alt"></i>
          <h3>Cambios Gratuitos</h3>
          <p>Hasta 30 días después</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 70vh;
      background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
                  url('https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200') center/cover;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
    }
    .hero-content h1 { font-size: 4rem; margin-bottom: 1rem; font-weight: 800; }
    .hero-content p { font-size: 1.5rem; margin-bottom: 2rem; }
    .btn-primary {
      background: #e44d26;
      color: white;
      padding: 1rem 2.5rem;
      text-decoration: none;
      font-weight: 700;
      border-radius: 4px;
      transition: background 0.3s;
    }
    .btn-primary:hover { background: #ff5e3a; }
    .features { padding: 5rem 0; background: #f9f9f9; }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 0 20px;
    }
    .feature-item { text-align: center; }
    .feature-item i { font-size: 2.5rem; color: #e44d26; margin-bottom: 1.5rem; }
  `]
})
export class HomeComponent {}
