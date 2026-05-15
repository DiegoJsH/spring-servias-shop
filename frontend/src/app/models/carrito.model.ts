export interface CarritoItem {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  talla: string;
  imagen: string;
}

export interface Carrito {
  items: CarritoItem[];
  total: number;
}
