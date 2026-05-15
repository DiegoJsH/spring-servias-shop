-- Insertar datos de prueba para productos
-- PostgreSQL convierte automáticamente los identificadores a minúsculas si no se usan comillas dobles.
-- Por lo tanto, aunque en Java sea "tipoRopa", en la DB es "tiporopa" (todo minúsculas).
INSERT INTO productos (nombre, descripcion, precio, stock, imagen, tiporopa, talla) VALUES
('Camiseta Casual Blanca', 'Camiseta de algodón 100% ideal para el día a día.', 19.99, 50, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'CAMISA', 'M'),
('Camiseta Premium Negra', 'Camiseta premium de algodón puro con acabado perfecto.', 24.99, 35, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'CAMISA', 'L'),
('Camiseta Básica Gris', 'Camiseta básica versátil para cualquier ocasión.', 17.99, 60, 'https://images.unsplash.com/photo-1502716216588-48f0a57a13d6?w=500', 'CAMISA', 'S'),
('Polo Deportivo Azul', 'Polo con tecnología anti-sudor para actividades deportivas.', 28.50, 25, 'https://images.unsplash.com/photo-1618427933382-f1d4e78f6cb9?w=500', 'CAMISA', 'M'),
('Camisa Formal Blanca', 'Camisa formal elegante para oficina o eventos.', 42.00, 20, 'https://images.unsplash.com/photo-1596362407944-bf87f6fdd49e?w=500', 'CAMISA', 'L'),
('Camiseta Estampada Roja', 'Camiseta con estampa exclusiva y diseño moderno.', 22.99, 40, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500', 'CAMISA', 'M'),
('Sudadera con Capucha Negra', 'Sudadera abrigada con forro polar interna.', 35.50, 20, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', 'CHAQUETA', 'L'),
('Chaqueta de Cuero Marrón', 'Chaqueta de cuero genuino estilo clásico.', 89.99, 12, 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500', 'CHAQUETA', 'M'),
('Sudadera Deportiva Gris', 'Sudadera deportiva cómoda con bolsillos.', 32.00, 28, 'https://images.unsplash.com/photo-1578681289016-856c6b535e13?w=500', 'CHAQUETA', 'S'),
('Chaqueta Vaquera Azul', 'Chaqueta vaquera clásica y resistente.', 55.99, 18, 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500', 'CHAQUETA', 'L'),
('Chaqueta Impermeable', 'Chaqueta resistente al agua para días lluviosos.', 65.00, 15, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', 'CHAQUETA', 'M'),
('Pantalones Jeans Azules', 'Vaqueros de corte moderno y duraderos.', 45.00, 15, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', 'PANTALON', '32'),
('Pantalones Jeans Oscuros', 'Jeans oscuros con fit ajustado y cómodo.', 48.50, 22, 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500', 'PANTALON', '34'),
('Pantalones Chinos Beige', 'Pantalones chinos elegantes para casual o formal.', 38.99, 30, 'https://images.unsplash.com/photo-1473002839311-23a37db52b74?w=500', 'PANTALON', '32'),
('Pantalones Deportivos Negros', 'Pantalones deportivos cómodos con tecnología transpirable.', 35.00, 25, 'https://images.unsplash.com/photo-1506629082632-401c5791a405?w=500', 'PANTALON', '30'),
('Pantalones Cargo Verde', 'Pantalones cargo con múltiples bolsillos funcionales.', 42.00, 18, 'https://images.unsplash.com/photo-1542080353-5ac9d159d3f1?w=500', 'PANTALON', '32'),
('Pantalones Slim Fit Gris', 'Pantalones slim fit modernos y elegantes.', 44.99, 20, 'https://images.unsplash.com/photo-1479064555552-3ef2b8f0c3de?w=500', 'PANTALON', '34'),
('Tenis Deportivos Blancos', 'Zapatillas deportivas cómodas y duraderas.', 59.99, 25, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'ZAPATILLA', '42'),
('Tenis Running Negros', 'Zapatillas para correr con amortiguación máxima.', 75.00, 18, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'ZAPATILLA', '40'),
('Tenis Casuales Grises', 'Zapatillas casuales versátiles para todos los días.', 52.50, 30, 'https://images.unsplash.com/photo-1514306688772-aadab7c3a01f?w=500', 'ZAPATILLA', '41'),
('Tenis Skate Azules', 'Zapatillas de skate duraderas y con buen agarre.', 62.00, 20, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'ZAPATILLA', '42'),
('Tenis Urbanos Rojos', 'Zapatillas urbanas con diseño moderno y atrevido.', 58.99, 22, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'ZAPATILLA', '41'),
('Tenis Clásicos Beige', 'Zapatillas clásicas minimalistas estilo retro.', 54.50, 25, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500', 'ZAPATILLA', '40'),
('Botines de Cuero Negros', 'Botines de cuero genuino elegantes y resistentes.', 85.00, 12, 'https://images.unsplash.com/photo-1543163521-9eae66b6b556?w=500', 'ZAPATILLA', '42');


INSERT INTO usuarios (username, password, email, rol) 
VALUES ('admin', '$2a$10$9P6q.wBqbSIztx0NSTHyheWwRWlGQ9/Zs72orBCu53aF80RJL3qRC', 'admin@servias.com', 'ADMIN');


