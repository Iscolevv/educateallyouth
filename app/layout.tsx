import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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
  ],
  authors: [{ name: "EducateAll Youth Organization" }],
  creator: "EducateAll Youth Organization",
  publisher: "EducateAll Youth Organization",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://educateallyouthorg.co.ke"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EducateAll Youth Organization | Empowering Youth Through Education",
    description:
      "Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives across Kenya.",
    url: "https://educateallyouthorg.co.ke",
    siteName: "EducateAll Youth Organization",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EducateAll Youth Organization",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EducateAll Youth Organization | Empowering Youth Through Education",
    description: "Inspiring young leaders through education, volunteerism, and community service in Kenya.",
    images: ["/og-image.png"],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: "/android-chrome-192x192.jpg",
    shortcut: "/favicon.ico",
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
              url: "https://educateallyouthorg.co.ke",
              logo: "https://educateallyouthorg.co.ke/favicon.svg",
              description:
                "EducateAll Youth Organization is a non-profit dedicated to inspiring young leaders through education, volunteerism, and community service.",
              founder: {
                "@type": "Person",
                name: "Brian Onyango",
              },
              developer: {
                "@type": "Person",
                name: "Levis Mokaya",
                url: "https://www.linkedin.com/in/levis-mokaya",
                description: "Full-stack developer and technical lead",
              },
              sameAs: [
                "https://www.linkedin.com/in/brian-o-12647a323",
                "https://www.instagram.com/isco_levv",
                "https://wa.me/254756288563",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+254756288563",
                email: "brianonyango1605@gmail.com",
              },
              areaServed: "Kenya",
              foundingDate: "2021-10-04",
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
