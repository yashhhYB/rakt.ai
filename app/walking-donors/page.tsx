"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, Phone, Clock, AlertTriangle, Search, User, Activity, Zap, Star } from "lucide-react"
import Link from "next/link"

interface WalkingDonor {
  id: string
  name: string
  bloodType: string
  location: string
  distance: number
  phone: string
  status: "available" | "busy" | "donated-recently"
  lastDonation: string
  totalDonations: number
  rating: number
  isEmergencyMatch: boolean
  responseTime: string
}

export default function WalkingDonorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const [walkingDonors, setWalkingDonors] = useState<WalkingDonor[]>([
    {
      id: "WD001",
      name: "Priya Sharma",
      bloodType: "O-",
      location: "Bandra West, Mumbai",
      distance: 1.2,
      phone: "+91 98765 43210",
      status: "available",
      lastDonation: "2023-12-15",
      totalDonations: 8,
      rating: 4.9,
      isEmergencyMatch: true,
      responseTime: "< 15 min",
    },
    {
      id: "WD002",
      name: "Rajesh Kumar",
      bloodType: "B+",
      location: "Andheri East, Mumbai",
      distance: 2.8,
      phone: "+91 98765 43211",
      status: "available",
      lastDonation: "2023-11-20",
      totalDonations: 12,
      rating: 4.8,
      isEmergencyMatch: false,
      responseTime: "< 20 min",
    },
    {
      id: "WD003",
      name: "Sneha Patel",
      bloodType: "A+",
      location: "Powai, Mumbai",
      distance: 3.5,
      phone: "+91 98765 43212",
      status: "busy",
      lastDonation: "2023-10-05",
      totalDonations: 6,
      rating: 4.7,
      isEmergencyMatch: false,
      responseTime: "< 30 min",
    },
    {
      id: "WD004",
      name: "Amit Singh",
      bloodType: "AB+",
      location: "Malad West, Mumbai",
      distance: 4.1,
      phone: "+91 98765 43213",
      status: "donated-recently",
      lastDonation: "2024-01-10",
      totalDonations: 15,
      rating: 5.0,
      isEmergencyMatch: false,
      responseTime: "< 25 min",
    },
    {
      id: "WD005",
      name: "Kavya Reddy",
      bloodType: "O+",
      location: "Goregaon East, Mumbai",
      distance: 5.2,
      phone: "+91 98765 43214",
      status: "available",
      lastDonation: "2023-12-01",
      totalDonations: 9,
      rating: 4.6,
      isEmergencyMatch: true,
      responseTime: "< 35 min",
    },
  ])

  const [emergencyRequest] = useState({
    hospital: "Lilavati Hospital",
    bloodType: "O-",
    unitsNeeded: 4,
    urgency: "Critical",
    timePosted: "5 minutes ago",
  })

  const bloodTypes = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  const statuses = ["All", "available", "busy", "donated-recently"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "donated-recently":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "busy":
        return "Busy"
      case "donated-recently":
        return "Donated Recently"
      default:
        return status
    }
  }

  const filteredDonors = walkingDonors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBloodType = selectedBloodType === "All" || donor.bloodType === selectedBloodType
    const matchesStatus = selectedStatus === "All" || donor.status === selectedStatus
    return matchesSearch && matchesBloodType && matchesStatus
  })

  const emergencyMatches = filteredDonors.filter((donor) => donor.isEmergencyMatch && donor.status === "available")

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setWalkingDonors((prev) =>
        prev.map((donor) => ({
          ...donor,
          distance: donor.distance + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                RAKT.AI
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <User className="w-3 h-3 mr-1" />
                Walking Donors
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Walking Donor Bank</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Pre-screened, hyperlocal donor registry for rapid emergency activation
          </p>
        </div>

        {/* Emergency Alert */}
        {emergencyRequest && (
          <Card className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                      EMERGENCY: {emergencyRequest.bloodType} Blood Needed
                    </h3>
                    <p className="text-red-700 dark:text-red-300">
                      {emergencyRequest.hospital} needs {emergencyRequest.unitsNeeded} units •{" "}
                      {emergencyRequest.timePosted}
                    </p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse">{emergencyRequest.urgency}</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Matches */}
        {emergencyMatches.length > 0 && (
          <Card className="mb-8 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <Zap className="w-5 h-5 mr-2" />
                Emergency Matches ({emergencyMatches.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyMatches.map((donor) => (
                  <div
                    key={donor.id}
                    className="p-4 border-2 border-orange-300 rounded-lg bg-orange-50 dark:bg-orange-900/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {donor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{donor.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{donor.location}</div>
                        </div>
                      </div>
                      <Badge className="bg-orange-500 text-white">{donor.bloodType}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {donor.distance.toFixed(1)} km • {donor.responseTime}
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-1" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search donors by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            >
              {bloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All Blood Types" : type}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Status" : getStatusText(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Donors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <Card
              key={donor.id}
              className={`hover:shadow-lg transition-all ${
                donor.isEmergencyMatch ? "ring-2 ring-orange-300 dark:ring-orange-700" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                      <AvatarFallback>
                        {donor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{donor.name}</div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="w-3 h-3 mr-1" />
                        {donor.location}
                      </div>
                    </div>
                  </div>
                  {donor.isEmergencyMatch && (
                    <Badge className="bg-orange-500 text-white animate-pulse">
                      <Zap className="w-3 h-3 mr-1" />
                      Match
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        {donor.bloodType}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(donor.status)}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{getStatusText(donor.status)}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {donor.distance.toFixed(1)} km
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4" />
                      <span>{donor.totalDonations} donations</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{donor.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Response: {donor.responseTime}</span>
                    </div>
                    <div>Last: {donor.lastDonation}</div>
                  </div>

                  <div className="flex space-x-2 pt-3">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={donor.status !== "available"}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      disabled={donor.status !== "available"}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Locate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Donors Found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search criteria or filters to find available donors.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
