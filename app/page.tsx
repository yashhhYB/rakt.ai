"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MapPin, Users, Activity, AlertTriangle, Trophy, Globe, Phone, Target, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [liveStats, setLiveStats] = useState({
    livesImpacted: 1247,
    activeDonors: 8934,
    bloodUnitsAvailable: 2156,
    urgentRequests: 23,
  })

  const [urgentNeeds] = useState([
    { type: "B+", location: "Mumbai", units: 15, priority: "critical" },
    { type: "O-", location: "Delhi", units: 8, priority: "urgent" },
    { type: "AB+", location: "Bangalore", units: 12, priority: "moderate" },
  ])

  const [impactMetrics] = useState([
    { label: "Lives Saved This Week", value: 47, icon: Heart },
    { label: "Active Donors", value: 8934, icon: Users },
    { label: "Blood Banks Connected", value: 156, icon: MapPin },
    { label: "Emergency Responses", value: 23, icon: AlertTriangle },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        livesImpacted: prev.livesImpacted + Math.floor(Math.random() * 2),
        activeDonors: prev.activeDonors + Math.floor(Math.random() * 3),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "urgent":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                RAKT.AI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-red-600 dark:text-gray-300 transition-colors">
                Dashboard
              </Link>
              <Link
                href="/blood-banks"
                className="text-gray-600 hover:text-red-600 dark:text-gray-300 transition-colors"
              >
                Blood Banks
              </Link>
              <Link href="/logistics" className="text-gray-600 hover:text-red-600 dark:text-gray-300 transition-colors">
                Logistics
              </Link>
              <Link
                href="/walking-donors"
                className="text-gray-600 hover:text-red-600 dark:text-gray-300 transition-colors"
              >
                Walking Donors
              </Link>
              <Link href="/kiosk" className="text-gray-600 hover:text-red-600 dark:text-gray-300 transition-colors">
                Kiosk
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-red-600 dark:text-gray-300 transition-colors">
                Admin
              </Link>
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                हिंदी
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Save Lives with
            <span className="text-red-600 dark:text-red-400 block">Smart Blood Donation</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered blood donation ecosystem connecting donors, hospitals, and blood banks across India. Join the
            revolution in healthcare accessibility.
          </p>

          {/* Live Stats Banner */}
          <div className="bg-red-600 text-white p-4 rounded-lg mb-8 animate-pulse">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">URGENT: B+ needed in Mumbai - 15 units required</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Become a Donor
              </Button>
            </Link>
            <Link href="/blood-banks">
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Request Blood
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="ghost" className="text-red-600 hover:bg-red-50 px-8 py-4 text-lg">
                <Activity className="w-5 h-5 mr-2" />
                Track My Donation
              </Button>
            </Link>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <metric.icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Urgent Blood Needs */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              Urgent Blood Needs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {urgentNeeds.map((need, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(need.priority)}`} />
                    <div>
                      <div className="font-semibold text-lg">{need.type}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {need.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">{need.units}</div>
                    <div className="text-xs text-gray-500">units needed</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 text-red-600 mr-2" />
                AI Shortage Predictor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Forecast blood shortages across India using machine learning algorithms.
              </p>
              <Link href="/predictor">
                <Button variant="outline" size="sm">
                  View Predictions
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 text-red-600 mr-2" />
                Gamified Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Earn badges, climb leaderboards, and unlock achievements for donations.
              </p>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Join Community
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 text-red-600 mr-2" />
                Smart Matching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AI-powered donor-recipient matching based on location and compatibility.
              </p>
              <Link href="/blood-banks">
                <Button variant="outline" size="sm">
                  Get Matched
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Impact Counter */}
        <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Real-time Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-4xl font-bold">{liveStats.livesImpacted.toLocaleString()}</div>
                <div className="text-red-100">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{liveStats.activeDonors.toLocaleString()}</div>
                <div className="text-red-100">Active Donors</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{liveStats.bloodUnitsAvailable.toLocaleString()}</div>
                <div className="text-red-100">Units Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{liveStats.urgentRequests}</div>
                <div className="text-red-100">Urgent Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <span className="text-xl font-bold">RAKT.AI</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing blood donation in India through AI and community-driven healthcare.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Donors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/eligibility" className="hover:text-white">
                    Check Eligibility
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="hover:text-white">
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Hospitals</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blood-banks" className="hover:text-white">
                    Blood Bank Portal
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-white">
                    Emergency Requests
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="hover:text-white">
                    Inventory Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RAKT.AI. Saving lives through technology. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
