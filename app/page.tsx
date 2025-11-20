import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default async function HomePage() {
  const supabase = await createClient()

  const [projectsResult, testimonialsResult, galleryResult, newsEventsResult, storiesResult] = await Promise.all([
    supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }).limit(8),
    supabase.from("news_events").select("*").eq("published", true).order("event_date", { ascending: false }).limit(3),
    supabase.from("volunteer_stories").select("*").eq("status", "approved").order("created_at", { ascending: false }),
  ])

  const projects = projectsResult.data || []
  const testimonials = testimonialsResult.data || []
  const gallery = galleryResult.data || []
  const newsEvents = newsEventsResult.data || []
  const volunteerStories = storiesResult.data || []

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <a href="#about" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    About
                  </a>
                  <a href="#story" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Our Story
                  </a>
                  <a href="#projects" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Projects
                  </a>
                  <a href="#gallery" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Gallery
                  </a>
                  <a href="#testimonials" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Testimonials
                  </a>
                  <a href="#team" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Meet the Team
                  </a>
                  <Link href="/learning-hub" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Learning Hub
                  </Link>
                  <Link href="/showcase" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Youth Showcase
                  </Link>
                  <a href="#volunteer" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    Volunteer
                  </a>
                  <a href="#news" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
                    News & Events
                  </a>
                  <a href="#donate" className="text-lg text-gray-700 hover:text-teal-600 transition-colors">
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
          <div className="hero-instant">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              Where Academic Determination and Service Meets Success 🚀
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              EducateAll Youth Organization is all about YOU - inspiring teenagers like yourself to become visionary
              leaders and impactful members of society. We're not just talking about education; we're talking about
              transformation, empowerment, and breaking down every single barrier that stands in your way. With the
              right mentorship and education, literally EVERYTHING is possible!
            </p>
            <div className="flex gap-4">
              <a href="#volunteer">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Join as a Volunteer</Button>
              </a>
              <a href="#about">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-teal-700 bg-transparent">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          {/* Placeholder for hero image or content */}
          <div className="hidden md:block">{/* Hero image or content goes here */}</div>
        </div>
      </section>
    </div>
  )
}
