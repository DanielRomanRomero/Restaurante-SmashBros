-- Añadir columna alergenos (idempotente)
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS alergenos text[];

-- ============================================================
-- HAMBURGUESAS
-- ============================================================
UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Smash Clásico';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'Double Smash';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo','Mostaza']
WHERE name = 'Spicy Diablo';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Mushroom Swiss';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'Mushroom Truffle';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'Blue Cheese Smash';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'Smash Bacon Bacon';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo','Mostaza']
WHERE name = 'Smash BBQ Premium';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'Smash Hawaiana';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'La Picante Extrema';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Sésamo']
WHERE name = 'The Titan';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Soja','Sésamo']
WHERE name = 'Smash Clásica Vegetariana';

-- ============================================================
-- ENTRANTES / STARTERS
-- ============================================================
UPDATE menu_items SET alergenos = ARRAY['Gluten','Huevos','Mostaza']
WHERE name = 'Alitas BBQ';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Huevos','Mostaza']
WHERE name = 'Alitas de Pollo Búfalo';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Onion Rings';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Frutos secos']
WHERE name = 'Nachos Smash';

UPDATE menu_items SET alergenos = ARRAY['Mariscos']
WHERE name = 'Camarones al Ajillo';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Tabla de Croquetas Variadas';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Sulfitos']
WHERE name = 'Tabla de Quesos y Embutidos';

UPDATE menu_items SET alergenos = ARRAY['Sulfitos']
WHERE name = 'Tabla de Carnes Frías';

-- ============================================================
-- POSTRES
-- ============================================================
UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos','Frutos secos']
WHERE name = 'Smash Brownie';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Brownie Caliente con Helado';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Tartas de Chocolate Fluidas';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Huevos','Gluten']
WHERE name = 'Cheesecake de Nueva York';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Huevos','Gluten']
WHERE name = 'Tarta de Queso Clásica';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Tiramisú Italiano';

UPDATE menu_items SET alergenos = ARRAY['Gluten','Lácteos','Huevos']
WHERE name = 'Torrijas de la Casa';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Frutos secos']
WHERE name = 'Helado Artesanal Triple Bola';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Frutos secos']
WHERE name = 'Fresas con Chocolate Derretido';

-- ============================================================
-- BEBIDAS
-- ============================================================
UPDATE menu_items SET alergenos = ARRAY['Lácteos','Frutos secos']
WHERE name = 'Milkshake Clásico';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Frutos secos']
WHERE name = 'Milkshake de Chocolate';

UPDATE menu_items SET alergenos = ARRAY['Lácteos','Frutos secos']
WHERE name = 'Milkshake de Fresa';

UPDATE menu_items SET alergenos = ARRAY['Lácteos']
WHERE name = 'Batido de Frutos Rojos';

UPDATE menu_items SET alergenos = NULL
WHERE name = 'Batido Detox Verde';

UPDATE menu_items SET alergenos = NULL
WHERE name = 'Smoothie Tropical';

UPDATE menu_items SET alergenos = NULL
WHERE name = 'Limonada Casera';

UPDATE menu_items SET alergenos = NULL
WHERE name = 'Refresco Artesanal Sandía';

UPDATE menu_items SET alergenos = ARRAY['Gluten']
WHERE name = 'Cerveza Artesanal Local';

UPDATE menu_items SET alergenos = ARRAY['Sulfitos']
WHERE name = 'Agua Mineral con Gas';

UPDATE menu_items SET alergenos = ARRAY['Lácteos']
WHERE name = 'Café Americano';

UPDATE menu_items SET alergenos = ARRAY['Lácteos']
WHERE name = 'Cappuccino Casero';
