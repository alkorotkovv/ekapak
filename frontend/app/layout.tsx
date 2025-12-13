import { Providers } from "@/components/Providers"
import { Header } from "@/components/Header"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "ЕКАПАК - упаковка и пленка",
  description: "Упаковка и пленка",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-manrope">
        <Providers>
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
