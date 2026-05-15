import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-info">
            <h3>SERVIA'S SHOP</h3>
            <p>La mejor moda para hombres con estilo propio. Calidad y tendencia en cada prenda.</p>
          </div>
          <div class="footer-links">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a routerLink="/">Inicio</a></li>
              <li><a routerLink="/tienda">Tienda</a></li>
              <li><a routerLink="/tienda">Hombre</a></li>
            </ul>
          </div>
          <div class="footer-contact">
            <h4>Contacto</h4>
            <p><i class="fas fa-envelope"></i> contacto&#64;serviasshop.com</p>
            <p><i class="fas fa-phone"></i> +51 999 888 777</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Servia's Shop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a1a;
      color: #999;
      padding: 4rem 0 2rem;
      margin-top: 4rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 3rem;
      margin-bottom: 3rem;
    }
    h3, h4 { color: white; margin-bottom: 1.5rem; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 0.8rem; }
    a { color: #999; text-decoration: none; transition: color 0.3s; }
    a:hover { color: white; }
    .footer-bottom {
      border-top: 1px solid #333;
      padding-top: 2rem;
      text-align: center;
      font-size: 0.8rem;
    }
  `]
})
export class FooterComponent {}
