"use client"

import { Hero } from "./hero"
import { ProjectsSection } from "./projects-section"
import { NewsEventsSection } from "./news-events-section"
import { TestimonialsSection } from "./testimonials-section"
import { GallerySection } from "./gallery-section"
import { VolunteersSection } from "./volunteers-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"

export function HomepageWrapper() {
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
