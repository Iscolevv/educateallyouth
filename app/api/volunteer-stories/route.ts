import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const projectTitle = formData.get("projectTitle") as string
    const location = formData.get("location") as string
    const activityDate = formData.get("activityDate") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const consentGiven = formData.get("consentGiven") === "true"
    const files = formData.getAll("images") as File[]

    // Validate required fields
    if (!fullName || !email || !projectTitle || !location || !activityDate || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!consentGiven) {
      return NextResponse.json({ error: "You must consent to share your story" }, { status: 400 })
    }

    // Initialize Supabase server client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch (error) {
              console.error("[v0] Error setting cookies:", error)
            }
          },
        },
      },
    )

    // Upload images to Supabase Storage if provided
    const imageUrls: string[] = []
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.size > 0) {
          const fileExt = file.name.split(".").pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `volunteer-stories/${fileName}`

          const { error: uploadError } = await supabase.storage.from("volunteer-stories").upload(filePath, file)

          if (uploadError) {
            console.error("[v0] Upload error:", uploadError)
            continue
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("volunteer-stories").getPublicUrl(filePath)

          imageUrls.push(publicUrl)
        }
      }
    }

    // Insert volunteer story into database
    const { data, error } = await supabase
      .from("volunteer_stories")
      .insert({
        full_name: fullName,
        email,
        phone,
        project_title: projectTitle,
        location,
        activity_date: activityDate,
        description,
        category,
        image_urls: imageUrls,
        consent_given: consentGiven,
        status: "pending",
      })
      .select()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to submit volunteer story" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Your volunteer story has been submitted successfully and is awaiting admin approval.",
        data,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch (error) {
              console.error("[v0] Error setting cookies:", error)
            }
          },
        },
      },
    )

    // Get only approved volunteer stories
    const { data, error } = await supabase
      .from("volunteer_stories")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching stories:", error)
      return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
