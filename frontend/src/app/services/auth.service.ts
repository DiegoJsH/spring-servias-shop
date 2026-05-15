import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/api.models';

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  private readonly TOKEN_KEY = 'servia-token';
  private readonly USUARIO_KEY = 'servia-usuario';

  constructor(private http: HttpClient) {
    this.cargarUsuario();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private cargarUsuario(): void {
    if (!this.isBrowser()) {
      return;
    }
    
    const token = localStorage.getItem(this.TOKEN_KEY);
    const usuarioStr = localStorage.getItem(this.USUARIO_KEY);
    
    if (token && usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr);
        this.usuarioSubject.next(usuario);
      } catch (e) {
        this.logout();
      }
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          if (this.isBrowser()) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USUARIO_KEY, JSON.stringify(response.usuario));
          }
          this.usuarioSubject.next(response.usuario);
        })
      );
  }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/api/usuarios', usuario);
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USUARIO_KEY);
    }
    this.usuarioSubject.next(null);
  }

  obtenerToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  esAdmin(): boolean {
    const usuario = this.usuarioSubject.value;
    return usuario?.rol === 'ADMIN';
  }

  obtenerUsuario(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
