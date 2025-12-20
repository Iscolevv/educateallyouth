"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function FestiveGreetingsPage() {
  const [timeUntilChristmas, setTimeUntilChristmas] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [timeUntilNewYear, setTimeUntilNewYear] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [christmasPassed, setChristmasPassed] = useState(false)
  const [newYearPassed, setNewYearPassed] = useState(false)
  const [showSnowflakes, setShowSnowflakes] = useState(true)

  useEffect(() => {
    // Check if festivities are over (after Jan 5, 2026) - redirect to homepage
    const now = new Date()
    const festivitiesEnd = new Date("2026-01-06T00:00:00")
    if (now > festivitiesEnd) {
      redirect("/")
      return
    }

    const calculateTime = () => {
      const now = new Date()
      const christmas = new Date("2025-12-25T00:00:00")
      const newYear = new Date("2026-01-01T00:00:00")

      // Christmas countdown
      const diffChristmas = christmas.getTime() - now.getTime()
      if (diffChristmas <= 0) {
        setChristmasPassed(true)
      } else {
        const days = Math.floor(diffChristmas / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffChristmas % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diffChristmas % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diffChristmas % (1000 * 60)) / 1000)
        setTimeUntilChristmas({ days, hours, minutes, seconds })
      }

      // New Year countdown
      const diffNewYear = newYear.getTime() - now.getTime()
      if (diffNewYear <= 0) {
        setNewYearPassed(true)
      } else {
        const days = Math.floor(diffNewYear / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffNewYear % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diffNewYear % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diffNewYear % (1000 * 60)) / 1000)
        setTimeUntilNewYear({ days, hours, minutes, seconds })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-900 via-green-900 to-emerald-950">
      {/* Animated snowflakes */}
      {showSnowflakes && (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-snow text-white opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                fontSize: `${10 + Math.random() * 20}px`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo/Branding */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-5xl font-bold text-white md:text-7xl">🎄 Season's Greetings 🎄</h1>
          <p className="text-xl text-green-200 md:text-2xl">From EducateAll Youth Organisation</p>
        </div>

        {/* Christmas Countdown */}
        {!christmasPassed && (
          <div className="mb-12 w-full max-w-4xl animate-fade-in rounded-2xl border-4 border-red-500 bg-white/10 p-8 backdrop-blur-md">
            <h2 className="mb-6 text-center text-3xl font-bold text-yellow-300 md:text-4xl">
              🎅 Christmas Countdown 🎅
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilChristmas.days}</div>
                <div className="text-sm text-green-200 md:text-lg">Days</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilChristmas.hours}</div>
                <div className="text-sm text-green-200 md:text-lg">Hours</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilChristmas.minutes}</div>
                <div className="text-sm text-green-200 md:text-lg">Minutes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilChristmas.seconds}</div>
                <div className="text-sm text-green-200 md:text-lg">Seconds</div>
              </div>
            </div>
          </div>
        )}

        {/* Christmas Message (shows after Christmas) */}
        {christmasPassed && !newYearPassed && (
          <div className="mb-12 w-full max-w-4xl animate-fade-in rounded-2xl border-4 border-green-500 bg-white/10 p-8 backdrop-blur-md">
            <h2 className="mb-4 text-center text-3xl font-bold text-yellow-300 md:text-4xl">🎄 Merry Christmas! 🎄</h2>
            <p className="text-center text-lg text-white md:text-xl">
              May this Christmas season bring you joy, peace, and prosperity. Thank you for being part of our journey in
              empowering youth through education!
            </p>
          </div>
        )}

        {/* New Year Countdown */}
        {!newYearPassed && (
          <div className="mb-12 w-full max-w-4xl animate-fade-in rounded-2xl border-4 border-yellow-400 bg-white/10 p-8 backdrop-blur-md">
            <h2 className="mb-6 text-center text-3xl font-bold text-yellow-300 md:text-4xl">
              🎊 New Year 2026 Countdown 🎊
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilNewYear.days}</div>
                <div className="text-sm text-green-200 md:text-lg">Days</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilNewYear.hours}</div>
                <div className="text-sm text-green-200 md:text-lg">Hours</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilNewYear.minutes}</div>
                <div className="text-sm text-green-200 md:text-lg">Minutes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-white md:text-7xl">{timeUntilNewYear.seconds}</div>
                <div className="text-sm text-green-200 md:text-lg">Seconds</div>
              </div>
            </div>
          </div>
        )}

        {/* New Year Message (shows after New Year) */}
        {newYearPassed && (
          <div className="mb-12 w-full max-w-4xl animate-fade-in rounded-2xl border-4 border-gold bg-white/10 p-8 backdrop-blur-md">
            <h2 className="mb-4 text-center text-3xl font-bold text-yellow-300 md:text-4xl">
              🎉 Happy New Year 2026! 🎉
            </h2>
            <p className="text-center text-lg text-white md:text-xl">
              Wishing you a prosperous and successful 2026! May this year bring new opportunities, growth, and endless
              possibilities. Let's continue empowering youth together!
            </p>
          </div>
        )}

        {/* Festive Message */}
        <div className="mb-8 w-full max-w-3xl animate-fade-in rounded-2xl bg-white/10 p-8 text-center backdrop-blur-md">
          <p className="mb-4 text-xl text-white md:text-2xl">
            "As we celebrate this festive season, we're grateful for your continued support in empowering youth through
            education. Together, we've made a difference in countless lives across Kenya."
          </p>
          <p className="text-lg text-green-200 md:text-xl">
            May your holidays be filled with love, laughter, and the warmth of family and friends.
          </p>
          <div className="mt-6 text-2xl font-bold text-yellow-300">- The EducateAll Youth Executive Team</div>
        </div>

        {/* Back to Homepage */}
        <Link
          href="/"
          className="animate-pulse rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-900 transition-all hover:scale-105 hover:bg-yellow-100"
        >
          Visit Our Website
        </Link>
      </div>

      <style jsx>{`
        @keyframes snow {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
        .animate-snow {
          animation: snow linear infinite;
        }
      `}</style>
    </div>
  )
}
