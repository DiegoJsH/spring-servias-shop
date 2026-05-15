import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.obtenerToken();
    console.log('JwtInterceptor - Token:', token ? 'Present' : 'Missing');
    console.log('JwtInterceptor - Request URL:', request.url);

    if (token && !request.url.includes('util/encode-password')) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('JwtInterceptor - Token agregado a:', request.url);
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
