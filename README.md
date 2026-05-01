# Spring Servias Shop

Una aplicación de tienda en línea construida con Spring Boot, que incluye autenticación JWT y un front-end Angular.

## Características

- Gestión de productos, usuarios, órdenes y detalles de órdenes
- Autenticación JWT
- Roles de usuario (USER, ADMIN)
- API RESTful
- CORS habilitado para front-end Angular

## Endpoints de API

### Autenticación

- `POST /api/auth/login` - Iniciar sesión (username, password) -> JWT token

### Productos (autenticados)

- `GET /api/productos` - Listar productos
- `GET /api/productos/{id}` - Obtener producto por ID
- `POST /api/productos` - Crear producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

### Usuarios (autenticados)

- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

### Órdenes (autenticados)

- `GET /api/ordenes` - Listar órdenes
- `GET /api/ordenes/{id}` - Obtener orden por ID
- `POST /api/ordenes` - Crear orden
- `PUT /api/ordenes/{id}` - Actualizar orden
- `DELETE /api/ordenes/{id}` - Eliminar orden

### Detalles de Órdenes (autenticados)

- `GET /api/detalles-orden` - Listar detalles
- `GET /api/detalles-orden/{id}` - Obtener detalle por ID
- `POST /api/detalles-orden` - Crear detalle
- `PUT /api/detalles-orden/{id}` - Actualizar detalle
- `DELETE /api/detalles-orden/{id}` - Eliminar detalle

### Administrador (solo ADMIN)

- `GET /api/admin` - Resumen administrativo

## Configuración

1. Configurar PostgreSQL en `application.properties`
2. Ejecutar la aplicación: `mvn spring-boot:run`
3. El servidor corre en `http://localhost:8080`

### Usuario Inicial

Para crear un usuario administrador inicial, puedes insertar directamente en la BD o usar un script de inicialización.

Ejemplo SQL:

```sql
INSERT INTO usuarios (nombre, username, email, password, tipo) VALUES ('Admin', 'admin', 'admin@example.com', '$2a$10$encryptedpassword', 'ADMIN');
```

Asegúrate de encriptar la contraseña usando BCrypt.

## Seguridad

- Todas las rutas requieren autenticación excepto `/api/auth/login`
- Usar el header `Authorization: Bearer <token>` para autenticar requests
- Roles: USER (acceso general), ADMIN (acceso a /api/admin)

## Front-end Angular

El front-end debe:

- Enviar credenciales a `/api/auth/login` para obtener JWT
- Incluir el token en headers para requests autenticados
- Manejar expiración de tokens (renovar o redirigir a login)
