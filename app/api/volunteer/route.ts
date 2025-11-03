import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string
    const availability = formData.get("availability") as string
    const interest = formData.get("interest") as string

    const supabase = await createClient()

    const { error } = await supabase.from("volunteers").insert({
      name,
      email,
      phone,
      message,
      availability,
      interest,
    })

    if (error) throw error

    const whatsappMessage = `*New Volunteer Application*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Availability:* ${encodeURIComponent(availability || "Not specified")}%0A*Area of Interest:* ${encodeURIComponent(interest || "Not specified")}%0A*Message:* ${encodeURIComponent(message)}`

    const whatsappUrl = `https://wa.me/254756288563?text=${whatsappMessage}`

    // Redirect to WhatsApp with the pre-filled message
    return NextResponse.redirect(whatsappUrl)
  } catch (error) {
    console.error("[v0] Error submitting volunteer form:", error)
    return NextResponse.redirect(new URL("/?error=true", request.url))
  }
}
