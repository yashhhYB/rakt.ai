"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MapPin,
  Truck,
  Plane,
  Thermometer,
  Clock,
  AlertTriangle,
  Package,
  Route,
  Zap,
  Activity,
  Navigation,
} from "lucide-react"
import Link from "next/link"

export default function LogisticsPage() {
  const [activeDeliveries, setActiveDeliveries] = useState([
    {
      id: "DEL001",
      from: "Apollo Blood Bank, Mumbai",
      to: "KEM Hospital, Mumbai",
      bloodType: "O-",
      units: 8,
      method: "drone",
      status: "in-transit",
      temperature: 4.2,
      eta: "12 minutes",
      progress: 65,
      route: [
        { lat: 19.0596, lng: 72.8295, name: "Apollo Blood Bank" },
        { lat: 19.0728, lng: 72.8826, name: "KEM Hospital" },
      ],
    },
    {
      id: "DEL002",
      from: "Lilavati Blood Bank, Mumbai",
      to: "Fortis Hospital, Mulund",
      bloodType: "B+",
      units: 12,
      method: "truck",
      status: "dispatched",
      temperature: 3.8,
      eta: "28 minutes",
      progress: 25,
      route: [
        { lat: 19.0544, lng: 72.8181, name: "Lilavati Blood Bank" },
        { lat: 19.1728, lng: 72.9558, name: "Fortis Hospital" },
      ],
    },
    {
      id: "DEL003",
      from: "Red Cross Center, Pune",
      to: "Rural Health Center, Satara",
      bloodType: "A+",
      units: 6,
      method: "drone",
      status: "preparing",
      temperature: 4.0,
      eta: "45 minutes",
      progress: 10,
      route: [
        { lat: 18.5204, lng: 73.8567, name: "Red Cross Center" },
        { lat: 17.6868, lng: 74.018, name: "Rural Health Center" },
      ],
    },
  ])

  const [spoilageAlerts] = useState([
    {
      location: "Pune Blood Bank",
      bloodType: "AB+",
      units: 6,
      expiryTime: "36 hours",
      severity: "high",
    },
    {
      location: "Delhi Blood Center",
      bloodType: "O+",
      units: 12,
      expiryTime: "48 hours",
      severity: "medium",
    },
    {
      location: "Chennai Blood Bank",
      bloodType: "B-",
      units: 4,
      expiryTime: "72 hours",
      severity: "low",
    },
  ])

  const [coldChainStats] = useState({
    totalDeliveries: 1247,
    successRate: 98.5,
    avgDeliveryTime: 23,
    temperatureCompliance: 99.2,
    dronesActive: 12,
    trucksActive: 8,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-500"
      case "dispatched":
        return "bg-yellow-500"
      case "preparing":
        return "bg-orange-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDeliveries((prev) =>
        prev.map((delivery) => ({
          ...delivery,
          progress: Math.min(delivery.progress + Math.random() * 5, 100),
          temperature: 4 + (Math.random() - 0.5) * 0.5,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
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
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Truck className="w-3 h-3 mr-1" />
                Logistics
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cold Chain & Logistics Tracker</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Real-time tracking of blood deliveries with drone and truck logistics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{coldChainStats.totalDeliveries}</div>
              <div className="text-sm opacity-90">Total Deliveries</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{coldChainStats.successRate}%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{coldChainStats.avgDeliveryTime}m</div>
              <div className="text-sm opacity-90">Avg Delivery</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Thermometer className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{coldChainStats.temperatureCompliance}%</div>
              <div className="text-sm opacity-90">Temp Compliance</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <CardContent className="p-6 text-center">
              <Plane className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{coldChainStats.dronesActive}</div>
              <div className="text-sm opacity-90">Drones Active</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
            <CardContent className="p-6 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{coldChainStats.trucksActive}</div>
              <div className="text-sm opacity-90">Trucks Active</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Deliveries */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Route className="w-5 h-5 text-blue-600 mr-2" />
                  Active Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="p-6 border rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          {delivery.method === "drone" ? (
                            <Plane className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Truck className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Delivery {delivery.id}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {delivery.bloodType} • {delivery.units} units
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(delivery.status)} text-white`}>
                          {delivery.status.replace("-", " ").toUpperCase()}
                        </Badge>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">ETA: {delivery.eta}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Route Progress</span>
                        <span className="font-medium">{Math.round(delivery.progress)}%</span>
                      </div>
                      <Progress value={delivery.progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600 dark:text-gray-300">From</div>
                          <div className="font-medium text-gray-900 dark:text-white">{delivery.from}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-300">To</div>
                          <div className="font-medium text-gray-900 dark:text-white">{delivery.to}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Thermometer className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">{delivery.temperature.toFixed(1)}°C</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Live Tracking</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <MapPin className="w-4 h-4 mr-1" />
                          Track Live
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  Live Delivery Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-20"></div>
                  <div className="text-center z-10">
                    <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Interactive Delivery Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Real-time tracking of all blood deliveries across India
                    </p>
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Full Stock</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Low Stock</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Urgent Need</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spoilage Alerts */}
            <Card className="border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Spoilage Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {spoilageAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{alert.location}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {alert.bloodType} • {alert.units} units
                        </div>
                      </div>
                      <Badge className={`${getSeverityColor(alert.severity)} text-white text-xs`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Expires in {alert.expiryTime}
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                      <Zap className="w-4 h-4 mr-1" />
                      Urgent Transfer
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Temperature Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                  Temperature Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">2-8°C</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Optimal Range</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center p-3 border rounded">
                      <div className="font-semibold text-green-600">99.2%</div>
                      <div className="text-gray-600 dark:text-gray-300">Compliance</div>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <div className="font-semibold text-blue-600">4.1°C</div>
                      <div className="text-gray-600 dark:text-gray-300">Avg Temp</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plane className="w-4 h-4 mr-2" />
                  Deploy Emergency Drone
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Route className="w-4 h-4 mr-2" />
                  Optimize Routes
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Spoilage Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
