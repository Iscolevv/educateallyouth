-- Add sample testimonials
INSERT INTO testimonials (name, role, content, image_url, created_at) VALUES
(
  'Sarah Wanjiku',
  'Program Graduate, 2023',
  'EducateAll Youth Organization completely transformed my perspective on what I could achieve. The mentorship I received helped me discover my passion for technology, and now I''m pursuing a degree in Computer Science. This organization doesn''t just talk about change - they make it happen!',
  '/placeholder.svg?height=200&width=200',
  NOW() - INTERVAL '1 month'
),
(
  'James Omondi',
  'Volunteer & Former Beneficiary',
  'I joined as a shy teenager with no direction. Through the leadership programs and incredible support from the team, I found my voice and purpose. Now I''m back as a volunteer, helping other young people discover their potential just like I did. This place is truly special!',
  '/placeholder.svg?height=200&width=200',
  NOW() - INTERVAL '2 months'
),
(
  'Grace Akinyi',
  'University Student & Mentee',
  'The mentorship program connected me with an amazing professional who guided me through my career decisions. Thanks to EducateAll, I received a full scholarship to university and I''m now studying to become a teacher. I can''t wait to give back to my community!',
  '/placeholder.svg?height=200&width=200',
  NOW() - INTERVAL '3 weeks'
);
