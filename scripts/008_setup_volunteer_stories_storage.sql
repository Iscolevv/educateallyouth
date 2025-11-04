-- Create volunteer-stories storage bucket if it doesn't exist
-- Note: This should be run via Supabase dashboard or SQL editor
-- The bucket is needed for storing volunteer story images

-- The following policy configuration should be set:
-- 1. Authentication: Public (anyone can upload)
-- 2. Row level security: Disabled or configured to allow public uploads
-- Storage bucket name: volunteer-stories
-- File path pattern: volunteer-stories/{filename}
