import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BackButtonRefresh } from "@/components/back-button-refresh"

export const metadata: Metadata = {
  title: "EducateAll Youth Organization | Empowering Youth Through Education in Kenya",
  description:
    "EducateAll Youth Organization – Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives and building a brighter future for Kenyan youth.",
  keywords: [
    "education",
    "youth empowerment",
    "volunteer",
    "leadership",
    "Kenya",
    "EducateAll",
    "mentorship",
    "community service",
    "non-profit",
    "student programs",
    "youth organization",
    "education for all",
    "Kenyan youth",
    "volunteer opportunities",
    "leadership development",
    "Brian Onyango",
    "Levis Mokaya",
    "Arsene Mwangi",
    "Christabel Aloo",
  ],
  authors: [{ name: "EducateAll Youth Organization" }],
  creator: "EducateAll Youth Organization",
  publisher: "EducateAll Youth Organization",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://educateallyouth.co.ke"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EducateAll Youth Organization | Empowering Youth Through Education",
    description:
      "Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives across Kenya.",
    url: "https://educateallyouth.co.ke",
    siteName: "EducateAll Youth Organization",
    images: [
      {
        url: "/ea-logo.svg",
        width: 1200,
        height: 630,
        alt: "EducateAll Youth Organization Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EducateAll Youth Organization | Empowering Youth Through Education",
    description: "Inspiring young leaders through education, volunteerism, and community service in Kenya.",
    images: ["/ea-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/ea-logo.svg", type: "image/svg+xml" },
      { url: "/ea-logo.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/ea-logo.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [{ url: "/ea-logo.svg", sizes: "180x180", type: "image/svg+xml" }],
    shortcut: "/ea-logo.svg",
  },
  manifest: "/site.webmanifest",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0d9488" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EducateAll Youth Organization",
              alternateName: "EducateAll Youth",
              url: "https://educateallyouth.co.ke",
              logo: "https://educateallyouth.co.ke/ea-logo.svg",
              image: "https://educateallyouth.co.ke/ea-logo.svg",
              description:
                "EducateAll Youth Organization is a non-profit dedicated to inspiring young leaders through education, volunteerism, and community service in Kenya.",
              foundingDate: "2021-10-04",
              founder: {
                "@type": "Person",
                name: "Brian Onyango",
                jobTitle: "Founder & Executive Director",
                email: "brianonyango1605@gmail.com",
                affiliation: {
                  "@type": "Organization",
                  name: "EducateAll Youth Organization",
                },
              },
              employee: [
                {
                  "@type": "Person",
                  name: "Levis Mokaya",
                  jobTitle: "Project Manager & Developer",
                  image: "https://educateallyouth.co.ke/images/img-20251127-081848.jpg",
                  url: "https://www.linkedin.com/in/levis-mokaya",
                  description:
                    "Data Science student at the University of Nairobi, leads technical direction and development",
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "University of Nairobi",
                  },
                },
                {
                  "@type": "Person",
                  name: "Arsene Mwangi",
                  jobTitle: "Programs Coordinator",
                  image: "https://educateallyouth.co.ke/images/img-20251127-081905.jpg",
                  description:
                    "Software Engineering student at USIU–Africa, coordinates outreach programs and school partnerships",
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "United States International University Africa",
                  },
                },
                {
                  "@type": "Person",
                  name: "Christabel Aloo Ochieng",
                  jobTitle: "Events & Mobilization Coordinator",
                  image: "https://educateallyouth.co.ke/images/img-20251127-082913.jpg",
                  description: "Law student at Kisii University, coordinates events and community mobilization",
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "Kisii University",
                  },
                },
              ],
              sameAs: ["https://www.linkedin.com/in/brian-o-12647a323", "https://www.instagram.com/isco_levv"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+254756288563",
                email: "educateallyouthorganization@gmail.com",
              },
              areaServed: {
                "@type": "Country",
                name: "Kenya",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <BackButtonRefresh />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
