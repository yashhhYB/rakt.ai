import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AIChatbot } from "@/components/ai-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RAKT.AI - Smart Blood Donation Ecosystem",
  description: "AI-powered blood donation platform connecting donors, hospitals, and blood banks across India",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <AIChatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
