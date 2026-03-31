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
      <body suppressHydrationWarning className={`${geist.className} bg-[#0a0a0a] text-white antialiased`}>
        {children}
        <svg className="hidden" aria-hidden="true">
          <defs>
            <filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
              <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
              <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
              <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
              <feComposite in="finalBlur" in2="finalBlur" operator="over" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  )
}
