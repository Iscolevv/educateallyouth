-- Add the three new admin emails to the admin_users table
INSERT INTO public.admin_users (email)
VALUES 
  ('christabelaloo28@gmail.com'),
  ('email2@gmail.com'),
  ('email3@gmail.com')
ON CONFLICT (email) DO NOTHING;
