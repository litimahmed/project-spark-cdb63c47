-- Create reservation status enum
CREATE TYPE public.reservation_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  occasion TEXT,
  special_requests TEXT,
  status reservation_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create restaurant settings table (key-value store)
CREATE TABLE public.restaurant_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;

-- Reservations policies
-- Public can insert reservations (for booking)
CREATE POLICY "Anyone can create reservations"
ON public.reservations
FOR INSERT
WITH CHECK (true);

-- Only admins can view all reservations
CREATE POLICY "Admins can view all reservations"
ON public.reservations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update reservations
CREATE POLICY "Admins can update reservations"
ON public.reservations
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete reservations
CREATE POLICY "Admins can delete reservations"
ON public.reservations
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Menu categories policies
-- Anyone can view active categories
CREATE POLICY "Anyone can view active menu categories"
ON public.menu_categories
FOR SELECT
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

-- Only admins can manage categories
CREATE POLICY "Admins can insert menu categories"
ON public.menu_categories
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update menu categories"
ON public.menu_categories
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete menu categories"
ON public.menu_categories
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Menu items policies
-- Anyone can view available items
CREATE POLICY "Anyone can view available menu items"
ON public.menu_items
FOR SELECT
USING (is_available = true OR public.has_role(auth.uid(), 'admin'));

-- Only admins can manage items
CREATE POLICY "Admins can insert menu items"
ON public.menu_items
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update menu items"
ON public.menu_items
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete menu items"
ON public.menu_items
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Gallery images policies
-- Anyone can view active images
CREATE POLICY "Anyone can view active gallery images"
ON public.gallery_images
FOR SELECT
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

-- Only admins can manage gallery
CREATE POLICY "Admins can insert gallery images"
ON public.gallery_images
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
ON public.gallery_images
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Restaurant settings policies
-- Anyone can view settings (public info)
CREATE POLICY "Anyone can view restaurant settings"
ON public.restaurant_settings
FOR SELECT
USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins can insert restaurant settings"
ON public.restaurant_settings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update restaurant settings"
ON public.restaurant_settings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete restaurant settings"
ON public.restaurant_settings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at
BEFORE UPDATE ON public.menu_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_restaurant_settings_updated_at
BEFORE UPDATE ON public.restaurant_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant-images', 'restaurant-images', true);

-- Storage policies for restaurant images
CREATE POLICY "Anyone can view restaurant images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'restaurant-images');

CREATE POLICY "Admins can upload restaurant images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update restaurant images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete restaurant images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));

-- Insert default restaurant settings
INSERT INTO public.restaurant_settings (key, value) VALUES
('hours', '{"monday": {"open": "12:00", "close": "14:30", "dinner_open": "19:00", "dinner_close": "22:30"}, "tuesday": {"open": "12:00", "close": "14:30", "dinner_open": "19:00", "dinner_close": "22:30"}, "wednesday": {"open": "12:00", "close": "14:30", "dinner_open": "19:00", "dinner_close": "22:30"}, "thursday": {"open": "12:00", "close": "14:30", "dinner_open": "19:00", "dinner_close": "22:30"}, "friday": {"open": "12:00", "close": "14:30", "dinner_open": "19:00", "dinner_close": "23:00"}, "saturday": {"open": "12:00", "close": "14:30", "dinner_open": "19:00", "dinner_close": "23:00"}, "sunday": {"closed": true}}'),
('contact', '{"phone": "+33 1 23 45 67 89", "email": "contact@maisonlesept.fr", "address": "7 Rue de la Gastronomie, 75001 Paris"}'),
('about', '{"title": "Notre Histoire", "description": "Fondée en 2010, Maison le Sept est née de la passion du Chef Laurent Dubois pour la cuisine française traditionnelle revisitée."}')