import { rightNow } from "@/data/config"

export default function RightNow() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <a
          href={rightNow.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <span className="mt-0.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
              {rightNow.label}
            </span>
            <div>
              <p className="font-semibold text-white">{rightNow.title}</p>
              <p className="mt-1 text-sm text-neutral-400">{rightNow.description}</p>
            </div>
          </div>
          <span className="shrink-0 text-sm text-neutral-400 transition-colors group-hover:text-white">
            {rightNow.linkText} →
          </span>
        </a>
      </div>
    </section>
  )
}
