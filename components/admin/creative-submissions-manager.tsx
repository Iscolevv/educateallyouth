'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCreativeSubmissions, updateCreativeSubmission, deleteCreativeSubmission } from '@/app/admin/actions'

export default function CreativeSubmissionsManager() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

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
      console.error('Error fetching submissions:', err)
      setError(err instanceof Error ? err.message : 'Failed to load submissions')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await updateCreativeSubmission(id, { published: true })
      await fetchSubmissions()
      alert('Submission approved and published!')
    } catch (error) {
      alert('Error approving submission')
    }
  }

  const handleReject = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteCreativeSubmission(id)
        setSubmissions(submissions.filter(s => s.id !== id))
        alert('Submission deleted!')
      } catch (error) {
        alert('Error deleting submission')
      }
    }
  }

  const pendingSubmissions = submissions.filter(s => !s.published)
  const publishedSubmissions = submissions.filter(s => s.published)
  
  const filteredPending = pendingSubmissions.filter(
    s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.author_name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredPublished = publishedSubmissions.filter(
    s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.author_name.toLowerCase().includes(searchTerm.toLowerCase())
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
            filteredPending.map(submission => (
              <div key={submission.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{submission.title}</h4>
                    <p className="text-sm text-gray-600">By: {submission.author_name}</p>
                    <p className="text-sm text-teal-600 font-semibold">{submission.category}</p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{submission.content}</p>
                    {submission.author_instagram && (
                      <p className="text-sm text-gray-600 mt-1">{submission.author_instagram}</p>
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
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(submission.id)}
                    >
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
            filteredPublished.map(submission => (
              <div key={submission.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{submission.title}</h4>
                    <p className="text-sm text-gray-600">By: {submission.author_name}</p>
                    <p className="text-sm text-teal-600 font-semibold">{submission.category}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(submission.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
