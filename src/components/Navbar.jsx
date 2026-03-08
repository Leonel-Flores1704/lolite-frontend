import { Bell, Search } from 'lucide-react'

export default function Navbar({ onOpenNotifications }) {
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 md:text-xl">Panel de gestión médica</h2>
        </div>

        <div className="relative ml-auto w-full md:w-[340px]">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar pacientes, citas o módulos"
            className="w-full rounded-full border border-slate-200 bg-blue-50/50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <span className="text-xs text-slate-400 md:text-sm">{today}</span>
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Notificaciones"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  )
}
