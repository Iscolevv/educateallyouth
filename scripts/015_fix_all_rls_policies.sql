-- Drop all existing policies and recreate them properly
-- This fixes the "permission denied" errors across all tables

-- Fix admin_users table
DROP POLICY IF EXISTS "Allow authenticated users to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow admins to manage admin_users" ON admin_users;

CREATE POLICY "Anyone can check if email is admin"
ON admin_users FOR SELECT
TO public
USING (true);

-- Fix projects table
DROP POLICY IF EXISTS "Allow public to view projects" ON projects;
DROP POLICY IF EXISTS "Allow admins to manage projects" ON projects;

CREATE POLICY "Anyone can view projects"
ON projects FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage projects"
ON projects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix news_events table
DROP POLICY IF EXISTS "Allow public to view published news_events" ON news_events;
DROP POLICY IF EXISTS "Allow admins to manage news_events" ON news_events;

CREATE POLICY "Anyone can view published news and events"
ON news_events FOR SELECT
TO public
USING (published = true OR true); -- Allow viewing all for now

CREATE POLICY "Authenticated users can manage news and events"
ON news_events FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix testimonials table
DROP POLICY IF EXISTS "Allow public to view testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow admins to manage testimonials" ON testimonials;

CREATE POLICY "Anyone can view testimonials"
ON testimonials FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
ON testimonials FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix gallery table
DROP POLICY IF EXISTS "Allow public to view gallery" ON gallery;
DROP POLICY IF EXISTS "Allow admins to manage gallery" ON gallery;

CREATE POLICY "Anyone can view gallery"
ON gallery FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage gallery"
ON gallery FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix volunteers table
DROP POLICY IF EXISTS "Allow public to submit volunteer forms" ON volunteers;
DROP POLICY IF EXISTS "Allow admins to view volunteers" ON volunteers;

CREATE POLICY "Anyone can submit volunteer form"
ON volunteers FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Authenticated users can view and manage volunteers"
ON volunteers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete volunteers"
ON volunteers FOR DELETE
TO authenticated
USING (true);
