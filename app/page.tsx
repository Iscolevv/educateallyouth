import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { Card } from "@/components/ui/card"
import { TeamCarousel } from "@/components/TeamCarousel"

export default async function HomePage() {
  const supabase = await createClient()

  const [
    projectsResult,
    testimonialsResult,
    galleryResult,
    newsEventsResult,
    storiesResult,
    learningPostsResult,
    creativeResult,
  ] = await Promise.all([
    supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }).limit(8),
    supabase.from("news_events").select("*").eq("published", true).order("event_date", { ascending: false }).limit(3),
    supabase.from("volunteer_stories").select("*").eq("status", "approved").order("created_at", { ascending: false }),
    supabase
      .from("learning_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("creative_submissions")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(4),
  ])

  const projects = projectsResult.data || []
  const testimonials = testimonialsResult.data || []
  const gallery = galleryResult.data || []
  const newsEvents = newsEventsResult.data || []
  const volunteerStories = storiesResult.data || []
  const learningPosts = learningPostsResult.data || []
  const creativeSubmissions = creativeResult.data || []

  const teamMembers = [
    {
      id: 1,
      name: "Levis Mokaya",
      role: "Founder & Project Lead",
      bio: "Visionary leader dedicated to empowering youth through education and mentorship.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%2314b8a6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' fontSize='120' fontWeight='bold' textAnchor='middle' dominantBaseline='middle' fill='white' fontFamily='Arial'%3ELM%3C/text%3E%3C/svg%3E",
    },
    {
      id: 2,
      name: "Arsene Mwangi",
      role: "Program Coordinator",
      bio: "Passionate about creating meaningful opportunities for youth development and community impact.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%232563eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' fontSize='120' fontWeight='bold' textAnchor='middle' dominantBaseline='middle' fill='white' fontFamily='Arial'%3EAM%3C/text%3E%3C/svg%3E",
    },
    {
      id: 3,
      name: "Christabel Aloo Ochieng",
      role: "Events & Mobilization Coordinator",
      bio: "Law student at Kisii University, passionate advocate for political awareness and youth empowerment.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23ec4899' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' fontSize='120' fontWeight='bold' textAnchor='middle' dominantBaseline='middle' fill='white' fontFamily='Arial'%3ECA%3C/text%3E%3C/svg%3E",
    },
    {
      id: 4,
      name: "Brian Onyango",
      role: "Technical Advisor",
      bio: "Tech enthusiast committed to leveraging technology for social impact and youth empowerment.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f97316' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' fontSize='120' fontWeight='bold' textAnchor='middle' dominantBaseline='middle' fill='white' fontFamily='Arial'%3EBO%3C/text%3E%3C/svg%3E",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                EA
              </div>
              <span className="font-semibold text-gray-900">EducateAll Youth Organization</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">
                About
              </a>
              <a href="#story" className="text-gray-700 hover:text-teal-600 transition-colors">
                Our Story
              </a>
              <a href="#projects" className="text-gray-700 hover:text-teal-600 transition-colors">
                Projects
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-teal-600 transition-colors">
                Gallery
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-teal-600 transition-colors">
                Testimonials
              </a>
              <a href="#team" className="text-gray-700 hover:text-teal-600 transition-colors">
                Meet the Team
              </a>
              <Link href="/learning-hub" className="text-gray-700 hover:text-teal-600 transition-colors">
                Learning Hub
              </Link>
              <Link href="/showcase" className="text-gray-700 hover:text-teal-600 transition-colors">
                Youth Showcase
              </Link>
              <a href="#volunteer" className="text-gray-700 hover:text-teal-600 transition-colors">
                Volunteer
              </a>
              <a href="#news" className="text-gray-700 hover:text-teal-600 transition-colors">
                News & Events
              </a>
              <a href="#stories" className="text-gray-700 hover:text-teal-600 transition-colors">
                Stories
              </a>
              <a href="#donate" className="text-gray-700 hover:text-teal-600 transition-colors">
                Support & Donate
              </a>
              <Link href="/admin/login">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Admin</Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <a href="#about" className="text-lg text-gray-700 hover:text-teal-600">
                    About
                  </a>
                  <a href="#story" className="text-lg text-gray-700 hover:text-teal-600">
                    Our Story
                  </a>
                  <a href="#projects" className="text-lg text-gray-700 hover:text-teal-600">
                    Projects
                  </a>
                  <a href="#gallery" className="text-lg text-gray-700 hover:text-teal-600">
                    Gallery
                  </a>
                  <a href="#testimonials" className="text-lg text-gray-700 hover:text-teal-600">
                    Testimonials
                  </a>
                  <a href="#team" className="text-lg text-gray-700 hover:text-teal-600">
                    Meet the Team
                  </a>
                  <Link href="/learning-hub" className="text-lg text-gray-700 hover:text-teal-600">
                    Learning Hub
                  </Link>
                  <Link href="/showcase" className="text-lg text-gray-700 hover:text-teal-600">
                    Youth Showcase
                  </Link>
                  <a href="#volunteer" className="text-lg text-gray-700 hover:text-teal-600">
                    Volunteer
                  </a>
                  <a href="#news" className="text-lg text-gray-700 hover:text-teal-600">
                    News & Events
                  </a>
                  <a href="#stories" className="text-lg text-gray-700 hover:text-teal-600">
                    Stories
                  </a>
                  <a href="#donate" className="text-lg text-gray-700 hover:text-teal-600">
                    Support & Donate
                  </a>
                  <Link href="/admin/login">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Admin</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              Where Academic Determination and Service Meets Success 🚀
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
              EducateAll Youth Organization is all about YOU - inspiring teenagers like yourself to become visionary
              leaders and impactful members of society. With the right mentorship and education, literally EVERYTHING is
              possible!
            </p>
            <div className="flex gap-4">
              <a href="#volunteer">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Join as a Volunteer</Button>
              </a>
              <a href="#about">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-teal-50 bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">About EducateAll Youth</h2>
            <p className="text-gray-800 font-medium mb-4 leading-relaxed">
              EducateAll Youth Organization is a passionate movement dedicated to empowering young people through
              quality education, mentorship, and community service.
            </p>
            <p className="text-gray-800 font-medium mb-4 leading-relaxed">
              We believe that every young person has the potential to become a leader. Our mission is to remove barriers
              to education, provide platforms for growth, and inspire a generation of changemakers who will transform
              their communities.
            </p>
            <p className="text-gray-800 font-medium leading-relaxed">
              From providing scholarships to hosting workshops, organizing community projects, and building mentorship
              networks, we create pathways for youth to thrive academically and personally.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-600">
                <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
                <p className="text-gray-700 font-medium">Youth Impacted</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-gray-700 font-medium">Active Volunteers</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-600">
                <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                <p className="text-gray-700 font-medium">Projects</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-pink-600">
                <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
                <p className="text-gray-700 font-medium">Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="container mx-auto px-4 py-16 bg-gray-50 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-balance text-center">Our Story</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-800 font-medium mb-4 leading-relaxed">
            EducateAll Youth Organization was born from a simple yet powerful vision in 2021 to bridge the educational
            gap and empower the youth of Kenya. What started as a grassroots initiative by passionate young people has
            grown into a dynamic platform impacting hundreds of lives.
          </p>
          <p className="text-gray-800 font-medium mb-4 leading-relaxed">
            We recognized that many talented youth face barriers such as limited access to quality education, lack of
            mentorship, and insufficient opportunities for personal growth. We decided to be the change we wanted to
            see.
          </p>
          <p className="text-gray-800 font-medium leading-relaxed">
            Today, EducateAll Youth Organization stands as a beacon of hope and transformation. Through scholarships,
            skills training, mentorship programs, community service projects, and digital learning platforms, we
            continue to inspire and empower young people to reach their full potential and become leaders in their
            communities.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center text-balance">Our Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 h-48 flex items-center justify-center">
                <p className="text-white font-bold text-lg text-center px-4">{project.title}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center text-balance">Gallery</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 rounded-lg overflow-hidden aspect-square hover:scale-105 transition-transform"
            >
              {item.image_url && (
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title || "Gallery"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">What People Say</h2>
          <p className="text-gray-700 text-lg font-medium max-w-2xl mx-auto">
            Hear from the youth and mentors who have been transformed by our programs
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="text-5xl text-teal-600 opacity-30 font-serif leading-none mb-4">"</div>
              <p className="text-gray-800 font-medium leading-relaxed mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {testimonial.image_url ? (
                  <img
                    src={testimonial.image_url || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  {testimonial.role && <p className="text-sm text-gray-600">{testimonial.role}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="team" className="container mx-auto px-4 py-16 bg-gray-50 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center text-balance">Meet the Team</h2>
        <TeamCarousel teamMembers={teamMembers} />
      </section>

      {/* Volunteer Stories Section */}
      <section id="stories" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center text-balance">
          Volunteer Stories
        </h2>
        <p className="text-gray-700 text-lg font-medium text-center mb-12 max-w-2xl mx-auto">
          Inspiring stories from volunteers transforming communities through service and dedication
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteerStories.slice(0, 4).map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                <p className="text-white font-bold text-sm text-center px-4">{story.title}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3">{story.description}</p>
                <p className="text-teal-600 font-semibold text-sm">{story.author_name}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section id="volunteer" className="container mx-auto px-4 py-16 bg-teal-600 rounded-lg text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg mb-8 font-medium">
            Join our growing community of volunteers and help us transform youth lives through education and mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254715476103?text=Hi%20EducateAll%20Youth%20Initiative%2C%20I%20am%20interested%20in%20volunteering%20with%20your%20organization."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-teal-600 hover:bg-gray-100 font-semibold">Volunteer With Us</Button>
            </a>
            <a href="#news">
              <Button variant="outline" className="border-white text-white hover:bg-teal-700 bg-transparent">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section id="news" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center text-balance">News & Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {newsEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 h-40 flex items-center justify-center">
                <p className="text-white font-bold text-center px-4">{event.title}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 font-medium mb-4">{event.description}</p>
                <p className="text-sm text-gray-600">📅 {new Date(event.event_date).toLocaleDateString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Hub Preview */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">Learning Hub</h2>
          <Link href="/learning-hub">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">View All Posts</Button>
          </Link>
        </div>
        <p className="text-gray-700 text-lg font-medium mb-8">
          Discover valuable insights, tips, and guidance to accelerate your learning journey
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {learningPosts.slice(0, 3).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-40 flex items-center justify-center">
                <p className="text-white font-bold text-center px-4">{post.title}</p>
              </div>
              <div className="p-6">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                  {post.category}
                </span>
                <p className="text-gray-700 font-medium line-clamp-2 mb-3">{post.content}</p>
                <p className="text-sm text-gray-600">📅 {new Date(post.created_at).toLocaleDateString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Youth Showcase Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">Youth Creative Showcase</h2>
          <Link href="/showcase">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">View All Creations</Button>
          </Link>
        </div>
        <p className="text-gray-700 text-lg font-medium mb-8">
          Celebrate youth creativity - poems, art, spoken word, and short stories from talented young creators
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creativeSubmissions.slice(0, 4).map((submission) => (
            <Card key={submission.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {submission.image_data && (
                <div className="h-40 overflow-hidden bg-gray-200">
                  <img
                    src={submission.image_data || "/placeholder.svg"}
                    alt={submission.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                  {submission.category}
                </span>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{submission.title}</h3>
                <p className="text-gray-600 text-sm font-medium">By {submission.author_name}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">EducateAll Youth</h3>
              <p className="text-gray-400 text-sm">
                Empowering youth through education, mentorship, and community service since 2021.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <Link href="/learning-hub" className="hover:text-white transition-colors">
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link href="/showcase" className="hover:text-white transition-colors">
                    Youth Showcase
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>📧 educateallyouthorganisation@gmail.com</li>
                <li>📱 +254 715 476 103</li>
                <li>📍 Kenya</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/educateall_youth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/254715476103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2021 EducateAll Youth Organization. All rights reserved. | Website designed by Levis Mokaya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
