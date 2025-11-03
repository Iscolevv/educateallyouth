-- Allow public (anonymous) users to SELECT from all tables
-- This fixes the "permission denied" errors on the homepage

-- Projects table
DROP POLICY IF EXISTS "projects_select_public" ON projects;
CREATE POLICY "projects_select_public" ON projects FOR SELECT USING (true);

-- News/Events table
DROP POLICY IF EXISTS "news_events_select_public" ON news_events;
CREATE POLICY "news_events_select_public" ON news_events FOR SELECT USING (true);

-- Testimonials table
DROP POLICY IF EXISTS "testimonials_select_public" ON testimonials;
CREATE POLICY "testimonials_select_public" ON testimonials FOR SELECT USING (true);

-- Gallery table
DROP POLICY IF EXISTS "gallery_select_public" ON gallery;
CREATE POLICY "gallery_select_public" ON gallery FOR SELECT USING (true);

-- Volunteers table (for admin to view submissions)
DROP POLICY IF EXISTS "volunteers_select_public" ON volunteers;
CREATE POLICY "volunteers_select_public" ON volunteers FOR SELECT USING (true);

-- Allow anyone to insert into volunteers table (for form submissions)
DROP POLICY IF EXISTS "volunteers_insert_public" ON volunteers;
CREATE POLICY "volunteers_insert_public" ON volunteers FOR INSERT WITH CHECK (true);
