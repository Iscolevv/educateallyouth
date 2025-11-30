import { cookies } from "next/headers"
import { redirect } from "next/navigation"
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
  const cookieStore = await cookies()
  const adminAuth = cookieStore.get("admin_auth")

  if (!adminAuth) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader userEmail={""} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="projects" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-2">
            <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent">
              <TabsTrigger
                value="projects"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                News & Events
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="volunteers"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Volunteers
              </TabsTrigger>
              <TabsTrigger
                value="volunteer-stories"
                className="flex-1 min-w-[140px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Stories
              </TabsTrigger>
              <TabsTrigger
                value="learning"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Learning Hub
              </TabsTrigger>
              <TabsTrigger
                value="creative"
                className="flex-1 min-w-[120px] data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Showcase
              </TabsTrigger>
            </TabsList>
          </div>

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
