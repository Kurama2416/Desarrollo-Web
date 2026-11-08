
USE manglu_db;

-- Categorías de Manglü
INSERT INTO categories (id, name) VALUES
(1, 'Granizados'),
(2, 'Frutas'),
(3, 'Toppings');

-- Tamaños disponibles
INSERT INTO sizes (id, name) VALUES
(1, 'Pequeño'),
(2, 'Mediano'),
(3, 'Grande'),
(4, 'Único');

-- Productos originales de Manglü
INSERT INTO products
(id, name, description, image, price, category_id)
VALUES
(1, 'Manglü',
'Nuestro granizado estrella con mango fresco, hielo finamente raspado y los mejores toppings.',
'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
8000, 1),

(2, 'Granizado de Lulo',
'El sabor ácido y tropical del lulo colombiano convertido en hielo refrescante.',
'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
7000, 1),

(3, 'Granizado de Maracuyá',
'Intenso y aromático. La maracuyá en su mejor versión helada, dulce y ácida.',
'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
8000, 1),

(4, 'Granizado de Mango',
'Mango maduro colombiano en cada bocado. Dulce, jugoso y refrescante.',
'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80',
8000, 1),

(5, 'Granizado de Cereza',
'El dulzor de la cereza en hielo. Un clásico reconfortante con toque frutal.',
'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
8000, 1),

(6, 'Granizado de Tamarindo',
'Agridulce y adictivo. El tamarindo tropical que te sorprenderá en cada sorbo.',
'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
7000, 1),

(7, 'Granizado de Frutos Rojos',
'La mezcla perfecta de mora, fresa y frambuesa en un granizado vibrante.',
'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
8000, 1),

(8, 'Trozos de Mango',
'Mango fresco cortado en trozos perfectos. Simple, natural y delicioso.',
'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
5000, 2),

(9, 'Toppings Extra',
'Elige tu topping favorito: chamoy, chile, sal, limón y más combinaciones.',
'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
2000, 3);

-- Tamaños disponibles para cada producto
INSERT INTO product_sizes (product_id, size_id) VALUES

-- Manglü
(1, 1), (1, 2), (1, 3),

-- Granizado de Lulo
(2, 1), (2, 2), (2, 3),

-- Granizado de Maracuyá
(3, 1), (3, 2), (3, 3),

-- Granizado de Mango
(4, 1), (4, 2), (4, 3),

-- Granizado de Cereza
(5, 1), (5, 2), (5, 3),

-- Granizado de Tamarindo
(6, 1), (6, 2), (6, 3),

-- Granizado de Frutos Rojos
(7, 1), (7, 2), (7, 3),

-- Trozos de Mango
(8, 1), (8, 3),

-- Toppings Extra
(9, 4);

-- Usuarios iniciales de Manglü
INSERT INTO users
(id, firstName, lastName, email, password, category, image)
VALUES
(1, 'Camila', 'Rojas', 'camila.rojas@example.com',
'$2b$10$qeTU.d5.AN/f5RlTkl6BUuhH4VrslGNCSgebtVM0Vmu2u8Kzrzm9y',
'admin', 'https://robohash.org/camilarojas.png?size=80x80&set=set1'),

(2, 'Andrés', 'Gómez', 'andres.gomez@example.com',
'$2b$10$dJFLVW1N/y.nMeyE2R9tQ.wTg5PlsakMjxlXB5e0lQzFO/4MQNY7G',
'admin', 'https://robohash.org/andresgomez.png?size=80x80&set=set1'),

(3, 'Valentina', 'Pérez', 'valentina.perez@example.com',
'$2b$10$8YiS/96xjmtKGu/zRZHc1OLATMIiml43z0kfOXqs0jABQtNQhMFnG',
'customer', 'https://robohash.org/valentinaperez.png?size=80x80&set=set1'),

(4, 'Santiago', 'Torres', 'santiago.torres@example.com',
'$2b$10$9DZY9JCbPNf22p4vmlXV8.0p4RGc3.kbLBWF5o9E8kVR6kn2bCLdC',
'customer', 'https://robohash.org/santiagotorres.png?size=80x80&set=set1'),

(5, 'Laura', 'Martínez', 'laura.martinez@example.com',
'$2b$10$NPj25ZGNJ6iX4twnhVzlc.fPQD6.4h1f1rme5UoHj8MX.YKo7Sl1O',
'customer', 'https://robohash.org/lauramartinez.png?size=80x80&set=set1'),

(6, 'Mateo', 'Ramírez', 'mateo.ramirez@example.com',
'$2b$10$jRzd8tjFpzVobWtRHbQ/k.rTrFPTCQRb5jDE9AZ6Fm90OQnEIfev.',
'customer', 'https://robohash.org/mateoramirez.png?size=80x80&set=set1'),

(7, 'Daniela', 'Castro', 'daniela.castro@example.com',
'$2b$10$rHN6C92Zeo2u41w5QXvHPeYBqw4ANH3LRTJGiJnPbxtL9ssBmVF32',
'customer', 'https://robohash.org/danielacastro.png?size=80x80&set=set1'),

(8, 'Sebastián', 'Moreno', 'sebastian.moreno@example.com',
'$2b$10$7hwPNCs97cAGsf2154zYsOu8vyG88fhcnNYcEmNRp9CyLYgGpwdiy',
'customer', 'https://robohash.org/sebastianmoreno.png?size=80x80&set=set1'),

(9, 'Isabella', 'Vargas', 'isabella.vargas@example.com',
'$2b$10$SpJG7XMxwLAwWQV5wWP0Hu82gIbMgZ1QwQtVQj4xYxX9/0jVhCXy',
'customer', 'https://robohash.org/isabellavargas.png?size=80x80&set=set1'),

(10, 'Juan', 'Herrera', 'juan.herrera@example.com',
'$2b$10$fAxhbFGUzIGG8Gpsb7Nvg.g6YkLb.uBgNxLGMuLg0Jk7XaqXOZCIW',
'customer', 'https://robohash.org/juanherrera.png?size=80x80&set=set1');
