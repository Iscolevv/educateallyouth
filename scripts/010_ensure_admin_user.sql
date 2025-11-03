-- Ensure admin user exists in admin_users table
INSERT INTO admin_users (email, role)
VALUES ('brianonyango1605@gmail.com', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Update RLS policy to allow authenticated users to check if they're admins
DROP POLICY IF EXISTS "Allow authenticated users to check admin status" ON admin_users;

CREATE POLICY "Allow authenticated users to check admin status"
ON admin_users
FOR SELECT
TO authenticated
USING (true);
