-- Add video_url column to creative_submissions table for video content
ALTER TABLE creative_submissions ADD COLUMN IF NOT EXISTS video_url TEXT;
