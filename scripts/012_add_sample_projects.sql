-- Add sample projects
INSERT INTO projects (title, description, status, beneficiaries, image_url, created_at) VALUES
(
  'Youth Leadership Summit 2024',
  'An intensive 3-day leadership training program that brought together 150 young leaders from across the region. Participants learned essential leadership skills, public speaking, project management, and community engagement strategies.',
  'Completed',
  150,
  '/placeholder.svg?height=400&width=600',
  NOW() - INTERVAL '2 months'
),
(
  'Digital Literacy Program',
  'A comprehensive 6-month program teaching essential computer skills, coding basics, and digital citizenship to underprivileged youth. Students gained hands-on experience with modern technology and software development.',
  'Ongoing',
  200,
  '/placeholder.svg?height=400&width=600',
  NOW() - INTERVAL '4 months'
),
(
  'Mentorship Connect Initiative',
  'Connecting experienced professionals with ambitious young students for one-on-one mentorship. This program has created over 100 meaningful mentor-mentee relationships that continue to flourish.',
  'Ongoing',
  100,
  '/placeholder.svg?height=400&width=600',
  NOW() - INTERVAL '6 months'
),
(
  'Community Service Challenge',
  'A month-long initiative where youth teams competed to make the biggest positive impact in their communities. Projects ranged from environmental cleanups to tutoring programs.',
  'Completed',
  80,
  '/placeholder.svg?height=400&width=600',
  NOW() - INTERVAL '3 months'
);
