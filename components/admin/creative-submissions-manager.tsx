"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import {
  getCreativeSubmissions,
  deleteCreativeSubmission,
  updateCreativeSubmissionFull,
  approveCreativeSubmission,
} from "@/app/admin/actions"
import { X, Edit2, Save } from "lucide-react"

export default function CreativeSubmissionsManager() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

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

  const startEditing = (submission: any) => {
    setEditingId(submission.id)
    setEditForm({
      title: submission.title,
      content: submission.content,
      category: submission.category,
      author_name: submission.author_name,
      author_email: submission.author_email,
      author_phone: submission.author_phone || "",
      author_bio: submission.author_bio || "",
      author_instagram: submission.author_instagram || "",
      image_url: submission.image_url || "",
    })
  }

  const handleSaveEdit = async (id: string) => {
    try {
      await updateCreativeSubmissionFull(id, editForm)
      setEditingId(null)
      await fetchSubmissions()
      alert("Submission updated successfully!")
    } catch (error) {
      alert("Error updating submission")
    }
  }

  const handleRemoveImage = async (id: string) => {
    if (confirm("Remove image from this submission?")) {
      try {
        await updateCreativeSubmissionFull(id, { image_url: null })
        await fetchSubmissions()
        alert("Image removed successfully!")
      } catch (error) {
        alert("Error removing image")
      }
    }
  }

  const handleReplaceImage = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const imageBase64 = event.target?.result as string
        await updateCreativeSubmissionFull(id, { image_url: imageBase64 })
        await fetchSubmissions()
        alert("Image replaced successfully!")
      }
      reader.readAsDataURL(file)
    } catch (error) {
      alert("Error replacing image")
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await approveCreativeSubmission(id)
      await fetchSubmissions()
      alert("Submission approved and published!")
    } catch (error) {
      alert("Error approving submission")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        await deleteCreativeSubmission(id)
        setSubmissions(submissions.filter((s) => s.id !== id))
        alert("Submission deleted!")
      } catch (error) {
        alert("Error deleting submission")
      }
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

  const SubmissionCard = ({ submission, isPending }: any) => {
    const isEditing = editingId === submission.id
    const isViewing = viewingId === submission.id

    if (isEditing) {
      return (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={4}
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full border rounded p-2 text-sm"
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                >
                  <option value="Poems">Poems</option>
                  <option value="Art">Art</option>
                  <option value="Spoken Art">Spoken Art</option>
                  <option value="Short Stories">Short Stories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author Name</label>
                <Input
                  value={editForm.author_name}
                  onChange={(e) => setEditForm({ ...editForm, author_name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={editForm.author_email}
                  onChange={(e) => setEditForm({ ...editForm, author_email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Instagram</label>
                <Input
                  value={editForm.author_instagram}
                  placeholder="@username"
                  onChange={(e) => setEditForm({ ...editForm, author_instagram: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={2}
                value={editForm.author_bio}
                onChange={(e) => setEditForm({ ...editForm, author_bio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              {editForm.image_url && (
                <div className="mb-3 relative">
                  {editForm.image_url.startsWith("data:") ? (
                    <img
                      src={editForm.image_url || "/placeholder.svg"}
                      alt="preview"
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">Image stored</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveImage(submission.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <label className="block cursor-pointer bg-indigo-100 hover:bg-indigo-200 border-2 border-dashed border-indigo-300 rounded p-3 text-center text-sm font-medium text-indigo-700">
                <span>Click to replace image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleReplaceImage(submission.id, e)}
                />
              </label>
            </div>
            <div className="flex gap-2 justify-end pt-3 border-t">
              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleSaveEdit(submission.id)}
              >
                <Save size={16} className="mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card className="p-4 border hover:shadow-md transition">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-bold text-base text-gray-900">{submission.title}</h4>
              <p className="text-xs text-gray-600 mt-1">
                By: <span className="font-semibold">{submission.author_name}</span>
              </p>
              <div className="flex gap-2 mt-2">
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                  {submission.category}
                </span>
                {submission.published && (
                  <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    Published
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{submission.content}</p>
              {submission.author_instagram && (
                <p className="text-xs text-gray-600 mt-1">{submission.author_instagram}</p>
              )}
            </div>
            {submission.image_url && (
              <div className="w-16 h-16 ml-3 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                Image
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-2 border-t flex-wrap">
            <Button size="sm" variant="outline" onClick={() => startEditing(submission)}>
              <Edit2 size={14} className="mr-1" />
              Edit
            </Button>
            {isPending && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApprove(submission.id)}
              >
                Approve
              </Button>
            )}
            <Button size="sm" variant="destructive" onClick={() => handleDelete(submission.id)}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Creative Submissions Management</h3>
        <p className="text-sm text-gray-600">
          Full control over all submissions - edit, approve, delete, and manage images
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <Input
        placeholder="Search by title or author name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedSubmissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredPending.length === 0 ? (
            <p className="text-gray-500">No pending submissions</p>
          ) : (
            filteredPending.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} isPending={true} />
            ))
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-3 mt-4">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredPublished.length === 0 ? (
            <p className="text-gray-500">No published submissions</p>
          ) : (
            filteredPublished.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} isPending={false} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
