"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Share2 } from "lucide-react"

const CREATIVE_CATEGORIES = ["Poems", "Art", "Spoken Art", "Short Stories"]

export default function ShowcaseClient({ initialSubmissions }: { initialSubmissions: any[] }) {
  const [submissions, setSubmissions] = useState<any[]>(initialSubmissions)
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>(initialSubmissions)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const postId = params.get("post")
    if (postId) {
      const post = initialSubmissions?.find((p) => p.id === postId)
      if (post) {
        setSelectedPost(post)
      }
    }
  }, [initialSubmissions])

  useEffect(() => {
    let filtered = submissions

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredSubmissions(filtered)
  }, [selectedCategory, searchTerm, submissions])

  const handleShare = async (submission: any) => {
    const shareUrl = `${window.location.origin}/showcase?post=${submission.id}`
    const shareText = `Check out this ${submission.category.toLowerCase()}: "${submission.title}" by ${submission.author_name}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: submission.title,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert("Link copied to clipboard! Share via WhatsApp, Instagram, email, or any platform.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Youth Creative Showcase</h1>
          <p className="text-xl text-slate-600 mb-8">
            Discover creative expressions from talented youth. Share your poems, art, spoken art, and stories with our
            community.
          </p>
          <Link href="/showcase/submit">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg font-semibold">
              Share Your Talent
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <Input
            placeholder="Search by title or author name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              className="bg-teal-600 hover:bg-teal-700"
            >
              All Submissions
            </Button>
            {CREATIVE_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No submissions found. Be the first to share!</p>
            <Link href="/showcase/submit">
              <Button className="bg-teal-600 hover:bg-teal-700">Submit Your Work</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                {submission.video_url ? (
                  <div className="aspect-video w-full overflow-hidden bg-slate-200">
                    <video
                      src={submission.video_url}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                  </div>
                ) : submission.image_url ? (
                  <div className="aspect-video w-full overflow-hidden bg-slate-200">
                    <img
                      src={submission.image_url || "/placeholder.svg"}
                      alt={submission.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{submission.title}</CardTitle>
                      <CardDescription className="text-teal-600 font-semibold mt-1">
                        {submission.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 line-clamp-3">{submission.content}</p>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-semibold text-gray-900">By {submission.author_name}</p>
                    {submission.author_instagram && (
                      <a
                        href={`https://instagram.com/${submission.author_instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:text-teal-700"
                      >
                        @{submission.author_instagram.replace("@", "")}
                      </a>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{new Date(submission.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedPost(submission)}
                    >
                      Read Full Post
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare(submission)} title="Share this post">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedPost.title}</DialogTitle>
                  <DialogDescription>{selectedPost.category}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {selectedPost.video_url ? (
                    <video
                      src={selectedPost.video_url}
                      controls
                      className="w-full h-auto rounded-lg"
                      preload="metadata"
                    />
                  ) : selectedPost.image_url ? (
                    <img
                      src={selectedPost.image_url || "/placeholder.svg"}
                      alt={selectedPost.title}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : null}
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-gray-700">{selectedPost.content}</p>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <p className="font-semibold text-lg">{selectedPost.author_name}</p>
                    {selectedPost.author_bio && <p className="text-sm text-gray-700">{selectedPost.author_bio}</p>}
                    {selectedPost.author_instagram && (
                      <a
                        href={`https://instagram.com/${selectedPost.author_instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:text-teal-700 font-semibold"
                      >
                        @{selectedPost.author_instagram.replace("@", "")}
                      </a>
                    )}
                    <p className="text-xs text-gray-500">
                      Published: {new Date(selectedPost.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => handleShare(selectedPost)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share This Post
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
