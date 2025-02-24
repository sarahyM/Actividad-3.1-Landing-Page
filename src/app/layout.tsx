import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const playfair = Playfair_Display({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Margarita Resort & Spa | Luxury Beach Resort in Venezuela",
  description:
    "Experience luxury and tranquility at Margarita Resort & Spa. Located in the beautiful Margarita Island, Venezuela.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} ${inter.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

