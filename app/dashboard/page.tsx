"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Trophy,
  Calendar,
  MapPin,
  Award,
  Star,
  Users,
  Clock,
  Target,
  Gift,
  Medal,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userProfile] = useState({
    name: "Priya Sharma",
    bloodType: "B+",
    level: "Gold Guardian",
    totalDonations: 12,
    nextEligibleDate: "2024-02-15",
    points: 2450,
    badges: ["First Timer", "Life Saver x3", "Plasma Pro", "Community Hero"],
    streak: 8,
    rank: 47,
  })

  const [donationHistory] = useState([
    { date: "2024-01-15", location: "Apollo Hospital, Mumbai", type: "Whole Blood", status: "Completed" },
    { date: "2023-12-10", location: "Red Cross Center, Mumbai", type: "Platelets", status: "Completed" },
    { date: "2023-11-05", location: "Fortis Hospital, Mumbai", type: "Whole Blood", status: "Completed" },
  ])

  const [achievements] = useState([
    { name: "First Timer", description: "Completed your first donation", icon: Heart, earned: true },
    { name: "Life Saver x3", description: "Saved 3 lives through donations", icon: Award, earned: true },
    { name: "Plasma Pro", description: "Donated plasma 5 times", icon: Zap, earned: true },
    { name: "Community Hero", description: "Referred 10 new donors", icon: Users, earned: true },
    { name: "Speed Demon", description: "Donated within 24hrs of request", icon: Clock, earned: false },
    { name: "Guardian Angel", description: "Reach 20 total donations", icon: Shield, earned: false },
  ])

  const [nearbyRequests] = useState([
    { type: "B+", location: "Lilavati Hospital", distance: "2.3 km", urgency: "Critical", time: "2 hours ago" },
    { type: "O+", location: "KEM Hospital", distance: "4.1 km", urgency: "Urgent", time: "5 hours ago" },
    { type: "AB+", location: "Hinduja Hospital", distance: "6.8 km", urgency: "Moderate", time: "1 day ago" },
  ])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-500"
      case "Urgent":
        return "bg-orange-500"
      case "Moderate":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLevelProgress = (level: string) => {
    const levels = { Bronze: 25, Silver: 50, "Gold Guardian": 75, Platinum: 100 }
    return levels[level as keyof typeof levels] || 0
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold text-red-600">RAKT.AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-red-600 border-red-600">
                {userProfile.bloodType}
              </Badge>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userProfile.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You're making a real difference in your community. Keep up the amazing work!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.totalDonations}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Donations</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">#{userProfile.rank}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">City Rank</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.points}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Points Earned</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.streak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="w-5 h-5 text-yellow-600 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{userProfile.level}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {userProfile.totalDonations}/20 donations to Platinum
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Level 3
                  </Badge>
                </div>
                <Progress value={getLevelProgress(userProfile.level)} className="mb-4" />
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  8 more donations to reach Platinum Guardian status!
                </div>
              </CardContent>
            </Card>

            {/* Nearby Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 text-red-600 mr-2" />
                  Nearby Blood Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyRequests.map((request, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getUrgencyColor(request.urgency)}`} />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {request.type} needed at {request.location}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {request.distance} away • {request.time}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Respond
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  Recent Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{donation.location}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {donation.date} • {donation.type}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {donation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Next Donation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  Next Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">Feb 15, 2024</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    You'll be eligible to donate again
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 text-purple-600 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        achievement.earned
                          ? "bg-yellow-100 dark:bg-yellow-900"
                          : "bg-gray-100 dark:bg-gray-800 opacity-50"
                      }`}
                    >
                      <achievement.icon
                        className={`w-6 h-6 mx-auto mb-1 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                      />
                      <div className="text-xs font-medium">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Schedule Donation
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Invite Friends
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Gift className="w-4 h-4 mr-2" />
                  Redeem Rewards
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
