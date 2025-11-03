"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function VolunteersList({ volunteers }: { volunteers: any[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    const supabase = createClient()
    const { error } = await supabase.from("volunteers").delete().eq("id", id)

    if (error) {
      alert("Error deleting submission")
      return
    }

    router.refresh()
  }

  if (volunteers.length === 0) {
    return <p className="text-gray-500">No volunteer submissions yet.</p>
  }

  return (
    <div className="space-y-4">
      {volunteers.map((volunteer) => (
        <div key={volunteer.id} className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg">{volunteer.name}</h3>
          <p className="text-gray-600">Email: {volunteer.email}</p>
          {volunteer.phone && <p className="text-gray-600">Phone: {volunteer.phone}</p>}
          {volunteer.message && (
            <p className="text-gray-600 mt-2">
              <strong>Message:</strong> {volunteer.message}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">Submitted: {new Date(volunteer.created_at).toLocaleString()}</p>
          <Button onClick={() => handleDelete(volunteer.id)} size="sm" variant="outline" className="text-red-600 mt-3">
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
