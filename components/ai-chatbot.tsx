"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  X,
  Send,
  Volume2,
  VolumeX,
  Bot,
  User,
  Heart,
  HelpCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  language?: string
}

interface MythBustingQuiz {
  question: string
  answer: boolean
  explanation: string
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "नमस्ते! मैं RAKT.AI का AI सहायक हूं। मैं रक्तदान के बारे में आपके सवालों का जवाब दे सकता हूं और मिथकों को दूर कर सकता हूं। आप कैसे मदद कर सकते हैं?",
      timestamp: new Date(),
      language: "hindi",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("hindi")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "english", name: "English", flag: "🇺🇸" },
    { code: "hindi", name: "हिंदी", flag: "🇮🇳" },
    { code: "marathi", name: "मराठी", flag: "🇮🇳" },
    { code: "tamil", name: "தமிழ்", flag: "🇮🇳" },
  ]

  const mythQuizzes: MythBustingQuiz[] = [
    {
      question: "Fact or Fiction: You can't donate blood if you're vegetarian?",
      answer: false,
      explanation:
        "FICTION! Vegetarians can absolutely donate blood. Your diet doesn't affect your ability to donate as long as you maintain good nutrition and meet other health requirements.",
    },
    {
      question: "Fact or Fiction: You need to fast before donating blood?",
      answer: false,
      explanation:
        "FICTION! You should actually eat a healthy meal before donating blood. Having food in your system helps prevent dizziness and maintains your energy levels.",
    },
    {
      question: "Fact or Fiction: Blood donation weakens your immune system permanently?",
      answer: false,
      explanation:
        "FICTION! Blood donation doesn't weaken your immune system. Your body replenishes the donated blood within 24-48 hours, and regular donation can actually improve your health.",
    },
  ]

  const botResponses = {
    english: {
      greeting:
        "Hello! I'm RAKT.AI's assistant. I can help you with blood donation questions and bust common myths. How can I help you today?",
      eligibility:
        "Great question! You can donate blood if you're 18-65 years old, weigh at least 50kg, and are in good health. Would you like me to check your specific eligibility?",
      myths:
        "I'd love to help clear up myths about blood donation! Did you know that donating blood is completely safe and doesn't weaken you? Your body replenishes the blood within 24-48 hours.",
      encourage:
        "Yes, You Can Donate! 🩸 Every donation can save up to 3 lives. You're making a real difference in your community!",
    },
    hindi: {
      greeting: "नमस्ते! मैं RAKT.AI का सहायक हूं। मैं रक्तदान के बारे में आपकी मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      eligibility: "बहुत अच्छा सवाल! आप रक्तदान कर सकते हैं यदि आपकी उम्र 18-65 साल है, वजन कम से कम 50 किलो है, और आप स्वस्थ हैं।",
      myths: "मैं रक्तदान के बारे में मिथकों को दूर करने में आपकी मदद करूंगा! क्या आप जानते हैं कि रक्तदान बिल्कुल सुरक्षित है?",
      encourage: "हां, आप दान कर सकते हैं! 🩸 हर दान से 3 जिंदगियां बच सकती हैं।",
    },
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage === "hindi" ? "hi-IN" : "en-US"
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    const responses = botResponses[selectedLanguage as keyof typeof botResponses] || botResponses.english

    if (message.includes("eligib") || message.includes("योग्य")) {
      return responses.eligibility
    } else if (message.includes("myth") || message.includes("मिथक")) {
      return responses.myths
    } else if (message.includes("help") || message.includes("मदद")) {
      return responses.encourage
    } else {
      return responses.greeting
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg z-50 animate-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Open AI Chatbot</span>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Bot className="w-5 h-5 mr-2" />
            RAKT.AI Assistant
          </CardTitle>
          <div className="flex items-center space-x-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-xs bg-white/20 text-white border-white/30 rounded px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === "bot" && <Bot className="w-4 h-4 mt-0.5 text-red-500" />}
                  {message.type === "user" && <User className="w-4 h-4 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    {message.type === "bot" && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.content)}
                          className="h-6 px-2 text-xs"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3" onClick={stopSpeaking} />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-wrap gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Am I eligible to donate blood?")}
              className="text-xs"
            >
              <Heart className="w-3 h-3 mr-1" />
              Check Eligibility
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowQuiz(!showQuiz)} className="text-xs">
              <HelpCircle className="w-3 h-3 mr-1" />
              Myth Quiz
            </Button>
          </div>

          {showQuiz && (
            <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Myth-Busting Quiz</h4>
              {mythQuizzes.map((quiz, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <p className="text-xs mb-2">{quiz.question}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1 bg-transparent"
                      onClick={() => {
                        const isCorrect = !quiz.answer
                        const message = `${isCorrect ? "✅ Correct!" : "❌ Incorrect!"} ${quiz.explanation}`
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: Date.now().toString(),
                            type: "bot",
                            content: message,
                            timestamp: new Date(),
                          },
                        ])
                      }}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Fact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1 bg-transparent"
                      onClick={() => {
                        const isCorrect = quiz.answer
                        const message = `${isCorrect ? "✅ Correct!" : "❌ Incorrect!"} ${quiz.explanation}`
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: Date.now().toString(),
                            type: "bot",
                            content: message,
                            timestamp: new Date(),
                          },
                        ])
                      }}
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Fiction
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about blood donation..."
              className="flex-1 text-sm"
            />
            <Button onClick={handleSendMessage} size="sm" className="bg-red-500 hover:bg-red-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
