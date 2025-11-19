import { createClient } from "@/lib/supabase/server"
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectsManager from "@/components/admin/projects-manager"
import NewsEventsManager from "@/components/admin/news-events-manager"
import TestimonialsManager from "@/components/admin/testimonials-manager"
import GalleryManager from "@/components/admin/gallery-manager"
import VolunteersManager from "@/components/admin/volunteers-manager"
import AdminHeader from "@/components/admin/admin-header"
import VolunteerStoriesManager from "@/components/admin/volunteer-stories-manager"
import LearningPostsManager from "@/components/admin/learning-posts-manager"
import CreativeSubmissionsManager from "@/components/admin/creative-submissions-manager"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userEmail={user.email || ""} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:inline-grid">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="news">News & Events</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="volunteer-stories">Volunteer Stories</TabsTrigger>
            <TabsTrigger value="learning">Learning Hub</TabsTrigger>
            <TabsTrigger value="creative">Creative Showcase</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="news">
            <NewsEventsManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="volunteers">
            <VolunteersManager />
          </TabsContent>

          <TabsContent value="volunteer-stories">
            <VolunteerStoriesManager />
          </TabsContent>

          <TabsContent value="learning">
            <LearningPostsManager />
          </TabsContent>

          <TabsContent value="creative">
            <CreativeSubmissionsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
