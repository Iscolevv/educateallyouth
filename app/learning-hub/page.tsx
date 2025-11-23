import { createClient } from "@supabase/supabase-js"
import type { Metadata } from "next"
import LearningHubClient from "@/components/learning-hub-client"

export const metadata: Metadata = {
  title: "Learning Hub - EducateAll Youth",
  description:
    "Access study tips, scholarships alerts, career guidance, and digital literacy lessons from EducateAll Youth Initiative.",
}

export const revalidate = 0

export default async function LearningHubPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")

  let posts = []
  try {
    const { data, error } = await supabase
      .from("learning_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (data) {
      posts = data
    }
    if (error) {
      console.warn("[v0] Learning Hub query warning:", error)
    }
  } catch (error) {
    console.warn("[v0] Learning Hub fetch failed, using empty state:", error)
    posts = []
  }

  console.log("[v0] Posts loaded:", posts.length)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Learning Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover valuable insights, tips, and guidance to accelerate your learning journey.
          </p>
        </div>

        <LearningHubClient initialPosts={posts} />
      </div>
    </div>
  )
}
