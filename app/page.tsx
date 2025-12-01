import type { Metadata } from "next"

export const revalidate = 30

export const metadata: Metadata = {
  title: "EducateAll Youth Organization | Empowering Youth Through Education in Kenya",
  description:
    "EducateAll Youth Organization - Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives and building a brighter future.",
  alternates: {
    canonical: "https://educateallyouth.co.ke",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">EducateAll Youth Organization</h1>
        <p className="text-lg text-muted-foreground">Empowering Youth Through Education in Kenya</p>
      </div>
    </main>
  )
}
