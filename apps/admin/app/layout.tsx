import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { AuthGuard } from "./auth-guard"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Hyderabad Networks Admin | Clock Distribution Network",
  description: "Admin dashboard for managing products, orders, and business operations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

