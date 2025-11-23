import { createClient } from "@supabase/supabase-js"
import ShowcaseClient from "@/components/showcase-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 0

export default async function ShowcasePage() {
  let submissions = []
  try {
    const adminSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data, error } = await adminSupabase
      .from("creative_submissions")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (data) {
      submissions = data
    }
    if (error) {
      console.warn("[v0] Showcase query warning:", error)
    }
  } catch (error) {
    console.warn("[v0] Showcase fetch failed, using empty state:", error)
    submissions = []
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Youth Creative Showcase</h1>
          <p className="text-xl text-slate-600 mb-8">
            Discover creative expressions from talented youth. Share your poems, art, spoken art, and stories with our
            community.
          </p>
          <Link href="/showcase/submit">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg font-semibold">
              Share Your Talent
            </Button>
          </Link>
        </div>

        <ShowcaseClient initialSubmissions={submissions} />
      </div>
    </main>
  )
}
