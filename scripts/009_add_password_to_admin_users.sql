-- Add password column to admin_users table
ALTER TABLE admin_users
ADD COLUMN password TEXT;

-- Update existing admin with a test password (change this after first login!)
UPDATE admin_users 
SET password = 'EducateAll2024!' 
WHERE email = 'brianonyangol605@gmail.com';
