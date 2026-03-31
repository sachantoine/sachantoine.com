import { rightNow } from "@/data/config"

export default function RightNow() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <a
          href={rightNow.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col gap-3 rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.01] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
          <div className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-2xl" style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
          <div className="relative z-10 flex items-start gap-4">
            <span className="relative mt-0.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-neutral-300 shadow-[0_0_8px_rgba(0,0,0,0.03),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.08)]">
              {rightNow.label}
            </span>
            <div>
              <p className="font-semibold text-white">{rightNow.title}</p>
              <p className="mt-1 text-sm text-neutral-400">{rightNow.description}</p>
            </div>
          </div>
          <span className="relative z-10 shrink-0 text-sm text-neutral-400 transition-colors group-hover:text-white">
            {rightNow.linkText} →
          </span>
        </a>
      </div>
    </section>
  )
}
