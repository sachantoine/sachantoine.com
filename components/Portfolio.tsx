"use client"

import { projects } from "@/data/projects"
import TrackableLink from "@/components/TrackableLink"

export default function Portfolio() {
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
          <TrackableLink
            href="https://github.com/sachantoine"
            target="_blank"
            rel="noopener noreferrer"
            event="github_profile_click"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            All on GitHub →
          </TrackableLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.name}
              className="relative flex flex-col justify-between rounded-xl p-6 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="pointer-events-none absolute inset-0 z-0 rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
              <div
                className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-xl"
                style={{ backdropFilter: 'url("#liquid-glass-filter")' }}
              />
              <div className="relative z-10">
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

              <div className="relative z-10 mt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded border border-white/10 px-2 py-0.5 text-xs text-neutral-500">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {p.github && (
                    <TrackableLink
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      event="project_click"
                      properties={{ project: p.name, type: "github" }}
                      className="text-xs text-neutral-400 transition-colors hover:text-white"
                    >
                      GitHub →
                    </TrackableLink>
                  )}
                  {p.demo && (
                    <TrackableLink
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      event="project_click"
                      properties={{ project: p.name, type: "demo" }}
                      className="text-xs text-neutral-400 transition-colors hover:text-white"
                    >
                      Live →
                    </TrackableLink>
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
