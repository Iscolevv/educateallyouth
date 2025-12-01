import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import ProjectsSection from "@/components/projects-section"
import NewsEventsSection from "@/components/news-events-section"
import TestimonialsSection from "@/components/testimonials-section"
import GallerySection from "@/components/gallery-section"
import VolunteersSection from "@/components/volunteers-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const revalidate = 0

export const metadata: Metadata = {
  title: "EducateAll Youth Organization | Empowering Youth Through Education in Kenya",
  description:
    "EducateAll Youth Organization - Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives and building a brighter future.",
  alternates: {
    canonical: "https://educateallyouth.co.ke",
  },
}

async function getHomeData() {
  const supabase = await createClient()

  const [projectsRes, newsEventsRes, testimonialsRes, galleryRes, volunteersRes] = await Promise.allSettled([
    supabase.from("projects").select("*").order("created_at", { ascending: false }),
    supabase.from("news_events").select("*").order("created_at", { ascending: false }),
    supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }),
    supabase.from("volunteers").select("*").order("created_at", { ascending: false }),
  ])

  return {
    projects: projectsRes.status === "fulfilled" ? projectsRes.value.data || [] : [],
    newsEvents: newsEventsRes.status === "fulfilled" ? newsEventsRes.value.data || [] : [],
    testimonials: testimonialsRes.status === "fulfilled" ? testimonialsRes.value.data || [] : [],
    gallery: galleryRes.status === "fulfilled" ? galleryRes.value.data || [] : [],
    volunteers: volunteersRes.status === "fulfilled" ? volunteersRes.value.data || [] : [],
  }
}

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ProjectsSection projects={data.projects} />
      <NewsEventsSection newsEvents={data.newsEvents} />
      <TestimonialsSection testimonials={data.testimonials} />
      <GallerySection gallery={data.gallery} />
      <VolunteersSection volunteers={data.volunteers} />
      <ContactSection />
      <Footer />
    </main>
  )
}
