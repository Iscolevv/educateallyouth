import { createClient } from "@/lib/supabase/server"
import { Metadata } from "next"
import LearningHubClient from "@/components/learning-hub-client"

export const metadata: Metadata = {
  title: "Learning Hub - EducateAll Youth",
  description: "Access study tips, scholarships alerts, career guidance, and digital literacy lessons from EducateAll Youth Initiative.",
}

export const revalidate = 0

export default async function LearningHubPage() {
  try {
    const supabase = await createClient()
    
    console.log("[v0] Fetching learning posts...")
    const { data: posts, error } = await supabase
      .from("learning_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching learning posts:", error.message, error.details)
      return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Learning Hub</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover valuable insights, tips, and guidance to accelerate your learning journey.
              </p>
            </div>
            <div className="text-center py-12">
              <p className="text-lg text-red-600">Error loading posts. Please try again later.</p>
            </div>
          </div>
        </div>
      )
    }

    console.log("[v0] Learning posts fetched successfully:", posts?.length || 0)

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Learning Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover valuable insights, tips, and guidance to accelerate your learning journey.
            </p>
          </div>

          <LearningHubClient initialPosts={posts || []} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("[v0] Unexpected error in Learning Hub:", error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Hub</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-lg text-red-600">An error occurred. Please refresh the page.</p>
          </div>
        </div>
      </div>
    )
  }
}
