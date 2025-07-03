"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Heart,
  Users,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Activity,
  Hospital,
  Calendar,
  Target,
  Award,
  Zap,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [nationalStats] = useState({
    totalDonors: 89340,
    activeDonations: 1247,
    bloodBanksConnected: 2156,
    emergencyRequests: 89,
    livesImpacted: 12470,
    averageResponseTime: "23 minutes",
  })

  const [stateData] = useState([
    { state: "Maharashtra", donors: 15420, bloodBanks: 342, urgentNeeds: 12 },
    { state: "Karnataka", donors: 12890, bloodBanks: 298, urgentNeeds: 8 },
    { state: "Tamil Nadu", donors: 11560, bloodBanks: 276, urgentNeeds: 15 },
    { state: "Gujarat", donors: 9870, bloodBanks: 234, urgentNeeds: 6 },
    { state: "Delhi", donors: 8940, bloodBanks: 189, urgentNeeds: 9 },
    { state: "West Bengal", donors: 7650, bloodBanks: 167, urgentNeeds: 11 },
  ])

  const [donationTrends] = useState([
    { month: "Jan", donations: 4200, requests: 3800 },
    { month: "Feb", donations: 4800, requests: 4200 },
    { month: "Mar", donations: 5200, requests: 4600 },
    { month: "Apr", donations: 4900, requests: 4400 },
    { month: "May", donations: 5600, requests: 5100 },
    { month: "Jun", donations: 6200, requests: 5800 },
  ])

  const [bloodTypeDistribution] = useState([
    { name: "O+", value: 35, color: "#ef4444" },
    { name: "A+", value: 28, color: "#f97316" },
    { name: "B+", value: 20, color: "#eab308" },
    { name: "AB+", value: 8, color: "#22c55e" },
    { name: "O-", value: 4, color: "#3b82f6" },
    { name: "A-", value: 3, color: "#8b5cf6" },
    { name: "B-", value: 1.5, color: "#ec4899" },
    { name: "AB-", value: 0.5, color: "#6b7280" },
  ])

  const [criticalAlerts] = useState([
    { location: "Mumbai", bloodType: "O-", shortage: "Critical", units: 8, time: "2 hours ago" },
    { location: "Delhi", bloodType: "B+", shortage: "Urgent", units: 15, time: "4 hours ago" },
    { location: "Bangalore", bloodType: "AB-", shortage: "Moderate", units: 6, time: "6 hours ago" },
    { location: "Chennai", bloodType: "A+", shortage: "Critical", units: 12, time: "8 hours ago" },
  ])

  // Add new state for ML predictions
  const [mlPredictions] = useState([
    { state: "Maharashtra", riskLevel: "high", predictedShortage: 15, confidence: 92 },
    { state: "Karnataka", riskLevel: "medium", predictedShortage: 8, confidence: 87 },
    { state: "Tamil Nadu", riskLevel: "low", predictedShortage: 3, confidence: 94 },
    { state: "Gujarat", riskLevel: "medium", predictedShortage: 6, confidence: 89 },
    { state: "Delhi", riskLevel: "high", predictedShortage: 12, confidence: 91 },
  ])

  const getShortageColor = (shortage: string) => {
    switch (shortage) {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold text-red-600">RAKT.AI</span>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Admin</Badge>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Alert
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">National Blood Donation Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Real-time insights into India's blood donation ecosystem</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {nationalStats.totalDonors.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Donors</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {nationalStats.activeDonations.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Donations</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Hospital className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {nationalStats.bloodBanksConnected.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Blood Banks</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{nationalStats.emergencyRequests}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Emergency Requests</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {nationalStats.livesImpacted.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Lives Impacted</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {nationalStats.averageResponseTime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Avg Response</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Critical Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* State-wise Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    State-wise Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stateData.map((state, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{state.state}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {state.donors.toLocaleString()} donors • {state.bloodBanks} banks
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`${state.urgentNeeds > 10 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                          >
                            {state.urgentNeeds} urgent
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Blood Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 text-red-600 mr-2" />
                    Blood Type Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bloodTypeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {bloodTypeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Donation Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  Donation vs Request Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={donationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="donations" stroke="#22c55e" strokeWidth={3} name="Donations" />
                      <Line type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={3} name="Requests" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* State Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="w-5 h-5 text-blue-600 mr-2" />
                  State-wise Donor Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="state" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="donors" fill="#3b82f6" name="Donors" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Add ML Heatmap section in the analytics tab after the existing charts: */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  ML-Driven Weekly Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mlPredictions.map((prediction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            prediction.riskLevel === "high"
                              ? "bg-red-500"
                              : prediction.riskLevel === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{prediction.state}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            Predicted shortage: {prediction.predictedShortage} units
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            prediction.riskLevel === "high"
                              ? "bg-red-100 text-red-800"
                              : prediction.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-800 dark:text-red-200">
                  {criticalAlerts.length} critical blood shortage alerts require immediate attention
                </span>
              </div>
            </div>

            {criticalAlerts.map((alert, index) => (
              <Card key={index} className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {alert.bloodType} Blood Shortage in {alert.location}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {alert.units} units urgently needed • {alert.time}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getShortageColor(alert.shortage)}`}
                        >
                          {alert.shortage}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Priority: High</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Send Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Monthly Report</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Comprehensive monthly donation and request analytics
                  </p>
                  <Button variant="outline" size="sm">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Regional Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    State-wise performance and shortage predictions
                  </p>
                  <Button variant="outline" size="sm">
                    View Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Impact Assessment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Lives saved and community impact metrics
                  </p>
                  <Button variant="outline" size="sm">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Data Range</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Last 7 days
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Last 30 days
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Last 3 months
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Custom range
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Export Format</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">Export as Excel</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Export as CSV
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Export as PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
