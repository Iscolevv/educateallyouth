-- This script sets up RLS policies for the creative-submissions storage bucket
-- Note: The bucket must be created manually in Supabase Storage with public read access
-- Name the bucket: creative-submissions

-- RLS Policy: Allow public to read images
CREATE POLICY "Allow public read access on creative-submissions"
ON storage.objects FOR SELECT
USING (bucket_id = 'creative-submissions');

-- RLS Policy: Allow anyone to upload
CREATE POLICY "Allow public uploads to creative-submissions"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'creative-submissions');

-- RLS Policy: Allow admins to delete
CREATE POLICY "Allow admin delete on creative-submissions"
ON storage.objects FOR DELETE
USING (bucket_id = 'creative-submissions' AND auth.role() = 'authenticated');
