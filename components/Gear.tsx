import Image from "next/image"
import { gear } from "@/data/gear"
import TrackableLink from "@/components/TrackableLink"

const glassShadow = "pointer-events-none absolute inset-0 z-0 rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"
const glassBackdrop = "pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-xl"

export default function Gear() {
  return (
    <section id="gear" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">Gear I Use</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Stuff I actually own and recommend. If you saw it in a video, it&apos;s probably here.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {gear.map((item) => {
            const hasLink = item.link && item.link !== "#"
            const inner = (
              <>
                <div className={glassShadow} />
                <div className={glassBackdrop} style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
                <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-2xl">
                      {item.category === "3D Printing" ? "🖨️" : item.category === "Camera" ? "📷" : "📦"}
                    </span>
                  )}
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-white">{item.name}</p>
                    {hasLink && (
                      <span className="shrink-0 text-xs text-neutral-500 transition-colors group-hover:text-neutral-300">
                        Shop →
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>
                  <span className="mt-2 inline-block rounded border border-white/10 px-2 py-0.5 text-xs text-neutral-500">
                    {item.category}
                  </span>
                  {item.discount && (
                    <span className="ml-2 mt-2 inline-block rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                      {item.discount}
                    </span>
                  )}
                </div>
              </>
            )

            return hasLink ? (
              <TrackableLink
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                event="gear_click"
                properties={{ item: item.name, category: item.category }}
                className="group relative flex items-start gap-4 rounded-xl p-4 transition-transform duration-300 hover:scale-[1.02]"
              >
                {inner}
              </TrackableLink>
            ) : (
              <div
                key={item.name}
                className="relative flex items-start gap-4 rounded-xl p-4"
              >
                {inner}
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-xs text-neutral-600">
          Affiliate links help support the channel at no extra cost to you.
        </p>
      </div>
    </section>
  )
}
