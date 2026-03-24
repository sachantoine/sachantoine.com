import { siteConfig } from "@/data/config"

export default function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-white">About</h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="leading-relaxed text-neutral-300">{siteConfig.bio}</p>
            <p className="mt-4 leading-relaxed text-neutral-300">
              I make content about my builds, tools I create, and the 3D printing workflow — from design to finished product. If you found me through TikTok, welcome.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">What I Do</p>
              <ul className="space-y-1.5 text-sm text-neutral-300">
                <li>→ Full-stack software development</li>
                <li>→ 3D design & print-on-demand</li>
                <li>→ macOS tool development</li>
                <li>→ Content creation & video</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">Tools & Stack</p>
              <div className="flex flex-wrap gap-2">
                {["Python", "TypeScript", "Next.js", "PyQt6", "Tailwind", "Shopify", "OrcaSlicer", "Fusion 360"].map((t) => (
                  <span key={t} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-neutral-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
