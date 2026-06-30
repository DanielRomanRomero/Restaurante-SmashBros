-- ================================================================
-- SMASH BROS BURGER — Schema completo para Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ================================================================

-- PROFILES (extiende auth.users con role)
CREATE TABLE public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  role       TEXT NOT NULL DEFAULT 'cliente' CHECK (role IN ('cliente', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-crear perfil al registrarse un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 'cliente');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- MENU CATEGORIES
CREATE TABLE public.menu_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MENU ITEMS
CREATE TABLE public.menu_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE RESTRICT,
  name          TEXT NOT NULL,
  description   TEXT,
  price         NUMERIC(8,2) NOT NULL CHECK (price >= 0),
  image_url     TEXT,
  badge         TEXT,
  is_available  BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Función updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RESERVATIONS
CREATE TABLE public.reservations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  time_slot  TIME NOT NULL,
  guests     INT NOT NULL CHECK (guests BETWEEN 1 AND 20),
  status     TEXT NOT NULL DEFAULT 'confirmada' CHECK (status IN ('confirmada', 'pendiente', 'cancelada', 'completada')),
  notes      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Prevenir doble reserva en mismo slot (permite múltiples canceladas)
CREATE UNIQUE INDEX reservations_date_slot_unique
  ON public.reservations (date, time_slot)
  WHERE status <> 'cancelada';

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "own profile read" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "admin read all profiles" ON public.profiles FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Menu (lectura pública, escritura solo admin)
CREATE POLICY "public read categories" ON public.menu_categories FOR SELECT USING (TRUE);
CREATE POLICY "admin manage categories" ON public.menu_categories FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "public read items" ON public.menu_items FOR SELECT USING (TRUE);
CREATE POLICY "admin manage items" ON public.menu_items FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Reservations
CREATE POLICY "own reservations read" ON public.reservations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own reservations insert" ON public.reservations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own reservations cancel" ON public.reservations FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (status = 'cancelada');
CREATE POLICY "admin all reservations" ON public.reservations FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ================================================================
-- SEED DATA — Categorías
-- ================================================================
INSERT INTO public.menu_categories (name, slug, display_order) VALUES
  ('Entrantes', 'entrantes', 1),
  ('Hamburguesas', 'hamburguesas', 2),
  ('Postres', 'postres', 3),
  ('Bebidas', 'bebidas', 4);

-- ================================================================
-- SEED DATA — Platos de ejemplo
-- (Sustituye las URLs de imagen por las reales cuando las tengas)
-- ================================================================
INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Smash Clásico', 'Doble smash patty, queso americano fundido, pepinillos, cebolla caramelizada y nuestra salsa secreta', 12.90,
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', 'Best Seller', 1
FROM public.menu_categories WHERE slug = 'hamburguesas';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Double Smash', 'Triple smash patty, bacon crujiente, queso cheddar, jalapeños y salsa BBQ ahumada', 15.90,
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800', 'Signature', 2
FROM public.menu_categories WHERE slug = 'hamburguesas';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Mushroom Swiss', 'Smash patty, champiñones salteados, queso suizo, rúcula y mayonesa de trufa', 13.90,
  'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800', NULL, 3
FROM public.menu_categories WHERE slug = 'hamburguesas';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Spicy Diablo', 'Smash patty, queso pepper jack, guacamole, pico de gallo y salsa habanero', 14.90,
  'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800', 'Picante', 4
FROM public.menu_categories WHERE slug = 'hamburguesas';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Alitas BBQ', '8 alitas de pollo con salsa BBQ ahumada casera y dip de queso azul', 9.90,
  'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800', 'Best Seller', 1
FROM public.menu_categories WHERE slug = 'entrantes';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Onion Rings', 'Aros de cebolla rebozados en panko con salsa ranch casera', 6.90,
  'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800', NULL, 2
FROM public.menu_categories WHERE slug = 'entrantes';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Smash Brownie', 'Brownie de chocolate caliente con helado de vainilla y caramelo salado', 7.50,
  'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800', 'Nuevo', 1
FROM public.menu_categories WHERE slug = 'postres';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Milkshake Clásico', 'Batido artesanal de vainilla, chocolate o fresa. Grosor legendario', 6.90,
  'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800', NULL, 1
FROM public.menu_categories WHERE slug = 'bebidas';

INSERT INTO public.menu_items (category_id, name, description, price, image_url, badge, display_order)
SELECT id, 'Limonada Casera', 'Limonada fresca con hierbabuena, jengibre y un toque de chile', 4.50,
  'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800', NULL, 2
FROM public.menu_categories WHERE slug = 'bebidas';

-- ================================================================
-- Para hacer admin a un usuario (ejecutar DESPUÉS de registrarte):
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'TU-USER-UUID';
-- ================================================================
