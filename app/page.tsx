// Removed: unstable_noStore as noStore - This is no longer needed as we are using revalidate
import { HomepageWrapper } from "@/components/homepage-wrapper" // Assuming HomepageWrapper is correctly imported

export const revalidate = 30 // Regenerate cached data every 30 seconds
// Removed: dynamic, fetchCache - these were causing conflicts

export const metadata = {
  title: "EducateAll Youth Organization | Empowering Youth Through Education in Kenya",
  description:
    "EducateAll Youth Organization - Inspiring young leaders through education, volunteerism, and community service. Join us in transforming lives and building a brighter future.",
  alternates: {
    canonical: "https://educateallyouth.co.ke",
  },
  openGraph: {
    title: "EducateAll Youth Organization | Empowering Youth Through Education",
    description: "Inspiring young leaders through education, volunteerism, and community service.",
    url: "https://educateallyouth.co.ke",
    siteName: "EducateAll Youth Organization",
    type: "website",
  },
}

// Removed: HomePageContent function as it's no longer needed in this structure
// Removed: getData function as data fetching is handled within HomepageWrapper now
// Removed: async function HomePageContent({...})
// Removed: async function getData()

async function HomePage() {
  return <HomepageWrapper />
}

export default HomePage
