-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow public read access to admin_users" ON admin_users;

-- Create a simple policy that allows anyone to read admin_users for login verification
CREATE POLICY "Allow read access to admin_users for authentication"
ON admin_users FOR SELECT
USING (true);

-- Ensure the admin email exists
INSERT INTO admin_users (email, created_at)
VALUES ('brianonyango1605@gmail.com', NOW())
ON CONFLICT (email) DO NOTHING;
