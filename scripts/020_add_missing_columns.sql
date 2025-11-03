-- Add beneficiaries column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS beneficiaries integer;

-- Add type column to news_events table (for categorizing as 'news' or 'event')
ALTER TABLE news_events ADD COLUMN IF NOT EXISTS type text DEFAULT 'event';

-- Add comment for clarity
COMMENT ON COLUMN projects.beneficiaries IS 'Number of youth impacted by this project';
COMMENT ON COLUMN news_events.type IS 'Type of entry: news or event';
