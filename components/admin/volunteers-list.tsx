"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function VolunteersList({ volunteers, onUpdate }: { volunteers: any[]; onUpdate?: () => void }) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    const supabase = createClient()
    const { error } = await supabase.from("volunteers").delete().eq("id", id)

    if (error) {
      alert("Error deleting submission")
      return
    }

    onUpdate?.()
  }

  if (volunteers.length === 0) {
    return <p className="text-gray-500">No volunteer submissions yet.</p>
  }

  return (
    <div className="space-y-4">
      {volunteers.map((volunteer) => (
        <div key={volunteer.id} className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold text-lg">{volunteer.name}</h3>
          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
            <p className="text-gray-600">
              <strong>Email:</strong> {volunteer.email}
            </p>
            {volunteer.phone && (
              <p className="text-gray-600">
                <strong>Phone:</strong> {volunteer.phone}
              </p>
            )}
            {volunteer.availability && (
              <p className="text-gray-600">
                <strong>Availability:</strong> {volunteer.availability}
              </p>
            )}
            {volunteer.interest && (
              <p className="text-gray-600">
                <strong>Interest Area:</strong> {volunteer.interest}
              </p>
            )}
          </div>
          {volunteer.message && (
            <p className="text-gray-600 mt-3">
              <strong>Message:</strong> {volunteer.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-3">Submitted: {new Date(volunteer.created_at).toLocaleString()}</p>
          <Button onClick={() => handleDelete(volunteer.id)} size="sm" variant="outline" className="text-red-600 mt-4">
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
