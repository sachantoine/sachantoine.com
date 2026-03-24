import { projects } from "@/data/projects"

export default function Portfolio() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
          <a
            href="https://github.com/sachantoine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            All on GitHub →
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.name}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{p.name}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === "Live"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-400">{p.description}</p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded border border-white/10 px-2 py-0.5 text-xs text-neutral-500">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 transition-colors hover:text-white"
                    >
                      GitHub →
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 transition-colors hover:text-white"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
