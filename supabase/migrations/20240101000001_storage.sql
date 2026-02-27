-- Enable storage if not already
-- (Storage extension is usually enabled by default)

-- Create buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('courses', 'courses', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for Products bucket
-- Public read
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'products');
-- Admin upload/delete
CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'products' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'products' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'products' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for Courses bucket
CREATE POLICY "Public Access Courses" ON storage.objects FOR SELECT USING (bucket_id = 'courses');
CREATE POLICY "Admin Insert Courses" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'courses' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
