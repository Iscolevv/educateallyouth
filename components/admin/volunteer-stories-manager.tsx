"use client"

import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Eye } from "lucide-react"

interface VolunteerStory {
  id: string
  full_name: string
  email: string
  phone: string | null
  project_title: string
  location: string
  activity_date: string
  description: string
  category: string
  image_urls: string[]
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function VolunteerStoriesManager() {
  const [selectedStory, setSelectedStory] = useState<VolunteerStory | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .then((d) => d.data || [])
  const { data: stories = [], mutate } = useSWR("/api/admin/volunteer-stories", fetcher)

  const handleApprove = async (storyId: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/volunteer-stories/${storyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      })
      if (response.ok) {
        mutate()
      }
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReject = async (storyId: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/volunteer-stories/${storyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      })
      if (response.ok) {
        mutate()
      }
    } finally {
      setIsUpdating(false)
    }
  }

  const pendingStories = stories.filter((s: VolunteerStory) => s.status === "pending")
  const approvedStories = stories.filter((s: VolunteerStory) => s.status === "approved")
  const rejectedStories = stories.filter((s: VolunteerStory) => s.status === "rejected")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{pendingStories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{approvedStories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{rejectedStories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Stories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pending Review</h3>
        <div className="space-y-4">
          {pendingStories.length === 0 ? (
            <p className="text-muted-foreground">No pending submissions</p>
          ) : (
            pendingStories.map((story: VolunteerStory) => (
              <Card key={story.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{story.project_title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        by {story.full_name} • {story.category}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedStory(story)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{story.description.substring(0, 200)}...</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" onClick={() => handleApprove(story.id)} disabled={isUpdating}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(story.id)}
                      disabled={isUpdating}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Modal for viewing full story */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedStory.project_title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedStory.full_name} • {selectedStory.email} {selectedStory.phone && `• ${selectedStory.phone}`}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedStory(null)}>
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">{selectedStory.location}</p>
                </div>
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-muted-foreground">{new Date(selectedStory.activity_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Category</p>
                  <p className="text-muted-foreground">{selectedStory.category}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">Description</p>
                <p className="text-muted-foreground">{selectedStory.description}</p>
              </div>

              {selectedStory.image_urls.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Images</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedStory.image_urls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url || "/placeholder.svg"}
                        alt={`Image ${idx}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedStory.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      handleApprove(selectedStory.id)
                      setSelectedStory(null)
                    }}
                    disabled={isUpdating}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedStory.id)
                      setSelectedStory(null)
                    }}
                    disabled={isUpdating}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
