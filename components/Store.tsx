import { siteConfig } from "@/data/config"

export default function Store() {
  return (
    <section id="store" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">

        <a
          href={siteConfig.socials.shopify}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-2xl border border-white/10 transition-all hover:border-white/20"
        >
          {/* Burgundy header bar */}
          <div className="bg-[#a42325] px-8 py-6 sm:px-12">
            <p className="font-['Barlow_Condensed',_'Barlow',_sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Shop
            </p>
            <h2 className="mt-1 font-['Barlow_Condensed',_'Barlow',_sans-serif] text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              By Curated Creations
            </h2>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6 bg-white/[0.03] px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <p className="text-sm leading-relaxed text-neutral-400 sm:max-w-md">
              Custom 3D printed products — wine tags, keychains, desk accessories, and more. Designed and printed by me, shipped directly to you.
            </p>
            <span className="shrink-0 rounded border border-[#a42325] bg-[#a42325] px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-white transition-all group-hover:bg-[#8a1e1f]">
              Shop Now
            </span>
          </div>
        </a>

      </div>
    </section>
  )
}
