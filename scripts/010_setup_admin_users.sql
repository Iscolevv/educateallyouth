-- Delete existing admin users and add new ones with secure access
DELETE FROM admin_users;

-- Insert the 5 authorized admin emails
-- Using plain text for now - passwords should be hashed in production
-- Password: eayo2025 (all admins use same password)
INSERT INTO admin_users (email, password, created_at) VALUES
  ('brianonyangol605@gmail.com', 'eayo2025', NOW()),
  ('mwangiarsene6@gmail.com', 'eayo2025', NOW()),
  ('christabelaloo28@gmail.com', 'eayo2025', NOW()),
  ('levismokaya220@gmail.com', 'eayo2025', NOW()),
  ('educateallyouthorganization@gmail.com', 'eayo2025', NOW());

-- Verify the admins were added
SELECT email FROM admin_users ORDER BY created_at;
