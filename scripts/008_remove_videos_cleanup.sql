-- Clear all video_url data from creative_submissions table to free up storage
UPDATE creative_submissions
SET video_url = NULL
WHERE video_url IS NOT NULL;

-- Verify the update
SELECT COUNT(*) as remaining_videos FROM creative_submissions WHERE video_url IS NOT NULL;
