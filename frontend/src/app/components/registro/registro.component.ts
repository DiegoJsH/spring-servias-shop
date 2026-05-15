import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/api.models';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario: FormGroup;
  cargando = false;
  error = '';
  exito = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmar = group.get('confirmarPassword')?.value;
    return password === confirmar ? null : { 'passwordMismatch': true };
  }

  registrar(): void {
    if (this.formulario.invalid) {
      this.error = 'Por favor, completa todos los campos correctamente';
      return;
    }

    this.cargando = true;
    this.error = '';

    const nuevoUsuario: Usuario = {
      nombre: this.formulario.value.nombre,
      username: this.formulario.value.username,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
      telefono: this.formulario.value.telefono,
      direccion: this.formulario.value.direccion,
      rol: 'USER'
    };

    this.authService.registro(nuevoUsuario).subscribe({
      next: (usuario) => {
        this.exito = true;
        this.cargando = false;
        this.error = '';

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error en registro:', err);

        if (err.status === 400) {
          this.error = 'El nombre de usuario o correo ya existe';
        } else if (err.error && err.error.mensaje) {
          this.error = err.error.mensaje;
        } else {
          this.error = 'Error al registrar. Por favor intenta nuevamente.';
        }
      }
    });
  }

  obtenerErrorCampo(campo: string): string {
    const control = this.formulario.get(campo);
    if (control?.hasError('required')) {
      return `${this.getNombreCampo(campo)} es requerido`;
    }
    if (control?.hasError('minlength')) {
      const minlength = control.getError('minlength').requiredLength;
      return `${this.getNombreCampo(campo)} debe tener al menos ${minlength} caracteres`;
    }
    if (control?.hasError('email')) {
      return 'Correo electrónico inválido';
    }
    if (control?.hasError('pattern')) {
      return 'Teléfono debe tener 10 dígitos';
    }
    return '';
  }

  getNombreCampo(campo: string): string {
    const nombres: { [key: string]: string } = {
      nombre: 'Nombre',
      username: 'Usuario',
      email: 'Correo',
      password: 'Contraseña',
      confirmarPassword: 'Confirmación',
      telefono: 'Teléfono',
      direccion: 'Dirección'
    };
    return nombres[campo] || campo;
  }

  tieneError(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
