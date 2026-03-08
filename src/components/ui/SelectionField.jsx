import { useMemo, useState } from 'react'
import { Check, ChevronRight, X } from 'lucide-react'

export default function SelectionField({
  label,
  value,
  placeholder = 'Seleccionar',
  options = [],
  onChange,
  className = '',
  required = false,
}) {
  const [open, setOpen] = useState(false)
  const currentLabel = useMemo(
    () => options.find((opt) => opt.value === value)?.label || '',
    [options, value],
  )

  return (
    <div className={className}>
      {label ? (
        <label className="mb-1 block text-xs font-semibold text-slate-700">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-left transition-colors hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <span className={`flex-1 text-sm ${currentLabel ? 'text-slate-700' : 'text-slate-400'}`}>
          {currentLabel || placeholder}
        </span>
        <ChevronRight size={16} className="text-slate-400" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-900/35"
            aria-label="Cerrar selección"
          />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-sm font-bold text-slate-800">{label || 'Seleccionar opción'}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-100">
              {options.map((option) => {
                const active = option.value === value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                      active
                        ? 'bg-cyan-50 font-semibold text-cyan-700'
                        : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {active ? <Check size={16} className="text-cyan-600" /> : null}
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
