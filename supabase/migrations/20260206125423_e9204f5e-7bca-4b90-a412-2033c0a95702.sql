-- Create warranty_registrations table
CREATE TABLE public.warranty_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id TEXT NOT NULL UNIQUE,
  product_type TEXT NOT NULL CHECK (product_type IN ('dox', 'lux')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  order_number TEXT NOT NULL,
  purchase_date DATE NOT NULL,
  receipt_url TEXT NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.warranty_registrations ENABLE ROW LEVEL SECURITY;

-- Public can insert (anyone can register their warranty)
CREATE POLICY "Anyone can register warranty"
ON public.warranty_registrations
FOR INSERT
WITH CHECK (true);

-- Only admins can view registrations (using existing admin check pattern)
CREATE POLICY "Admins can view all warranty registrations"
ON public.warranty_registrations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Only admins can update registrations
CREATE POLICY "Admins can update warranty registrations"
ON public.warranty_registrations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Only admins can delete registrations
CREATE POLICY "Admins can delete warranty registrations"
ON public.warranty_registrations
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create storage bucket for warranty receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('warranty-receipts', 'warranty-receipts', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload receipts (for registration)
CREATE POLICY "Anyone can upload warranty receipts"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'warranty-receipts');

-- Only admins can view receipts
CREATE POLICY "Admins can view warranty receipts"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'warranty-receipts'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create index for faster lookups
CREATE INDEX idx_warranty_registrations_order_number ON public.warranty_registrations(order_number);
CREATE INDEX idx_warranty_registrations_email ON public.warranty_registrations(customer_email);
CREATE INDEX idx_warranty_registrations_registration_id ON public.warranty_registrations(registration_id);