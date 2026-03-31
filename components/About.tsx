import { siteConfig } from "@/data/config"

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-white">About</h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="leading-relaxed text-neutral-300">{siteConfig.bio}</p>
            <p className="mt-4 leading-relaxed text-neutral-300">
              I make content about my prints, the gear I use, and the full 3D printing workflow from design to finished product. If you found me through TikTok, welcome.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative rounded-xl p-5">
              <div className="pointer-events-none absolute inset-0 z-0 rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
              <div className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-xl" style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
              <p className="relative z-10 mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--blue-light)" }}>What I Do</p>
              <ul className="relative z-10 space-y-1.5 text-sm text-neutral-300">
                <li>3D design and print-on-demand</li>
                <li>Custom print commissions</li>
                <li>Content creation and video</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
