import Image from "next/image"
import { prints } from "@/data/prints"

export default function PrintGallery() {
  return (
    <section id="prints" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">3D Prints</h2>
          <a
            href="https://bycuratedcreations.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Shop all →
          </a>
        </div>

        {prints.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <p className="text-neutral-500">Photos coming soon.</p>
            <a
              href="https://bycuratedcreations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              Browse the store in the meantime →
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prints.map((p) => (
              <a
                key={p.name}
                href={p.shopifyLink ?? "https://bycuratedcreations.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-white/10 transition-all hover:border-white/20"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-white/5">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-neutral-600 text-sm">No image</div>
                  )}
                  {p.available && (
                    <span className="absolute top-3 right-3 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-400">
                      Available
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-white">{p.name}</p>
                  {p.description && (
                    <p className="mt-1 text-sm text-neutral-400">{p.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
