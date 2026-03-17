
-- Create OTPs table for email verification
CREATE TABLE public.otps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '5 minutes'),
  verified BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Allow public insert
CREATE POLICY "Anyone can create OTPs" ON public.otps
  FOR INSERT TO public WITH CHECK (true);

-- Allow public select
CREATE POLICY "Anyone can read OTPs" ON public.otps
  FOR SELECT TO public USING (true);

-- Allow public update
CREATE POLICY "Anyone can update OTPs" ON public.otps
  FOR UPDATE TO public USING (true);
