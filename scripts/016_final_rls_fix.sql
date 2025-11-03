-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access to news_events" ON news_events;
DROP POLICY IF EXISTS "Allow authenticated users to manage news_events" ON news_events;
DROP POLICY IF EXISTS "Allow public read access to testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public read access to gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated users to manage gallery" ON gallery;
DROP POLICY IF EXISTS "Allow anyone to submit volunteer forms" ON volunteers;
DROP POLICY IF EXISTS "Allow authenticated users to view volunteers" ON volunteers;
DROP POLICY IF EXISTS "Allow authenticated users to check admin status" ON admin_users;

-- Disable RLS temporarily to ensure clean slate
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE news_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create simple, permissive policies for projects
CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Anyone can manage projects"
  ON projects FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create simple, permissive policies for news_events
CREATE POLICY "Anyone can read news_events"
  ON news_events FOR SELECT
  USING (true);

CREATE POLICY "Anyone can manage news_events"
  ON news_events FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create simple, permissive policies for testimonials
CREATE POLICY "Anyone can read testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Anyone can manage testimonials"
  ON testimonials FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create simple, permissive policies for gallery
CREATE POLICY "Anyone can read gallery"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Anyone can manage gallery"
  ON gallery FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create simple, permissive policies for volunteers
CREATE POLICY "Anyone can read volunteers"
  ON volunteers FOR SELECT
  USING (true);

CREATE POLICY "Anyone can manage volunteers"
  ON volunteers FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create simple, permissive policies for admin_users
CREATE POLICY "Anyone can read admin_users"
  ON admin_users FOR SELECT
  USING (true);

CREATE POLICY "Anyone can manage admin_users"
  ON admin_users FOR ALL
  USING (true)
  WITH CHECK (true);
