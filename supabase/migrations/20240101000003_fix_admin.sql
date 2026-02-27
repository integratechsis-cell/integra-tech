-- Update the user with email containing 'admin' to be an admin
UPDATE public.profiles
SET role = 'admin'
WHERE email ILIKE '%admin%' OR full_name ILIKE '%admin%';
