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
      <div class="login-box">
        <h1>SERVIA'S SHOP</h1>
        <h2>Inicia Sesión</h2>

        <div *ngIf="error" class="error-message">{{ error }}</div>

        <form (ngSubmit)="login()">
          <div class="form-group">
            <label>Usuario</label>
            <input 
              type="text" 
              [(ngModel)]="username" 
              name="username"
              placeholder="Tu usuario"
              required
            >
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              placeholder="Tu contraseña"
              required
            >
          </div>

          <button type="submit" [disabled]="cargando" class="btn-login">
            {{ cargando ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <div class="links">
          <p>¿No tienes cuenta? <a href="#registro">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
    }

    .login-box {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 5px;
      color: #333;
    }

    h1::after {
      content: '';
    }

    h2 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 30px;
      color: #666;
      font-weight: 400;
    }

    .error-message {
      background: #ffe0e0;
      color: #c00;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
      font-size: 0.9rem;
    }

    input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #e44d26;
      box-shadow: 0 0 5px rgba(228, 77, 38, 0.3);
    }

    .btn-login {
      background: #333;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.3s;
      text-transform: uppercase;
    }

    .btn-login:hover:not(:disabled) {
      background: #e44d26;
    }

    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .links {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 0.9rem;
    }

    .links a {
      color: #e44d26;
      text-decoration: none;
      font-weight: 600;
    }

    .links a:hover {
      text-decoration: underline;
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
