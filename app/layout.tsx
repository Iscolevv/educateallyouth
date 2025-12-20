import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BackButtonRefresh } from "@/components/back-button-refresh"
import { FestiveBanner } from "@/components/festive-banner"

export const metadata: Metadata = {
  title: "EducateAll Youth Organization | Empowering Youth Through Education in Kenya",
  description:
    "EducateAll Youth Organization – Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives and building a brighter future for Kenyan youth.",
  keywords: [
    "EducateAll Youth",
    "EducateAll Youth Organization",
    "educate all youth",
    "youth empowerment Kenya",
    "education Kenya",
    "volunteer Kenya",
    "youth leadership Kenya",
    "mentorship Kenya",
    "community service Kenya",
    "non-profit Kenya",
    "student programs Kenya",
    "youth organization Kenya",
    "education for all Kenya",
    "Kenyan youth empowerment",
    "volunteer opportunities Kenya",
    "leadership development Kenya",
    "Brian Onyango EducateAll",
    "Levis Mokaya developer",
    "Starehe Boys Centre alumni",
    "University of Nairobi students",
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
      { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg" },
      { url: "/apple-icon.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.jpg",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.jpg",
      },
    ],
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
              "@type": "NGO",
              "@id": "https://educateallyouth.co.ke/#organization",
              name: "EducateAll Youth Organization",
              alternateName: ["EducateAll Youth", "EAYO", "Educate All Youth Initiative"],
              url: "https://educateallyouth.co.ke",
              logo: {
                "@type": "ImageObject",
                url: "https://educateallyouth.co.ke/favicon.svg",
                width: 512,
                height: 512,
              },
              image: "https://educateallyouth.co.ke/og-image.png",
              description:
                "EducateAll Youth Organization is a non-profit dedicated to inspiring young leaders through education, volunteerism, and community service in Kenya.",
              slogan: "Empowering Youth Through Education",
              foundingDate: "2021-10-04",
              foundingLocation: {
                "@type": "Place",
                name: "Nairobi, Kenya",
              },
              areaServed: {
                "@type": "Country",
                name: "Kenya",
              },
              knowsAbout: [
                "Youth Empowerment",
                "Education",
                "Mentorship",
                "Community Service",
                "Volunteerism",
                "Leadership Development",
              ],
              member: [
                {
                  "@type": "Person",
                  "@id": "https://educateallyouth.co.ke/#brian-onyango",
                  name: "Brian Onyango",
                  jobTitle: "Founder & Executive Director",
                  description:
                    "Brian Onyango is an alumni of Starehe Boys Centre & School and the Founder of EducateAll Youth Organization. He is passionate about empowering young people through education, mentorship, and community service.",
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "Starehe Boys Centre & School",
                  },
                  sameAs: ["https://www.linkedin.com/in/brian-o-12647a323"],
                },
                {
                  "@type": "Person",
                  "@id": "https://educateallyouth.co.ke/#levis-mokaya",
                  name: "Levis Mokaya",
                  givenName: "Levis",
                  familyName: "Mokaya",
                  jobTitle: "Project Manager & Developer",
                  description:
                    "Levis Mokaya is a Data Science student at the University of Nairobi and serves as the Project Manager and Developer for EducateAll Youth Organization. He leads the technical direction of the organization.",
                  image: {
                    "@type": "ImageObject",
                    url: "https://educateallyouth.co.ke/images/img-20251127-081848.jpg",
                    caption: "Levis Mokaya - Project Manager & Developer at EducateAll Youth Organization",
                  },
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "University of Nairobi",
                  },
                  knowsAbout: ["Data Science", "Web Development", "Project Management"],
                  sameAs: ["https://www.linkedin.com/in/levis-mokaya"],
                },
                {
                  "@type": "Person",
                  "@id": "https://educateallyouth.co.ke/#arsene-mwangi",
                  name: "Arsene Mwangi",
                  jobTitle: "Programs Coordinator",
                  description:
                    "Arsene Mwangi is a Software Engineering student at USIU-Africa and serves as the Programs Coordinator at EducateAll Youth Organization.",
                  image: {
                    "@type": "ImageObject",
                    url: "https://educateallyouth.co.ke/images/img-20251127-081905.jpg",
                    caption: "Arsene Mwangi - Programs Coordinator at EducateAll Youth Organization",
                  },
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "United States International University Africa",
                  },
                },
                {
                  "@type": "Person",
                  "@id": "https://educateallyouth.co.ke/#christabel-aloo",
                  name: "Christabel Aloo Ochieng",
                  jobTitle: "Events & Mobilization Coordinator",
                  description:
                    "Christabel Aloo Ochieng is a Law student at Kisii University and serves as the Events & Mobilization Coordinator at EducateAll Youth Organization.",
                  image: {
                    "@type": "ImageObject",
                    url: "https://educateallyouth.co.ke/images/img-20251127-082913.jpg",
                    caption:
                      "Christabel Aloo Ochieng - Events & Mobilization Coordinator at EducateAll Youth Organization",
                  },
                  affiliation: {
                    "@type": "Organization",
                    name: "EducateAll Youth Organization",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Kisii University",
                  },
                },
              ],
              founder: {
                "@type": "Person",
                name: "Brian Onyango",
                sameAs: ["https://www.linkedin.com/in/brian-o-12647a323"],
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+254756288563",
                email: "educateallyouthorganization@gmail.com",
                availableLanguage: ["English", "Swahili"],
              },
              sameAs: [
                "https://www.linkedin.com/in/brian-o-12647a323",
                "https://www.instagram.com/isco_levv",
                "https://wa.me/254756288563",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "@id": "https://educateallyouth.co.ke/images/img-20251127-081848.jpg",
              contentUrl: "https://educateallyouth.co.ke/images/img-20251127-081848.jpg",
              name: "Levis Mokaya Photo",
              description:
                "Levis Mokaya - Project Manager and Developer at EducateAll Youth Organization, Data Science student at University of Nairobi",
              caption: "Levis Mokaya, Project Manager & Developer at EducateAll Youth Organization",
              creator: {
                "@type": "Person",
                name: "Levis Mokaya",
              },
              copyrightHolder: {
                "@type": "Organization",
                name: "EducateAll Youth Organization",
              },
              representativeOfPage: false,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://educateallyouth.co.ke/#website",
              url: "https://educateallyouth.co.ke",
              name: "EducateAll Youth Organization",
              description: "Empowering Youth Through Education in Kenya",
              publisher: {
                "@type": "Organization",
                name: "EducateAll Youth Organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://educateallyouth.co.ke/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <BackButtonRefresh />
        <FestiveBanner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
