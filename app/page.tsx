import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import {
  Linkedin,
  Mail,
  Instagram,
  Menu,
  Home,
  BookOpen,
  FolderKanban,
  ImageIcon,
  MessageSquare,
  Users,
  GraduationCap,
  Palette,
  Heart,
  Newspaper,
  DollarSign,
  Shield,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import TeamCarousel from "@/components/TeamCarousel" // Assuming TeamCarousel is in components/TeamCarousel.tsx
import { TestimonialsCarousel } from "@/components/testimonials-carousel" // Added import
import { NewsEventsSection } from "@/components/news-events-section" // Import the new client-side NewsEventsSection component instead of rendering inline
// Removed: unstable_noStore as noStore - This is no longer needed as we are using revalidate
import { HomepageWrapper } from "@/components/homepage-wrapper" // Assuming HomepageWrapper is correctly imported

export const revalidate = 60 // Regenerate page every 60 seconds
// Removed: dynamic, fetchCache - these were causing conflicts

async function HomePageContent({
  projects,
  testimonials,
  gallery,
  newsEvents,
  volunteerStories,
}: {
  projects: any[]
  testimonials: any[]
  gallery: any[]
  newsEvents: any[]
  volunteerStories: any[]
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg width="280" height="80" viewBox="0 0 350 80" className="w-auto h-12" fill="none">
                <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#0284C7">
                  EducateAll
                </text>
                <text
                  x="0"
                  y="55"
                  fontFamily="Arial, sans-serif"
                  fontSize="12"
                  fontWeight="500"
                  fill="#9CA3AF"
                  letterSpacing="1.5"
                >
                  YOUTH ORGANIZATION
                </text>
                <line x1="0" y1="65" x2="220" y2="65" stroke="#FCD34D" strokeWidth="2" />
              </svg>
              <span className="font-semibold text-gray-900 hidden sm:inline">EducateAll Youth</span>
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

            {/* Mobile Navigation - Modernized with icons, better spacing, and visual hierarchy */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-teal-50">
                  <Menu className="h-6 w-6 text-teal-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header with logo */}
                  <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6">
                    <svg width="280" height="80" viewBox="0 0 350 80" className="w-auto h-10" fill="none">
                      <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#FFFFFF">
                        EducateAll
                      </text>
                      <text
                        x="0"
                        y="55"
                        fontFamily="Arial, sans-serif"
                        fontSize="12"
                        fontWeight="500"
                        fill="#E0F2FE"
                        letterSpacing="1.5"
                      >
                        YOUTH ORGANIZATION
                      </text>
                      <line x1="0" y1="65" x2="220" y2="65" stroke="#FCD34D" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-1 px-3">
                      <a
                        href="#about"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <Home className="h-5 w-5" />
                        <span className="font-medium">About</span>
                      </a>
                      <a
                        href="#story"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <BookOpen className="h-5 w-5" />
                        <span className="font-medium">Our Story</span>
                      </a>
                      <a
                        href="#projects"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <FolderKanban className="h-5 w-5" />
                        <span className="font-medium">Projects</span>
                      </a>
                      <a
                        href="#gallery"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <ImageIcon className="h-5 w-5" />
                        <span className="font-medium">Gallery</span>
                      </a>
                      <a
                        href="#testimonials"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-medium">Testimonials</span>
                      </a>
                      <a
                        href="#team"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <Users className="h-5 w-5" />
                        <span className="font-medium">Meet the Team</span>
                      </a>
                      <Link
                        href="/learning-hub"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <GraduationCap className="h-5 w-5" />
                        <span className="font-medium">Learning Hub</span>
                      </Link>
                      <Link
                        href="/showcase"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <Palette className="h-5 w-5" />
                        <span className="font-medium">Youth Showcase</span>
                      </Link>
                      <a
                        href="#volunteer"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <Heart className="h-5 w-5" />
                        <span className="font-medium">Volunteer</span>
                      </a>
                      <a
                        href="#news"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <Newspaper className="h-5 w-5" />
                        <span className="font-medium">News & Events</span>
                      </a>
                      <a
                        href="#donate"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-all"
                      >
                        <DollarSign className="h-5 w-5" />
                        <span className="font-medium">Support & Donate</span>
                      </a>
                    </div>
                  </div>

                  {/* Admin Button at bottom */}
                  <div className="p-4 border-t bg-gray-50">
                    <Link href="/admin/login" className="block">
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3 shadow-lg">
                        <Shield className="h-5 w-5 mr-2" />
                        Admin Portal
                      </Button>
                    </Link>
                  </div>
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
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                  Learn Our Mission
                </Button>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center hero-instant">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold mb-4">
                <span className="text-red-500">e</span>
                <span className="text-blue-600">d</span>
                <span className="text-purple-600">u</span>
                <span className="text-orange-500">c</span>
                <span className="text-red-500">a</span>
                <span className="text-green-600">t</span>
                <span className="text-blue-600">i</span>
                <span className="text-purple-600">o</span>
                <span className="text-gray-800">n</span>
              </div>
              <div className="text-6xl md:text-7xl font-bold">
                <span className="text-blue-600">f</span>
                <span className="text-orange-500">o</span>
                <span className="text-green-600">r</span>
                <span className="text-red-500"> a</span>
                <span className="text-purple-600">l</span>
                <span className="text-blue-600">l</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="bg-gradient-to-br from-white via-teal-50 to-white py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-balance">
            About EducateAll Youth Organization ⭐
          </h2>
          <div className="space-y-8 text-lg leading-relaxed max-w-4xl">
            <p className="text-gray-800 font-medium">
              Welcome to EducateAll Youth Organization - where dreams meet opportunity! We're a passionate non-profit
              organization on a mission to inspire teenagers to become visionary leaders and impactful members of
              society. For the past 4 incredible years, we've been dedicated to building great leaders and transforming
              society through quality education and mentorship that actually makes a difference!
            </p>
            <p className="text-gray-800 font-medium">
              Here's what we believe: Education should be an opportunity for EVERYONE, not just a privilege for the
              wealthy. We're breaking down those old barriers and customs that hold young people back. With great
              mentorship and education, we know that everything - and we mean EVERYTHING - is possible! Our commitment?
              To provide every student with a solid stepping stone toward a brighter, better future.
            </p>
            <p className="text-gray-800 font-medium">
              But we don't stop at traditional education! We're all about developing well-rounded individuals who
              understand their role in society and are equipped with the skills, knowledge, and confidence to make
              meaningful contributions. We invest in our youth because we know that today's teenagers are tomorrow's
              leaders, innovators, and change-makers. That's YOU!
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border-l-4 border-teal-600">
              <h3 className="text-5xl font-bold text-teal-600 mb-3">4 Years</h3>
              <p className="text-xl font-semibold text-gray-900 mb-2">Of Impactful Work</p>
              <p className="text-gray-700">Building leaders and transforming society since our inception</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <h3 className="text-5xl font-bold text-orange-500 mb-3">500+</h3>
              <p className="text-xl font-semibold text-gray-900 mb-2">Youth Empowered</p>
              <p className="text-gray-700">Through our comprehensive mentorship and education programs</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-600">
              <h3 className="text-5xl font-bold text-green-600 mb-3">Countless</h3>
              <p className="text-xl font-semibold text-gray-900 mb-2">Lives Transformed</p>
              <p className="text-gray-700">By breaking barriers and providing opportunities for all</p>
            </div>
          </div>

          {/* Youth-Focused Content Block - Strategic engagement point after stats */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl p-12 text-white shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Explore Youth-Focused Learning & Creative Platforms 🚀
            </h3>
            <p className="text-lg mb-8 leading-relaxed opacity-95">
              Beyond mentorship and education, we've created dedicated spaces for youth to learn digital skills, share
              their creativity, and grow as young leaders. Discover our Learning Hub for educational content and Youth
              Creative Showcase for emerging artists and storytellers.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/learning-hub">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl p-8 transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl hover:scale-105 transform">
                  <div className="text-6xl mb-4 inline-block p-3 bg-blue-100 rounded-xl">📚</div>
                  <h4 className="text-3xl font-bold mb-3 text-blue-900">Learning Hub</h4>
                  <p className="text-gray-700 mb-4 font-medium leading-relaxed">
                    Discover study tips, scholarship alerts, career guidance, and digital literacy lessons curated by
                    experts.
                  </p>
                  <div className="mt-6 text-base font-semibold flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <span className="bg-blue-200 px-4 py-2 rounded-lg text-blue-900">Explore Now →</span>
                  </div>
                </div>
              </Link>
              <Link href="/showcase">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 rounded-2xl p-8 transition-all duration-300 cursor-pointer border-2 border-pink-200 hover:border-pink-400 shadow-lg hover:shadow-2xl hover:scale-105 transform">
                  <div className="text-6xl mb-4 inline-block p-3 bg-pink-100 rounded-xl">🎨</div>
                  <h4 className="text-3xl font-bold mb-3 text-pink-900">Youth Creative Showcase</h4>
                  <p className="text-gray-700 mb-4 font-medium leading-relaxed">
                    Share your poems, art, spoken word, and stories. Get featured, build your portfolio, and inspire
                    others.
                  </p>
                  <div className="mt-6 text-base font-semibold flex items-center gap-2 text-pink-600 hover:text-pink-700">
                    <span className="bg-pink-200 px-4 py-2 rounded-lg text-pink-900">Share Your Work →</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* End of Youth-Focused Content Block */}
        </div>
      </section>
      {/* Our Story Section */}
      <section id="story" className="py-16 md:py-24 bg-gradient-to-br from-teal-50 via-white to-orange-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 text-balance fade-in-up">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-orange-500 mx-auto mb-12 fade-in-up"></div>

            <div className="space-y-8">
              {/* Foundation Story */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-teal-600 fade-in-up">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    2021
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">The Beginning</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Educate All Youth Initiative was founded on{" "}
                      <span className="font-semibold text-teal-600">October 4th, 2021</span>, by Brian Onyango, driven
                      by a deep passion to promote academic equality across Kenya's western region, an area where many
                      public schools face significant resource challenges. What started as a small volunteer effort,
                      mobilizing a few individuals to mentor and support students, soon grew into a dynamic youth-led
                      movement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Growth Story */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500 fade-in-up">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm text-center leading-tight">
                    Growth
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Expanding Our Impact</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Over the years, the organization has expanded its impact, helping bright students access
                      scholarships and sponsorships while launching programs that inspire learning, mentorship, and
                      community engagement. Today, Educate All Youth Initiative operates as a{" "}
                      <span className="font-semibold text-orange-600">nationwide platform</span>, empowering young
                      people across Kenya with the tools, guidance, and opportunities they need to succeed academically.
                    </p>
                  </div>
                </div>
              </div>

              {/* Present & Future */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-600 fade-in-up">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm text-center leading-tight">
                    Today
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sharing Our Journey</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The launch of our website is a step toward sharing our journey with the world. It offers a glimpse
                      into the lives we've touched, the communities we serve, and the possibilities that arise when
                      people come together to champion education. Inspired by the spirit of giving back, much like the
                      ethos celebrated by institutions such as{" "}
                      <span className="font-semibold text-purple-600">Starehe Boys' Centre</span>, our hope is that
                      visitors will connect with our mission and join us in shaping a brighter future for every child.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center fade-in-up">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Join us on this incredible journey of transformation and empowerment!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#volunteer">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                    Become a Volunteer
                  </Button>
                </a>
                <a href="#donate">
                  <Button
                    variant="outline"
                    className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg bg-transparent"
                  >
                    Support Our Mission
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            Our Projects & Initiatives 🎯
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed text-lg fade-in-up">
            Through strategic programs and dedicated initiatives, we are breaking barriers and creating pathways for
            youth success. Each project represents our commitment to providing opportunities that transform lives. We're
            not just making promises - we're making real, tangible change happen every single day!
          </p>

          {projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow fade-in-up">
                  {project.image_url && (
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.beneficiaries > 0 && (
                      <p className="text-teal-600 font-semibold mb-2">{project.beneficiaries} Youth Impacted</p>
                    )}
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            Gallery
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg fade-in-up">
            Check out these amazing moments captured from our programs, events, and the incredible journey of empowering
            youth across our community! Every picture tells a story of transformation and hope.
          </p>

          {gallery && gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-lg group fade-in-up">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {image.caption && <div className="bg-gray-100 p-3 text-gray-700 text-sm">{image.caption}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No images in gallery yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
      {/* Testimonials Section - MOVED */}
      <section id="testimonials" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            What People Say 💬
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed text-lg fade-in-up">
            Real stories from real people whose lives have been transformed through our mentorship, education, and
            community support. These voices represent the thousands of youth we've empowered to chase their dreams and
            become leaders.
          </p>
          <TestimonialsCarousel testimonials={testimonials} />

          <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-12 text-white text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Inspired by These Stories? Make a Difference Today!</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-95">
              Every youth empowered is a future leader created. Join hundreds of volunteers, donors, and mentors who are
              actively transforming lives right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#volunteer">
                <Button className="bg-white text-teal-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg">
                  Volunteer Now
                </Button>
              </a>
              <a href="#donate">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 text-lg">
                  Support Our Mission
                </Button>
              </a>
            </div>
          </div>
          {/* End of Testimonials CTA */}
        </div>
      </section>
      {/* Meet the Team Section */}
      <section id="team" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            Meet the Team
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed fade-in-up">
            Behind EducateAll Youth Organization is a passionate team of young visionaries committed to making education
            accessible and impactful. Together, we lead with purpose, innovation, and service.
          </p>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden fade-in-up">
            <TeamCarousel />
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Brian Onyango Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center" itemScope itemType="https://schema.org/Person">
                  <meta itemProp="name" content="Brian Onyango" />
                  <meta itemProp="jobTitle" content="Founder & Executive Director" />
                  <meta itemProp="email" content="brianonyango1605@gmail.com" />
                  <meta itemProp="affiliation" content="EducateAll Youth Organization" />

                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white text-4xl font-bold mb-4">
                    BO
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Brian Onyango</h3>
                  <p className="text-teal-600 font-semibold mb-4">Founder & Executive Director</p>
                  <p className="text-gray-600 leading-relaxed">
                    Brian Onyango is an alumni of Starehe Boys Centre & School and the Founder of EducateAll Youth
                    Organization. He is passionate about empowering young people through education, mentorship, and
                    community service. He leads the organization's vision and oversees its strategic growth.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Levis Mokaya Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center" itemScope itemType="https://schema.org/Person">
                  <meta itemProp="name" content="Levis Mokaya" />
                  <meta itemProp="jobTitle" content="Project Manager & Developer" />
                  <meta itemProp="affiliation" content="EducateAll Youth Organization" />
                  <link itemProp="url" href="https://www.linkedin.com/in/levis-mokaya" />

                  <img
                    src="/images/img-20251127-081848.jpg"
                    alt="Levis Mokaya - Project Manager & Developer at EducateAll Youth Organization"
                    itemProp="image"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-orange-200"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Levis Mokaya</h3>
                  <p className="text-orange-600 font-semibold mb-4">Project Manager & Developer</p>
                  <p className="text-gray-600 leading-relaxed" itemProp="description">
                    Levis Mokaya is a Data Science student at the University of Nairobi and serves as the Project
                    Manager and Developer for EducateAll Youth Organization. He leads the technical direction of the
                    organization, developing systems that connect volunteers, manage projects, and highlight the group's
                    community impact.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Arsene Mwangi Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center" itemScope itemType="https://schema.org/Person">
                  <meta itemProp="name" content="Arsene Mwangi" />
                  <meta itemProp="jobTitle" content="Programs Coordinator" />
                  <meta itemProp="affiliation" content="EducateAll Youth Organization" />

                  <img
                    src="/images/img-20251127-081905.jpg"
                    alt="Arsene Mwangi - Programs Coordinator at EducateAll Youth Organization"
                    itemProp="image"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-purple-200"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Arsene Mwangi</h3>
                  <p className="text-purple-600 font-semibold mb-4">Programs Coordinator</p>
                  <p className="text-gray-600 leading-relaxed" itemProp="description">
                    Arsene Mwangi is a Software Engineering student at the United States International University
                    (USIU–Africa) and serves as the Programs Coordinator at Educate All Youth Initiative. Passionate
                    about technology, education, and youth empowerment, Arsene plays a key role in coordinating outreach
                    programs, school partnerships, and innovation-driven initiatives. His tech background and leadership
                    spirit bring valuable insight to our mission of making education accessible and impactful for all.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Christabel Aloo Ochieng Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow fade-in-up">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center" itemScope itemType="https://schema.org/Person">
                  <meta itemProp="name" content="Christabel Aloo Ochieng" />
                  <meta itemProp="jobTitle" content="Events & Mobilization Coordinator" />
                  <meta itemProp="affiliation" content="EducateAll Youth Organization" />

                  <img
                    src="/images/img-20251127-082913.jpg"
                    alt="Christabel Aloo Ochieng - Events & Mobilization Coordinator at EducateAll Youth Organization"
                    itemProp="image"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-600 mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Christabel Aloo Ochieng</h3>
                  <p className="text-pink-600 font-semibold mb-4">Events & Mobilization Coordinator</p>
                  <p className="text-gray-600 leading-relaxed" itemProp="description">
                    Christabel Aloo Ochieng is a Law student at Kisii University and serves as the Events & Mobilization
                    Coordinator at EducateAll Youth Initiative. A passionate advocate for political awareness,
                    leadership, and youth empowerment, Christabel plays a vital role in coordinating events and
                    mobilizing audiences, enabling EducateAll Youth Initiative to effectively reach and impact its
                    target communities in line with the organization's vision.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* News & Events Section */}
      <NewsEventsSection newsEvents={newsEvents} />

      {/* Volunteer Section */}
      <section id="volunteer" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            Become a Volunteer
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg fade-in-up">
            Ready to make a real difference? Join our amazing team of volunteers and help us transform lives! Fill out
            the form below and let's start this incredible journey together. We can't wait to meet you!
          </p>

          <Card className="p-6 fade-in-up">
            <form id="volunteer-form" className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" type="text" required placeholder="Enter your full name" className="mt-2" />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="+254 700 000 000" className="mt-2" />
              </div>

              <div>
                <Label htmlFor="availability">Availability (Optional)</Label>
                <Select name="availability">
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="both">Both Weekdays & Weekends</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="interest">Area of Interest (Optional)</Label>
                <Input
                  id="interest"
                  name="interest"
                  type="text"
                  placeholder="e.g., Mentorship, Teaching, Event Planning"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Why do you want to volunteer? *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your motivation and how you'd like to contribute..."
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Submit Application
              </Button>
            </form>
          </Card>
        </div>
      </section>
      {/* Volunteer Stories Section */}
      <section id="volunteer-stories" className="py-16 md:py-24 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            Volunteer Stories
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed fade-in-up">
            Every volunteer has a unique story of impact and transformation. Whether you're mentoring a student,
            organizing a community event, providing healthcare support, helping the elderly, building infrastructure, or
            simply giving your time to serve others, your story matters. We celebrate the everyday heroes who are
            creating change in their communities through acts of service and compassion. Your journey inspires others to
            take action, to serve, and to dream bigger. Share your volunteer experience with us and inspire the next
            generation of changemakers. Together, we're building a movement where service truly reaches all, and every
            voice counts. What will your story be?
          </p>

          <div className="flex justify-center mb-12 fade-in-up">
            <Link href="/volunteer-stories">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                Share Your Volunteer Impact
              </Button>
            </Link>
          </div>

          {volunteerStories && volunteerStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteerStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow fade-in-up">
                  {story.image_urls && story.image_urls.length > 0 && (
                    <img
                      src={story.image_urls[0] || "/placeholder.svg"}
                      alt={story.project_title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-3">
                      {story.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.project_title}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {story.location} • {new Date(story.activity_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 line-clamp-3">{story.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{story.full_name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No volunteer stories shared yet. Be the first to share your impact!</p>
            </div>
          )}
        </div>
      </section>
      {/* Get in Touch Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance fade-in-up">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg fade-in-up">
            Have questions? Want to collaborate? We'd love to hear from you! Connect with us on social media or drop us
            a message.
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap fade-in-up">
            <a
              href="https://www.linkedin.com/in/brian-o-12647a323"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://wa.me/254756288563"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:educateallyouthorganisation@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>

            <a
              href="https://www.instagram.com/isco_levv?igsh=dW02MDVrZ3Z6eHg3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>
      {/* Support & Donate Section */}
      <section id="donate" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance fade-in-up">
            Support Our Mission
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg leading-relaxed fade-in-up">
            Your support helps us continue empowering youth through education and mentorship. Every contribution makes a
            real difference in transforming lives and building a brighter future for our community. Together, we can
            break barriers and create opportunities for all!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up">
            <a
              href="https://wa.me/254756288563?text=Hello!%20I%20would%20like%20to%20support%20EducateAll%20Youth%20Organization.%20Please%20provide%20me%20with%20information%20about%20donations%20and%20how%20I%20can%20help."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Donate via WhatsApp</span>
            </a>
            <p className="text-gray-500 text-sm">Click to inquire about donations and support options</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="40" height="40" viewBox="0 0 200 140" className="w-10 h-10" fill="none">
                  <text x="10" y="70" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="#0284C7">
                    EducateAll
                  </text>
                  <text
                    x="30"
                    y="105"
                    fontFamily="Arial, sans-serif"
                    fontSize="16"
                    fontWeight="500"
                    fill="#9CA3AF"
                    letterSpacing="2"
                  >
                    YOUTH ORGANIZATION
                  </text>
                  <line x1="30" y1="115" x2="185" y2="115" stroke="#FCD34D" strokeWidth="3" />
                </svg>
                <span className="font-semibold">EducateAll Youth</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Inspiring teenagers to be visionary leaders and impactful members of society through quality education
                and mentorship.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <div className="space-y-3">
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
                <a href="#story" className="block text-gray-400 hover:text-white transition-colors">
                  Our Story
                </a>
                <a href="#projects" className="block text-gray-400 hover:text-white transition-colors">
                  Our Projects
                </a>
                <a href="#gallery" className="block text-gray-400 hover:text-white transition-colors">
                  Gallery
                </a>
                <a href="#testimonials" className="block text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </a>
                <a href="#news" className="block text-gray-400 hover:text-white transition-colors">
                  News & Events
                </a>
                <Link href="/learning-hub" className="block text-gray-400 hover:text-white transition-colors">
                  Learning Hub
                </Link>
                <Link href="/showcase" className="block text-gray-400 hover:text-white transition-colors">
                  Youth Showcase
                </Link>
                <a href="#team" className="block text-gray-400 hover:text-white transition-colors">
                  Meet the Team
                </a>
                <a href="#donate" className="block text-gray-400 hover:text-white transition-colors">
                  Support & Donate
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Get Involved</h3>
              <div className="space-y-3">
                <a href="#volunteer" className="block text-gray-400 hover:text-white transition-colors">
                  Become a Volunteer
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
                <Link href="/admin/login" className="block text-gray-400 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-start gap-2">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>educateallyouthorganisation@gmail.com</span>
                </p>
                <p className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>+254 756 288 563</span>
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/brian-o-12647a323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/254756288563"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a
                  href="mailto:educateallyouthorganisation@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/isco_levv?igsh=dW02MDVrZ3Z6eHg3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} EducateAll Youth Organization. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">Empowering youth through education and mentorship since 2021</p>
          </div>
        </div>
      </footer>
      {/* Scroll Animation Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Simple, fast visibility without complex conditions
            document.querySelectorAll('.fade-in-up, .fade-in').forEach(el => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });

            // Volunteer form submission
            const volunteerForm = document.getElementById('volunteer-form');
            if (volunteerForm) {
              volunteerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(volunteerForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const phone = formData.get('phone');
                const availability = formData.get('availability');
                const interest = formData.get('interest');
                const message = formData.get('message');
                
                const whatsappMessage = \`Hello! I'd like to volunteer with EducateAll Youth Organization.\\n\\nName: \${name}\\nEmail: \${email}\\nPhone: \${phone}\\nAvailability: \${availability || 'Not specified'}\\nArea of Interest: \${interest || 'Not specified'}\\n\\nMotivation:\\n\${message}\`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappURL = \`https://wa.me/254756288563?text=\${encodedMessage}\`;
                
                window.open(whatsappURL, '_blank');
                volunteerForm.reset();
              });
            }
          });
        `,
        }}
      />
      <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-3">
        <div className="group relative">
          <Link href="/learning-hub">
            <div className="floating-button bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer">
              <div className="text-2xl">📚</div>
            </div>
          </Link>
          <span className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Learning Hub
          </span>
        </div>
        <div className="group relative">
          <Link href="/showcase">
            <div className="floating-button bg-purple-600 hover:bg-purple-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer">
              <div className="text-2xl">🎨</div>
            </div>
          </Link>
          <span className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Youth Showcase
          </span>
        </div>
      </div>
      {/* End of Floating Buttons */}
    </div>
  )
}

async function HomePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[v0] Missing Supabase environment variables - using empty data")
    return <HomePageContent projects={[]} testimonials={[]} gallery={[]} newsEvents={[]} volunteerStories={[]} />
  }

  const supabase = await createClient()

  try {
    // This way, fast queries render immediately while slow ones fall back to empty data

    const queryWithTimeout = async (query: Promise<any>, timeoutMs = 2000) => {
      return Promise.race([
        query,
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs)),
      ])
    }

    const results = await Promise.allSettled([
      queryWithTimeout(supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(6)),
      queryWithTimeout(supabase.from("testimonials").select("*").order("created_at", { ascending: false })),
      queryWithTimeout(supabase.from("gallery").select("*").order("created_at", { ascending: false }).limit(8)),
      queryWithTimeout(
        supabase
          .from("news_events")
          .select("*")
          .eq("published", true)
          .order("event_date", { ascending: false })
          .limit(3),
      ),
      queryWithTimeout(
        supabase
          .from("volunteer_stories")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(3),
      ),
    ])

    // Extract data from settled promises, defaulting to empty arrays if any fail or timeout
    const projects = results[0].status === "fulfilled" ? results[0].value?.data || [] : []
    const testimonials = results[1].status === "fulfilled" ? results[1].value?.data || [] : []
    const gallery = results[2].status === "fulfilled" ? results[2].value?.data || [] : []
    const newsEvents = results[3].status === "fulfilled" ? results[3].value?.data || [] : []
    const volunteerStories = results[4].status === "fulfilled" ? results[4].value?.data || [] : []

    return (
      <HomepageWrapper>
        <HomePageContent
          projects={projects}
          testimonials={testimonials}
          gallery={gallery}
          newsEvents={newsEvents}
          volunteerStories={volunteerStories}
        />
      </HomepageWrapper>
    )
  } catch (error) {
    console.error("[v0] Error fetching homepage data:", error)
    return (
      <HomepageWrapper>
        <HomePageContent projects={[]} testimonials={[]} gallery={[]} newsEvents={[]} volunteerStories={[]} />
      </HomepageWrapper>
    )
  }
}

export default HomePage
