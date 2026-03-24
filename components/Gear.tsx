import Image from "next/image"
import { gear } from "@/data/gear"

export default function Gear() {
  return (
    <section id="gear" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">Gear I Use</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Stuff I actually own and recommend. If you saw it in a video, it&apos;s probably here.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {gear.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              {/* Product image or fallback icon */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-2xl">
                    {item.category === "3D Printing" ? "🖨️" : item.category === "Camera" ? "📷" : "📦"}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-white">{item.name}</p>
                  <span className="shrink-0 text-xs text-neutral-500 transition-colors group-hover:text-neutral-300">
                    Amazon →
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>
                <span className="mt-2 inline-block rounded border border-white/10 px-2 py-0.5 text-xs text-neutral-500">
                  {item.category}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-600">
          Not affiliate links — just the easiest way to find the exact product.
        </p>
      </div>
    </section>
  )
}
