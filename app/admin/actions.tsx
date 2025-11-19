"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"

// Create admin client with service role key (bypasses RLS)
function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error("[v0] Missing Supabase credentials:", { hasUrl: !!url, hasKey: !!key })
    throw new Error("Supabase configuration is missing")
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Project actions
export async function createProject(data: {
  title: string
  description: string
  image_url: string
  status: string
  beneficiaries?: number
}) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Creating project with data:", data)

    const { data: result, error } = await supabase.from("projects").insert(data).select()

    if (error) {
      console.error("[v0] Supabase error creating project:", error)
      throw new Error(error.message || "Failed to create project")
    }

    console.log("[v0] Project created successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in createProject:", error)
    throw error
  }
}

export async function updateProject(
  id: string,
  data: {
    title: string
    description: string
    image_url: string
    status: string
    beneficiaries?: number
  },
) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Updating project:", id, data)

    const { data: result, error } = await supabase
      .from("projects")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Supabase error updating project:", error)
      throw new Error(error.message || "Failed to update project")
    }

    console.log("[v0] Project updated successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in updateProject:", error)
    throw error
  }
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting project:", error)
    throw new Error("Failed to delete project")
  }

  revalidatePath("/")
  revalidatePath("/admin/dashboard")
}

// News/Events actions
export async function createNewsEvent(data: {
  title: string
  content: string
  image_url: string
  event_date: string
  published: boolean
  type: string
}) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Creating news/event with data:", data)

    const { data: result, error } = await supabase.from("news_events").insert(data).select()

    if (error) {
      console.error("[v0] Supabase error creating news/event:", error)
      throw new Error(error.message || "Failed to create news/event")
    }

    console.log("[v0] News/event created successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in createNewsEvent:", error)
    throw error
  }
}

export async function updateNewsEvent(
  id: string,
  data: {
    title: string
    content: string
    image_url: string
    event_date: string
    published: boolean
    type: string
  },
) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Updating news/event:", id, data)

    const { data: result, error } = await supabase
      .from("news_events")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Supabase error updating news/event:", error)
      throw new Error(error.message || "Failed to update news/event")
    }

    console.log("[v0] News/event updated successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in updateNewsEvent:", error)
    throw error
  }
}

export async function deleteNewsEvent(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("news_events").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting news/event:", error)
    throw new Error("Failed to delete news/event")
  }

  revalidatePath("/")
  revalidatePath("/admin/dashboard")
}

// Testimonial actions
export async function createTestimonial(data: {
  name: string
  role: string
  content: string
  image_url: string
  rating: number
}) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Creating testimonial with data:", data)

    const { data: result, error } = await supabase.from("testimonials").insert(data).select()

    if (error) {
      console.error("[v0] Supabase error creating testimonial:", error)
      throw new Error(error.message || "Failed to create testimonial")
    }

    console.log("[v0] Testimonial created successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in createTestimonial:", error)
    throw error
  }
}

export async function updateTestimonial(
  id: string,
  data: {
    name: string
    role: string
    content: string
    image_url: string
    rating: number
  },
) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Updating testimonial:", id, data)

    const { data: result, error } = await supabase
      .from("testimonials")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Supabase error updating testimonial:", error)
      throw new Error(error.message || "Failed to update testimonial")
    }

    console.log("[v0] Testimonial updated successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in updateTestimonial:", error)
    throw error
  }
}

export async function deleteTestimonial(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting testimonial:", error)
    throw new Error("Failed to delete testimonial")
  }

  revalidatePath("/")
  revalidatePath("/admin/dashboard")
}

// Gallery actions
export async function createGalleryImage(data: {
  image_url: string
  caption: string
}) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Creating gallery image with data:", data)

    const { data: result, error } = await supabase.from("gallery").insert(data).select()

    if (error) {
      console.error("[v0] Supabase error creating gallery image:", error)
      throw new Error(error.message || "Failed to create gallery image")
    }

    console.log("[v0] Gallery image created successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")

    return result
  } catch (error) {
    console.error("[v0] Error in createGalleryImage:", error)
    throw error
  }
}

export async function deleteGalleryImage(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting gallery image:", error)
    throw new Error("Failed to delete gallery image")
  }

  revalidatePath("/")
  revalidatePath("/admin/dashboard")
}

// Learning posts actions
export async function createLearningPost(data: {
  title: string
  content: string
  image_url: string
  category: string
  published: boolean
}) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Creating learning post with data:", data)

    const { data: result, error } = await supabase.from("learning_posts").insert(data).select()

    if (error) {
      console.error("[v0] Supabase error creating learning post:", error)
      throw new Error(error.message || "Failed to create learning post")
    }

    console.log("[v0] Learning post created successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    revalidatePath("/learning-hub")

    return result
  } catch (error) {
    console.error("[v0] Error in createLearningPost:", error)
    throw error
  }
}

export async function updateLearningPost(
  id: string,
  data: {
    title: string
    content: string
    image_url: string
    category: string
    published: boolean
  },
) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Updating learning post:", id, data)

    const { data: result, error } = await supabase
      .from("learning_posts")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Supabase error updating learning post:", error)
      throw new Error(error.message || "Failed to update learning post")
    }

    console.log("[v0] Learning post updated successfully:", result)
    revalidatePath("/")
    revalidatePath("/admin/dashboard")
    revalidatePath("/learning-hub")

    return result
  } catch (error) {
    console.error("[v0] Error in updateLearningPost:", error)
    throw error
  }
}

export async function deleteLearningPost(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("learning_posts").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting learning post:", error)
    throw new Error("Failed to delete learning post")
  }

  revalidatePath("/")
  revalidatePath("/admin/dashboard")
  revalidatePath("/learning-hub")
}

export async function getLearningPosts() {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Fetching all learning posts for admin")

    const { data, error } = await supabase
      .from("learning_posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Supabase error fetching learning posts:", error)
      throw new Error(error.message || "Failed to fetch learning posts")
    }

    console.log("[v0] Learning posts fetched successfully:", data?.length || 0)
    return data || []
  } catch (error) {
    console.error("[v0] Error in getLearningPosts:", error)
    throw error
  }
}

// Creative submissions actions
export async function createCreativeSubmission(data: {
  title: string
  content: string
  author_name: string
  author_email: string
  author_phone?: string
  author_bio?: string
  author_instagram?: string
  category: string
  image_url?: string
}) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Creating creative submission with data:", data)

    const { data: result, error } = await supabase
      .from("creative_submissions")
      .insert({ ...data, published: false })
      .select()

    if (error) {
      console.error("[v0] Supabase error creating creative submission:", error)
      throw new Error(error.message || "Failed to create creative submission")
    }

    console.log("[v0] Creative submission created successfully:", result)
    revalidatePath("/learning-hub")
    return result
  } catch (error) {
    console.error("[v0] Error in createCreativeSubmission:", error)
    throw error
  }
}

export async function getCreativeSubmissions() {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Fetching all creative submissions for admin")

    const { data, error } = await supabase
      .from("creative_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Supabase error fetching creative submissions:", error)
      throw new Error(error.message || "Failed to fetch creative submissions")
    }

    console.log("[v0] Creative submissions fetched successfully:", data?.length || 0)
    return data || []
  } catch (error) {
    console.error("[v0] Error in getCreativeSubmissions:", error)
    throw error
  }
}

export async function updateCreativeSubmission(
  id: string,
  data: {
    published: boolean
  },
) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Updating creative submission:", id, data)

    const { data: result, error } = await supabase
      .from("creative_submissions")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Supabase error updating creative submission:", error)
      throw new Error(error.message || "Failed to update creative submission")
    }

    console.log("[v0] Creative submission updated successfully:", result)
    revalidatePath("/learning-hub")
    return result
  } catch (error) {
    console.error("[v0] Error in updateCreativeSubmission:", error)
    throw error
  }
}

export async function deleteCreativeSubmission(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from("creative_submissions").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting creative submission:", error)
    throw new Error("Failed to delete creative submission")
  }

  revalidatePath("/showcase")
  revalidatePath("/admin/dashboard")
}

async function sendApprovalEmail(
  authorEmail: string,
  authorName: string,
  submissionTitle: string,
  submissionId: string,
) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://educateallyouth.co.ke"
    const submissionLink = `${siteUrl}/showcase?post=${submissionId}`

    const emailContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
      .header { background: #1a472a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      .header h1 { margin: 0; font-size: 28px; }
      .content { background: white; padding: 40px 30px; border-radius: 0 0 8px 8px; }
      .content p { margin: 15px 0; }
      .content h3 { color: #1a472a; margin-top: 25px; margin-bottom: 10px; }
      .button { display: inline-block; background: #1a472a; color: white; padding: 15px 35px; text-decoration: none; border-radius: 5px; margin: 25px 0; font-weight: bold; }
      .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
      .submission-box { background: #f0f8f5; border-left: 4px solid #1a472a; padding: 15px; margin: 20px 0; border-radius: 4px; }
      .submission-box strong { color: #1a472a; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎉 Your Piece Has Been Approved!</h1>
      </div>
      <div class="content">
        <p>Hello <strong>${authorName}</strong>,</p>
        
        <p>Exciting news! Your creative submission has been reviewed and <strong>approved for publication</strong> on the EducateAll Youth Initiative platform. Your voice and creativity matter, and we're thrilled to share your work with our community!</p>
        
        <div class="submission-box">
          <strong>✨ Submission Title:</strong><br>${submissionTitle}
        </div>
        
        <p>Your work is now <strong>live and visible</strong> to our entire community. Showcase your talent and connect with others who appreciate creative expression.</p>
        
        <h3>📍 View Your Published Work:</h3>
        <p style="text-align: center;">
          <a href="${submissionLink}" class="button">View My Published Work</a>
        </p>
        
        <h3>🌍 Share Your Creativity:</h3>
        <p>We encourage you to share your work across social media platforms and with friends. Your creativity inspires others and helps build a stronger community!</p>
        <p><strong>Direct Link:</strong> <a href="${submissionLink}" style="color: #1a472a; text-decoration: none;">${submissionLink}</a></p>
        
        <p>Thank you for being part of the EducateAll Youth Initiative creative community. Keep creating, keep inspiring!</p>
        
        <p>Warm regards,<br><strong>EducateAll Youth Initiative Team</strong><br><a href="https://educateallyouth.co.ke" style="color: #1a472a; text-decoration: none;">educateallyouth.co.ke</a></p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} EducateAll Youth Initiative. All rights reserved.</p>
        <p>This is an automated message from our creative platform. Please do not reply to this email.</p>
      </div>
    </div>
  </body>
</html>
    `

    console.log("[v0] Sending approval email to:", authorEmail)
    console.log("[v0] Using Resend API key:", process.env.RESEND_API_KEY ? "✓ Present" : "✗ Missing")

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "EducateAll Youth <notifications@educateallyouth.co.ke>",
        to: authorEmail,
        reply_to: "educateallyouthorganisation@gmail.com",
        subject: `🎉 Your Work "${submissionTitle}" Is Now Published!`,
        html: emailContent,
      }),
    })

    const responseData = await response.json()
    console.log("[v0] Resend API response status:", response.status)
    console.log("[v0] Resend API response:", responseData)

    if (!response.ok) {
      console.error("[v0] Resend email error - Status:", response.status, "Response:", responseData)
      throw new Error(`Email delivery failed: ${responseData?.message || "Unknown error"}`)
    }

    console.log("[v0] ✓ Approval email sent successfully to:", authorEmail)
    return true
  } catch (error) {
    console.error("[v0] Error sending approval email:", error)
  }
}

export async function approveCreativeSubmission(id: string) {
  try {
    const supabase = createAdminClient()
    console.log("[v0] Approving creative submission:", id)

    const { data: submission, error: fetchError } = await supabase
      .from("creative_submissions")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError || !submission) {
      console.error("[v0] Error fetching submission:", fetchError)
      throw new Error("Submission not found")
    }

    console.log("[v0] Fetched submission:", submission.title, "- Email:", submission.author_email)

    const { data: result, error } = await supabase
      .from("creative_submissions")
      .update({ published: true, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Supabase error updating submission:", error)
      throw new Error(error.message || "Failed to approve submission")
    }

    console.log("[v0] Submission published, now sending approval email...")
    await sendApprovalEmail(
      submission.author_email,
      submission.author_name,
      submission.title,
      id,
    )

    console.log("[v0] Creative submission approved and email sent:", result)
    revalidatePath("/showcase")
    revalidatePath("/admin/dashboard")
    return result
  } catch (error) {
    console.error("[v0] Error in approveCreativeSubmission:", error)
    throw error
  }
}
