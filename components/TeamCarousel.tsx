"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const TEAM_MEMBERS = [
  {
    id: 1,
    initials: "BO",
    name: "Brian Onyango",
    role: "Founder & Executive Director",
    color: "from-teal-600 to-teal-700",
    roleColor: "text-teal-600",
    image: null,
    description:
      "Brian Onyango is an alumni of Starehe Boys Centre & School and the Founder of EducateAll Youth Organization. He is passionate about empowering young people through education, mentorship, and community service. He leads the organization's vision and oversees its strategic growth.",
  },
  {
    id: 2,
    initials: "LM",
    name: "Levis Mokaya",
    role: "Project Manager & Developer",
    color: "from-orange-500 to-orange-600",
    roleColor: "text-orange-600",
    image: "/images/img-20251127-081848.jpg",
    description:
      "Levis Mokaya is a Data Science student at the University of Nairobi and serves as the Project Manager and Developer for EducateAll Youth Organization. He leads the technical direction of the organization, developing systems that connect volunteers, manage projects, and highlight the group's community impact.",
  },
  {
    id: 3,
    initials: "AM",
    name: "Arsene Mwangi",
    role: "Programs Coordinator",
    color: "from-purple-600 to-purple-700",
    roleColor: "text-purple-600",
    image: "/images/img-20251127-081905.jpg",
    description:
      "Arsene Mwangi is a Software Engineering student at the United States International University (USIU–Africa) and serves as the Programs Coordinator at Educate All Youth Initiative. Passionate about technology, education, and youth empowerment, Arsene plays a key role in coordinating outreach programs, school partnerships, and innovation-driven initiatives.",
  },
  {
    id: 4,
    initials: "CA",
    name: "Christabel Aloo Ochieng",
    role: "Events & Mobilization Coordinator",
    color: "from-pink-600 to-pink-700",
    roleColor: "text-pink-600",
    image: "/images/img-20251127-082913.jpg",
    description:
      "Christabel Aloo Ochieng is a Law student at Kisii University and serves as the Events & Mobilization Coordinator at EducateAll Youth Initiative. A passionate advocate for political awareness, leadership, and youth empowerment, Christabel plays a vital role in coordinating events and mobilizing audiences.",
  },
]

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoAdvanceRef = useRef<NodeJS.Timeout>()

  // Auto-advance every 5 seconds
  useEffect(() => {
    autoAdvanceRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEAM_MEMBERS.length)
    }, 5000)

    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current)
    }
  }, [])

  // Reset timer on manual navigation
  const handleNavigation = (newIndex: number) => {
    setCurrentIndex(newIndex)
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current)
    autoAdvanceRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEAM_MEMBERS.length)
    }, 5000)
  }

  const goToPrevious = () => {
    handleNavigation((currentIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)
  }

  const goToNext = () => {
    handleNavigation((currentIndex + 1) % TEAM_MEMBERS.length)
  }

  const member = TEAM_MEMBERS[currentIndex]

  return (
    <div className="space-y-6">
      {/* Carousel Container */}
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous team member"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Card Display */}
        <div className="flex-1 overflow-hidden">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                {member.image ? (
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4"
                    style={{
                      borderColor:
                        member.roleColor.replace("text-", "").split("-")[0] === "teal"
                          ? "#14b8a6"
                          : member.roleColor.includes("orange")
                            ? "#ea580c"
                            : member.roleColor.includes("purple")
                              ? "#a855f7"
                              : "#ec4899",
                    }}
                  />
                ) : (
                  <div
                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-4xl font-bold mb-4`}
                  >
                    {member.initials}
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className={`${member.roleColor} font-semibold mb-4`}>{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next team member"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2">
        {TEAM_MEMBERS.map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-teal-600 w-8" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
