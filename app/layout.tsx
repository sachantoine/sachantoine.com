import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sach Antoine",
  description: "Developer. Creator. 3D Designer.",
  openGraph: {
    title: "Sach Antoine",
    description: "Developer. Creator. 3D Designer.",
    url: "https://sachantoine.com",
    siteName: "Sach Antoine",
    images: [{ url: "/profile.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sach Antoine",
    description: "Developer. Creator. 3D Designer.",
    images: ["/profile.jpg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.className} bg-[#0a0a0a] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
