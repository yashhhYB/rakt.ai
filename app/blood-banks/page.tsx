"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  Search,
  Hospital,
  Truck,
  Thermometer,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function BloodBanksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBloodType, setSelectedBloodType] = useState("All")

  const [bloodBanks] = useState([
    {
      name: "Apollo Hospital Blood Bank",
      location: "Bandra, Mumbai",
      distance: "2.3 km",
      phone: "+91 98765 43210",
      status: "Open 24/7",
      inventory: {
        "A+": { available: 45, status: "good" },
        "A-": { available: 12, status: "low" },
        "B+": { available: 8, status: "critical" },
        "B-": { available: 15, status: "moderate" },
        "O+": { available: 32, status: "good" },
        "O-": { available: 6, status: "critical" },
        "AB+": { available: 18, status: "moderate" },
        "AB-": { available: 9, status: "low" },
      },
      lastUpdated: "2 hours ago",
    },
    {
      name: "KEM Hospital Blood Center",
      location: "Parel, Mumbai",
      distance: "4.1 km",
      phone: "+91 98765 43211",
      status: "Open 24/7",
      inventory: {
        "A+": { available: 38, status: "good" },
        "A-": { available: 8, status: "critical" },
        "B+": { available: 22, status: "good" },
        "B-": { available: 11, status: "low" },
        "O+": { available: 28, status: "good" },
        "O-": { available: 4, status: "critical" },
        "AB+": { available: 14, status: "moderate" },
        "AB-": { available: 7, status: "low" },
      },
      lastUpdated: "1 hour ago",
    },
    {
      name: "Lilavati Hospital Blood Bank",
      location: "Bandra West, Mumbai",
      distance: "3.7 km",
      phone: "+91 98765 43212",
      status: "Open 24/7",
      inventory: {
        "A+": { available: 52, status: "good" },
        "A-": { available: 16, status: "moderate" },
        "B+": { available: 5, status: "critical" },
        "B-": { available: 19, status: "moderate" },
        "O+": { available: 41, status: "good" },
        "O-": { available: 8, status: "low" },
        "AB+": { available: 23, status: "good" },
        "AB-": { available: 12, status: "moderate" },
      },
      lastUpdated: "30 minutes ago",
    },
  ])

  const [urgentRequests] = useState([
    {
      hospital: "Fortis Hospital",
      bloodType: "O-",
      unitsNeeded: 8,
      urgency: "Critical",
      timePosted: "1 hour ago",
      location: "Mulund, Mumbai",
      contact: "+91 98765 43213",
    },
    {
      hospital: "Hinduja Hospital",
      bloodType: "B+",
      unitsNeeded: 12,
      urgency: "Urgent",
      timePosted: "3 hours ago",
      location: "Mahim, Mumbai",
      contact: "+91 98765 43214",
    },
    {
      hospital: "Breach Candy Hospital",
      bloodType: "AB-",
      unitsNeeded: 6,
      urgency: "Moderate",
      timePosted: "6 hours ago",
      location: "Breach Candy, Mumbai",
      contact: "+91 98765 43215",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

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

  const bloodTypes = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

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
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button className="bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Request
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blood Banks & Hospitals</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find nearby blood banks, check inventory, and make urgent requests
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search blood banks by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {bloodTypes.map((type) => (
              <Button
                key={type}
                variant={selectedBloodType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBloodType(type)}
                className={selectedBloodType === type ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="blood-banks" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blood-banks">Blood Banks</TabsTrigger>
            <TabsTrigger value="urgent-requests">Urgent Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="blood-banks" className="space-y-6">
            {bloodBanks.map((bank, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Hospital className="w-5 h-5 text-red-600 mr-2" />
                        {bank.name}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {bank.location} • {bank.distance}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-green-600 border-green-600 mb-2">
                        {bank.status}
                      </Badge>
                      <div className="text-sm text-gray-500">Updated {bank.lastUpdated}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
                    {Object.entries(bank.inventory).map(([type, data]) => (
                      <div key={type} className="text-center p-3 border rounded-lg">
                        <div className="flex items-center justify-center mb-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(data.status)} mr-1`} />
                          <span className="font-semibold text-sm">{type}</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{data.available}</div>
                        <div className="text-xs text-gray-500">units</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {bank.phone}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {bank.status}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="urgent-requests" className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-800 dark:text-red-200">
                  Emergency blood requests require immediate attention
                </span>
              </div>
            </div>

            {urgentRequests.map((request, index) => (
              <Card key={index} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{request.hospital}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {request.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {request.timePosted}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getUrgencyColor(request.urgency)}`}
                      >
                        {request.urgency}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{request.bloodType}</div>
                        <div className="text-xs text-gray-500">Blood Type</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{request.unitsNeeded}</div>
                        <div className="text-xs text-gray-500">Units Needed</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call Hospital
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Heart className="w-4 h-4 mr-1" />I Can Help
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Cold Chain Tracking */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 text-blue-600 mr-2" />
              Cold Chain & Logistics Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">2-8°C</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Optimal Temperature</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">98.5%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Delivery Success Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">45 min</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Average Delivery Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
