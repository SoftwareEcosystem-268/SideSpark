import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SideSpark - เริ่มต้น Side Hustle อย่างมั่นใจ",
  description: "แอปที่ช่วยให้นักศึกษาไทยหาไอเดีย side hustle วางแผนโปรเจกต์ และติดตามรายได้เสริมอย่างเป็นระบบ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
