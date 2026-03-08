import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react'

function monthGrid(viewMonth) {
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { year, month, firstDay, daysInMonth }
}

function formatEs(date) {
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function CalendarField({ label, value, onChange, className = '' }) {
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(() => new Date(value || new Date()))
  const grid = useMemo(() => monthGrid(viewMonth), [viewMonth])

  return (
    <div className={className}>
      {label ? <label className="mb-1 block text-xs font-semibold text-slate-700">{label}</label> : null}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-left transition-colors hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <CalendarDays size={16} className="text-cyan-600" />
        <span className="flex-1 text-sm text-slate-700">{formatEs(value || new Date())}</span>
        <ChevronRight size={16} className="text-slate-400" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-900/35"
            aria-label="Cerrar calendario"
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setViewMonth(new Date(grid.year, grid.month - 1, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="text-sm font-bold text-slate-800">
                {viewMonth.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMonth(new Date(grid.year, grid.month + 1, 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: grid.firstDay }).map((_, idx) => (
                <span key={`empty-${idx}`} />
              ))}
              {Array.from({ length: grid.daysInMonth }).map((_, idx) => {
                const day = idx + 1
                const date = new Date(grid.year, grid.month, day)
                const isSelected =
                  value &&
                  date.getDate() === value.getDate() &&
                  date.getMonth() === value.getMonth() &&
                  date.getFullYear() === value.getFullYear()
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      onChange(date)
                      setOpen(false)
                    }}
                    className={`h-9 rounded-lg text-sm transition-colors ${
                      isSelected ? 'bg-cyan-500 text-white' : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
