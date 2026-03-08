import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import SelectionField from '../components/ui/SelectionField'
import { prependItem } from '../utils/localStorage'

const AREA_OPTIONS = [
  { label: 'Consultorio', value: 'Consultorio' },
  { label: 'Farmacia', value: 'Farmacia' },
]

const PRIORITY_OPTIONS = [
  { label: 'Baja', value: 'Baja' },
  { label: 'Media', value: 'Media' },
  { label: 'Alta', value: 'Alta' },
  { label: 'Urgente', value: 'Urgente' },
]

export default function NuevaRequisicion() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    area: '',
    prioridad: 'Media',
    notas: '',
  })
  const [items, setItems] = useState([{ nombre: '', cantidad: '', unidad: '' }])
  const estadoInicial = 'Pendiente'

  const canSave = useMemo(
    () => Boolean(form.area && items.some((item) => item.nombre.trim() && item.cantidad)),
    [form.area, items],
  )

  const updateItem = (index, key, value) => {
    setItems((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)))
  }

  const save = (event) => {
    event.preventDefault()
    if (!canSave) return
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    prependItem('requisiciones_registradas', {
      id: `REQ-${Date.now()}`,
      area: form.area,
      prioridad: form.prioridad,
      estado: estadoInicial,
      items: items.filter((item) => item.nombre.trim() && item.cantidad).map((item) => `${item.nombre} (${item.cantidad} ${item.unidad || 'pz'})`),
      notas: form.notas,
      solicitante: user?.nombre ? `Dr. ${user.nombre}` : 'Usuario autenticado',
      fecha: new Date().toLocaleDateString('es-MX'),
      fechaRegistro: new Date().toISOString(),
    })
    navigate('/requisiciones')
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <button type="button" onClick={() => navigate('/requisiciones')} className="mb-2 inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700">
            <ArrowLeft size={14} />
            Volver a requisiciones
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Nueva requisición</h1>
        </div>
        <div className="rounded-xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700">Estado inicial: {estadoInicial}</div>
      </div>

      <form onSubmit={save} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectionField label="Área / Departamento" value={form.area} onChange={(value) => setForm((prev) => ({ ...prev, area: value }))} options={AREA_OPTIONS} required />
          <SelectionField label="Prioridad" value={form.prioridad} onChange={(value) => setForm((prev) => ({ ...prev, prioridad: value }))} options={PRIORITY_OPTIONS} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">Items solicitados</label>
            <button
              type="button"
              onClick={() => setItems((prev) => [...prev, { nombre: '', cantidad: '', unidad: '' }])}
              className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"
            >
              + Agregar item
            </button>
          </div>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 gap-3 md:grid-cols-12">
                <input
                  value={item.nombre}
                  onChange={(e) => updateItem(index, 'nombre', e.target.value)}
                  placeholder="Nombre del insumo"
                  className="rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm md:col-span-6"
                />
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => updateItem(index, 'cantidad', e.target.value)}
                  placeholder="Cantidad"
                  className="rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm md:col-span-2"
                />
                <input
                  value={item.unidad}
                  onChange={(e) => updateItem(index, 'unidad', e.target.value)}
                  placeholder="Unidad"
                  className="rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm md:col-span-3"
                />
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== index)))
                  }
                  className="rounded-xl border border-red-200 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 md:col-span-1"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Notas</label>
          <textarea
            rows={3}
            value={form.notas}
            onChange={(e) => setForm((prev) => ({ ...prev, notas: e.target.value }))}
            placeholder="Detalles adicionales"
            className="w-full rounded-xl border border-slate-200 bg-blue-50/50 px-3 py-2.5 text-sm"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/requisiciones')} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Cancelar</button>
          <button type="submit" disabled={!canSave} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-60">
            <Save size={14} />
            Guardar requisición
          </button>
        </div>
      </form>
    </div>
  )
}
