"use client"

import { siteConfig } from "@/data/config"
import LiquidGlassButton from "@/components/LiquidGlassButton"
import TrackableLink from "@/components/TrackableLink"

export default function Store() {
  return (
    <section id="store" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-5xl">

        <TrackableLink
          href={siteConfig.socials.shopify}
          target="_blank"
          rel="noopener noreferrer"
          event="store_click"
          properties={{ location: "card" }}
          className="group relative block overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.01]"
        >
          <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
          {/* Burgundy header bar */}
          <div className="bg-[#a42325] px-8 py-6 sm:px-12">
            <div className="flex items-center justify-between">
              <p className="font-['Barlow_Condensed',_'Barlow',_sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Shop
              </p>
              <span className="text-xs font-medium text-white/60">@curated.creation</span>
            </div>
            <h2 className="mt-1 font-['Barlow_Condensed',_'Barlow',_sans-serif] text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
              Curated Creations
            </h2>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6 bg-white/[0.03] px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
            <p className="text-sm leading-relaxed text-neutral-400 sm:max-w-md">
              Custom 3D printed products — wine tags, keychains, desk accessories, and more. Designed and printed by me, shipped directly to you.
            </p>
            <LiquidGlassButton className="shrink-0 px-6 py-2.5 font-semibold uppercase tracking-widest text-white">
              Shop Now
            </LiquidGlassButton>
          </div>
        </TrackableLink>

      </div>
    </section>
  )
}
