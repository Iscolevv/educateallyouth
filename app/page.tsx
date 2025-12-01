import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { NewsEventsSection } from "@/components/news-events-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GallerySection } from "@/components/gallery-section"
import { VolunteersSection } from "@/components/volunteers-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const revalidate = 30

export const metadata: Metadata = {
  title: "EducateAll Youth Organization | Empowering Youth Through Education in Kenya",
  description:
    "EducateAll Youth Organization - Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives and building a brighter future.",
  alternates: {
    canonical: "https://educateallyouth.co.ke",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ProjectsSection />
      <NewsEventsSection />
      <TestimonialsSection />
      <GallerySection />
      <VolunteersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
