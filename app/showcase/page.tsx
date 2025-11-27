import { createClient } from "@supabase/supabase-js"
import ShowcaseClient from "@/components/showcase-client"

export const revalidate = 0

const ITEMS_PER_PAGE = 12

export default async function ShowcasePage() {
  let submissions = []
  let totalCount = 0

  try {
    const adminSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { count } = await adminSupabase
      .from("creative_submissions")
      .select("*", { count: "exact", head: true })
      .eq("published", true)

    totalCount = count || 0

    const { data, error } = await adminSupabase
      .from("creative_submissions")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .range(0, ITEMS_PER_PAGE - 1)

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

  return <ShowcaseClient initialSubmissions={submissions} totalCount={totalCount} itemsPerPage={ITEMS_PER_PAGE} />
}
