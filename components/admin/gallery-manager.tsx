import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GalleryForm from "./gallery-form"
import GalleryList from "./gallery-list"

export default async function GalleryManager() {
  const supabase = await createClient()

  const { data: gallery } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Gallery Image</CardTitle>
        </CardHeader>
        <CardContent>
          <GalleryForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
          <GalleryList gallery={gallery || []} />
        </CardContent>
      </Card>
    </div>
  )
}
