-- Add beneficiaries column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS beneficiaries INTEGER;

-- Add a comment to describe the column
COMMENT ON COLUMN projects.beneficiaries IS 'Number of people who benefited from this project';
