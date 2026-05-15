import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <i class="fas fa-shopping-bag"></i>
          <h1>SERVIA'S SHOP</h1>
          <p>Accede a tu cuenta</p>
        </div>

        <div *ngIf="error" class="error-alert">
          <i class="fas fa-exclamation-circle"></i>
          <span>{{ error }}</span>
        </div>

        <form (ngSubmit)="login()" class="login-form">
          <div class="form-group">
            <label for="username">
              <i class="fas fa-user"></i> Usuario
            </label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              placeholder="Tu usuario"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i> Contraseña
            </label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Tu contraseña"
              required
            >
          </div>

          <button type="submit" [disabled]="cargando" class="btn-login">
            <span *ngIf="!cargando">
              <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </span>
            <span *ngIf="cargando">
              <i class="fas fa-spinner fa-spin"></i> Iniciando...
            </span>
          </button>
        </form>

        <div class="register-link">
          <p>¿No tienes cuenta? <a routerLink="/registro">Regístrate aquí</a></p>
        </div>

        <div class="demo-info">
          <p><strong>Demo:</strong> usuario: <code>admin</code></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .login-container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: moveBackground 20s linear infinite;
    }

    @keyframes moveBackground {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(50px, 50px);
      }
    }

    .login-card {
      background: white;
      padding: 50px;
      border-radius: 16px;
      box-shadow: var(--shadow-xl);
      width: 100%;
      max-width: 420px;
      position: relative;
      z-index: 1;
      animation: slideInUp 0.6s ease-out;
    }

    .login-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .login-header i {
      font-size: 3rem;
      color: var(--primary);
      margin-bottom: 15px;
      display: block;
      animation: bounce 2s infinite;
    }

    .login-header h1 {
      font-size: 2rem;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .login-header p {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .error-alert {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px;
      background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(220, 53, 69, 0.05) 100%);
      border-left: 4px solid var(--danger);
      border-radius: 8px;
      color: var(--danger);
      margin-bottom: 25px;
      font-weight: 500;
      animation: slideInDown 0.3s ease-out;
    }

    .error-alert i {
      font-size: 1.2rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group label i {
      color: var(--primary);
    }

    .form-group input {
      padding: 14px 16px;
      border: 2px solid var(--border);
      border-radius: 10px;
      font-size: 1rem;
      font-family: 'Inter', sans-serif;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: white;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(228, 77, 38, 0.1);
      transform: translateY(-2px);
    }

    .btn-login {
      padding: 14px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }

    .btn-login:active:not(:disabled) {
      transform: translateY(-1px);
    }

    .btn-login:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .register-link {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid var(--border);
      color: var(--text-secondary);
    }

    .register-link p {
      margin: 0;
      font-size: 0.95rem;
    }

    .register-link a {
      color: var(--primary);
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .register-link a:hover {
      color: var(--primary-light);
      text-decoration: underline;
    }

    .demo-info {
      margin-top: 20px;
      padding: 12px;
      background: var(--bg-light);
      border-radius: 8px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      border-left: 3px solid var(--accent);
    }

    .demo-info p {
      margin: 0;
    }

    .demo-info code {
      background: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      color: var(--primary);
      font-weight: 600;
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 30px 20px;
      }

      .login-header h1 {
        font-size: 1.5rem;
      }

      .login-header i {
        font-size: 2.5rem;
      }
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/tienda']);
      },
      error: (err) => {
        this.error = 'Usuario o contraseña incorrectos';
        this.cargando = false;
      }
    });
  }
}
