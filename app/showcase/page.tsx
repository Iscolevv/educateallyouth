import { createClient } from '@supabase/supabase-js'
import ShowcaseClient from '@/components/showcase-client'

export const revalidate = 0

export default async function ShowcasePage() {
  try {
    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    const { data: submissions, error } = await adminSupabase
      .from('creative_submissions')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Error fetching submissions:', error)
      throw error
    }

    return <ShowcaseClient initialSubmissions={submissions || []} />
  } catch (error) {
    console.error('[v0] Error in ShowcasePage:', error)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Youth Creative Showcase</h1>
          <p className="text-red-600 mb-8">Error loading submissions. Please try again later.</p>
        </div>
      </main>
    )
  }
}
