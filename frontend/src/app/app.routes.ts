import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent, data: { renderMode: 'server' } },
  { path: 'carrito', component: CarritoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '' }
];
