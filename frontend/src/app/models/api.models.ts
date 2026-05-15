export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    tipoRopa: 'CAMISA' | 'PANTALON' | 'CHAQUETA' | 'ZAPATILLA';
    talla: string;
    tallasDisponibles?: string; // Formato: "XS,S,M,L,XL"
}

export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    username: string;
    password?: string;
    direccion: string;
    telefono: string;
    rol: 'ADMIN' | 'USER';
}
