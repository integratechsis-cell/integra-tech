-- Add is_active column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing profiles to be active
UPDATE public.profiles SET is_active = true WHERE is_active IS NULL;

-- Create a function to toggle user status securely
CREATE OR REPLACE FUNCTION toggle_user_status(user_id UUID, status BOOLEAN)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET is_active = status
  WHERE id = user_id;
  
  -- Optionally, you could also ban/unban the auth user here if you had access to auth schema
  -- usually requires security definer and careful permissions
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
