"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LearningPostForm from "./learning-post-form"
import { deleteLearningPost } from "@/app/admin/actions"
import { getLearningPosts } from "@/app/admin/actions"

export default function LearningPostsManager() {
  const [posts, setPosts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleFormComplete = async () => {
    await fetchPosts()
  }

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const data = await getLearningPosts()
      setPosts(data || [])
    } catch (error) {
      console.error("[v0] Error fetching posts:", error)
      alert("Error loading posts")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteLearningPost(id)
        setPosts(posts.filter((p) => p.id !== id))
        alert("Post deleted successfully!")
      } catch (error) {
        console.error("[v0] Error deleting post:", error)
        alert("Error deleting post")
      }
    }
  }

  const publishedPosts = posts.filter((p) => p.published)
  const draftPosts = posts.filter((p) => !p.published)
  const filteredPublished = publishedPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const filteredDrafts = draftPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (editingId) {
    const editingPost = posts.find((p) => p.id === editingId)
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Edit Post</h3>
        <LearningPostForm
          editItem={editingPost}
          onEditComplete={() => {
            setEditingId(null)
            fetchPosts()
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
        <LearningPostForm onEditComplete={handleFormComplete} />
      </div>

      <div className="mt-8">
        <Input
          placeholder="Search posts by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <Tabs defaultValue="published" className="w-full">
          <TabsList>
            <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="space-y-3">
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : filteredPublished.length === 0 ? (
              <p className="text-gray-500">No published posts</p>
            ) : (
              filteredPublished.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{post.title}</h4>
                      <p className="text-sm text-gray-600">{post.category}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted: {new Date(post.created_at).toLocaleDateString()}
                      </p>
                      {post.image_url && (
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt={post.title}
                          className="mt-2 w-32 h-24 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(post.id)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-3">
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : filteredDrafts.length === 0 ? (
              <p className="text-gray-500">No drafts</p>
            ) : (
              filteredDrafts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{post.title}</h4>
                      <p className="text-sm text-gray-600">{post.category}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(post.created_at).toLocaleDateString()}
                      </p>
                      {post.image_url && (
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt={post.title}
                          className="mt-2 w-32 h-24 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(post.id)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
