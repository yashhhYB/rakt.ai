"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  QrCode,
  CreditCard,
  CheckCircle,
  User,
  Phone,
  Calendar,
  Award,
  Gift,
  Printer,
  Scan,
  UserCheck,
} from "lucide-react"

export default function KioskPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [donorData, setDonorData] = useState({
    name: "",
    phone: "",
    bloodType: "",
    lastDonation: "",
    eligibilityScore: 0,
  })
  const [isScanning, setIsScanning] = useState(false)
  const [donationCount, setDonationCount] = useState(2)

  const steps = [
    { id: 1, title: "Welcome", icon: Heart },
    { id: 2, title: "Scan ID", icon: QrCode },
    { id: 3, title: "Eligibility", icon: UserCheck },
    { id: 4, title: "Complete", icon: CheckCircle },
  ]

  const handleAadharScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setDonorData({
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        bloodType: "B+",
        lastDonation: "2023-10-15",
        eligibilityScore: 95,
      })
      setIsScanning(false)
      setCurrentStep(3)
    }, 3000)
  }

  const handleEligibilityCheck = () => {
    setTimeout(() => {
      setCurrentStep(4)
    }, 2000)
  }

  const handlePrintReceipt = () => {
    setDonationCount(donationCount + 1)
    alert("Donor ID receipt printed successfully!")
  }

  const getStepColor = (stepId: number) => {
    if (stepId < currentStep) return "bg-green-500"
    if (stepId === currentStep) return "bg-blue-500"
    return "bg-gray-300"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900">
      {/* Kiosk Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-12 h-12 mr-4 animate-pulse" />
          <h1 className="text-4xl font-bold">RAKT.AI Donor Kiosk</h1>
        </div>
        <p className="text-xl opacity-90">Quick & Easy Blood Donor Registration</p>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getStepColor(step.id)}`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900 dark:text-white">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${step.id < currentStep ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="shadow-2xl">
          <CardContent className="p-12">
            {currentStep === 1 && (
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-12 h-12 text-red-600 animate-heartbeat" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Blood Donation</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Thank you for choosing to save lives. Let's get you registered quickly and safely.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 text-left">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Process</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Complete registration in under 3 minutes</p>
                  </div>
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Award className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Earn Rewards</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get points and badges for donations</p>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-xl"
                >
                  Start Registration
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  {isScanning ? (
                    <Scan className="w-12 h-12 text-blue-600 animate-spin" />
                  ) : (
                    <QrCode className="w-12 h-12 text-blue-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Scan Your Aadhar Card</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Place your Aadhar card on the scanner below for instant verification
                  </p>
                </div>

                {isScanning ? (
                  <div className="space-y-4">
                    <div className="w-64 h-40 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 to-green-900 rounded-lg mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <Scan className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">Scanning...</p>
                      </div>
                    </div>
                    <Progress value={66} className="w-64 mx-auto" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-64 h-40 border-4 border-dashed border-blue-300 rounded-lg mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <CreditCard className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">Place Aadhar Card Here</p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      onClick={handleAadharScan}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl"
                    >
                      <QrCode className="w-6 h-6 mr-3" />
                      Start Scanning
                    </Button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCheck className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Eligibility Check</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Verifying your donation eligibility based on health guidelines
                  </p>
                </div>

                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="font-medium">{donorData.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-gray-600 mr-3" />
                            <span>{donorData.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-5 h-5 text-red-600 mr-3" />
                            <Badge className="bg-red-100 text-red-800">{donorData.bloodType}</Badge>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                            <span>Last donation: {donorData.lastDonation}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Eligibility Score</h3>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">{donorData.eligibilityScore}%</div>
                          <Progress value={donorData.eligibilityScore} className="mb-4" />
                          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Eligible to Donate
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={handleEligibilityCheck}
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-xl"
                  >
                    Confirm Eligibility
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Registration Complete!</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Thank you {donorData.name}! You're all set for blood donation.
                  </p>
                </div>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Loyalty Status</h3>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-2">{donationCount}/3</div>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">Donations completed</p>
                          <Progress value={(donationCount / 3) * 100} className="mb-4" />
                          {donationCount >= 3 ? (
                            <Badge className="bg-gold-100 text-gold-800 text-lg px-4 py-2">
                              <Gift className="w-5 h-5 mr-2" />
                              Free Health Checkup Earned!
                            </Badge>
                          ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {3 - donationCount} more donations for free health checkup
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Next Steps</h3>
                        <div className="space-y-3 text-left">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <span>Proceed to donation area</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <span>Show your donor ID to staff</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <span>Enjoy refreshments after donation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center space-x-4">
                  <Button
                    size="lg"
                    onClick={handlePrintReceipt}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  >
                    <Printer className="w-6 h-6 mr-3" />
                    Print Donor ID
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep(1)} variant="outline" className="px-8 py-4 text-lg">
                    Register Another Donor
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
