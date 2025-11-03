import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VolunteersList from "./volunteers-list"

export default async function VolunteersManager() {
  const supabase = await createClient()

  const { data: volunteers } = await supabase.from("volunteers").select("*").order("created_at", { ascending: false })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volunteer Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <VolunteersList volunteers={volunteers || []} />
      </CardContent>
    </Card>
  )
}
