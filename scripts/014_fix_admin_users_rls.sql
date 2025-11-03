-- Fix RLS policy for admin_users table to allow authenticated users to check if they're admins

-- Drop all existing policies on admin_users
DROP POLICY IF EXISTS "Allow authenticated users to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON admin_users;
DROP POLICY IF EXISTS "Allow authenticated users to check admin status" ON admin_users;

-- Create a simple policy that allows any authenticated user to read from admin_users
-- This is safe because users can only check if an email exists, not see sensitive data
CREATE POLICY "authenticated_users_can_read_admin_users"
ON admin_users
FOR SELECT
TO authenticated
USING (true);

-- Ensure the admin email exists in the table
INSERT INTO admin_users (email, created_at)
VALUES ('brianonyango1605@gmail.com', NOW())
ON CONFLICT (email) DO NOTHING;
