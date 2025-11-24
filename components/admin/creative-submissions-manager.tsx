"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCreativeSubmissions, updateCreativeSubmission, deleteCreativeSubmission } from "@/app/admin/actions"

export default function CreativeSubmissionsManager() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [isEditingImage, setIsEditingImage] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getCreativeSubmissions()
      setSubmissions(data || [])
    } catch (err) {
      console.error("Error fetching submissions:", err)
      setError(err instanceof Error ? err.message : "Failed to load submissions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await updateCreativeSubmission(id, { published: true })
      await fetchSubmissions()
      alert("Submission approved and published!")
    } catch (error) {
      alert("Error approving submission")
    }
  }

  const handleReject = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        await deleteCreativeSubmission(id)
        setSubmissions(submissions.filter((s) => s.id !== id))
        setSelectedSubmission(null)
        alert("Submission deleted!")
      } catch (error) {
        alert("Error deleting submission")
      }
    }
  }

  const handleRemoveImage = async (id: string) => {
    try {
      await updateCreativeSubmission(id, { image_url: null })
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, image_url: null } : s)))
      setSelectedSubmission((prev) => (prev && prev.id === id ? { ...prev, image_url: null } : prev))
      alert("Image removed successfully!")
    } catch (error) {
      alert("Error removing image")
    }
  }

  const handleUpdateImage = async (id: string, newImageUrl: string) => {
    try {
      await updateCreativeSubmission(id, { image_url: newImageUrl })
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, image_url: newImageUrl } : s)))
      setSelectedSubmission((prev) => (prev && prev.id === id ? { ...prev, image_url: newImageUrl } : prev))
      setIsEditingImage(false)
      alert("Image updated successfully!")
    } catch (error) {
      alert("Error updating image")
    }
  }

  const pendingSubmissions = submissions.filter((s) => !s.published)
  const publishedSubmissions = submissions.filter((s) => s.published)

  const filteredPending = pendingSubmissions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.author_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const filteredPublished = publishedSubmissions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.author_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Creative Submissions</h3>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <Input
        placeholder="Search by title or author name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedSubmissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredPending.length === 0 ? (
            <p className="text-gray-500">No pending submissions</p>
          ) : (
            filteredPending.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedSubmission(submission)}>
                    <h4 className="font-semibold text-lg">{submission.title}</h4>
                    <p className="text-sm text-gray-600">By: {submission.author_name}</p>
                    <p className="text-sm text-teal-600 font-semibold">{submission.category}</p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{submission.content}</p>
                    {submission.author_instagram && (
                      <p className="text-sm text-gray-600 mt-1">{submission.author_instagram}</p>
                    )}
                    {submission.image_url && (
                      <div className="mt-2 w-32 h-32 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={submission.image_url || "/placeholder.svg"}
                          alt={submission.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(submission.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(submission.id)}>
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-3">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredPublished.length === 0 ? (
            <p className="text-gray-500">No published submissions</p>
          ) : (
            filteredPublished.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedSubmission(submission)}>
                    <h4 className="font-semibold text-lg">{submission.title}</h4>
                    <p className="text-sm text-gray-600">By: {submission.author_name}</p>
                    <p className="text-sm text-teal-600 font-semibold">{submission.category}</p>
                    {submission.image_url && (
                      <div className="mt-2 w-32 h-32 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={submission.image_url || "/placeholder.svg"}
                          alt={submission.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(submission.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-2xl font-bold mb-4">{selectedSubmission.title}</h3>

            <div className="space-y-3 mb-6">
              <p>
                <strong>Author:</strong> {selectedSubmission.author_name}
              </p>
              <p>
                <strong>Category:</strong> {selectedSubmission.category}
              </p>
              {selectedSubmission.author_instagram && (
                <p>
                  <strong>Instagram:</strong> {selectedSubmission.author_instagram}
                </p>
              )}
              <p>
                <strong>Bio:</strong> {selectedSubmission.author_bio}
              </p>
              <p>
                <strong>Content:</strong> {selectedSubmission.content}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Image</h4>
              {selectedSubmission.image_url ? (
                <div className="space-y-3">
                  <img
                    src={selectedSubmission.image_url || "/placeholder.svg"}
                    alt={selectedSubmission.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsEditingImage(!isEditingImage)}>
                      {isEditingImage ? "Cancel Edit" : "Edit Image"}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleRemoveImage(selectedSubmission.id)}>
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No image attached</p>
              )}

              {isEditingImage && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <Input
                    type="text"
                    placeholder="Paste new image URL"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateImage(selectedSubmission.id, (e.target as HTMLInputElement).value)
                      }
                    }}
                    className="mb-2"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Paste new image URL"]',
                      ) as HTMLInputElement
                      if (input?.value) {
                        handleUpdateImage(selectedSubmission.id, input.value)
                      }
                    }}
                  >
                    Update Image
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
