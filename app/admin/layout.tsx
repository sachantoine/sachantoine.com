export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-neutral-500 hover:text-white transition-colors">← Site</a>
            <span className="text-sm font-semibold text-white">Admin</span>
          </div>
          <a href="/admin/commissions" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Commissions
          </a>
        </div>
      </header>
      {children}
    </div>
  )
}
