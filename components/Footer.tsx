import { siteConfig } from "@/data/config"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex gap-6">
          <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">TikTok</a>
          <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a>
          <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub</a>
          <a href={siteConfig.socials.shopify} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Shop</a>
          <a href={siteConfig.socials.makerworld} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">MakerWorld</a>
        </div>
      </div>
    </footer>
  )
}
