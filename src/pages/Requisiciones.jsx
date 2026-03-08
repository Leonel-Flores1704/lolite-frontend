import { useMemo, useState } from 'react'
import { ClipboardList, Eye, Pencil, Search, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { readCollection } from '../utils/localStorage'

const baseRequisiciones = [
  { id: 'REQ-2026-001', fecha: '20/02/2026', area: 'Consultorio', prioridad: 'Alta', estado: 'Pendiente', items: ['Paracetamol (100)', 'Jeringas (50)'], solicitante: 'Dr. Juan Pedro' },
  { id: 'REQ-2026-002', fecha: '19/02/2026', area: 'Farmacia', prioridad: 'Media', estado: 'Pendiente', items: ['Gasas (100)'], solicitante: 'Dra. María González' },
]

export default function Requisiciones() {
  const navigate = useNavigate()
  const created = readCollection('requisiciones_registradas', [])
  const [search, setSearch] = useState('')

  const all = useMemo(
    () =>
      [...created, ...baseRequisiciones].map((item, index) => ({
        ...item,
        id: item.id || `REQ-${Date.now()}-${index}`,
        fecha: item.fecha || new Date(item.fechaRegistro || Date.now()).toLocaleDateString('es-MX'),
      })),
    [created],
  )

  const filtered = useMemo(
    () =>
      all.filter((item) =>
        `${item.id} ${item.area} ${item.solicitante || ''}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [all, search],
  )

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de requisiciones</h2>
          <p className="text-sm text-slate-500">Solicitudes de insumos y medicamentos</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/requisiciones/nuevo')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          + Nueva requisición
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total', value: all.length },
          { label: 'Pendientes', value: all.filter((x) => x.estado === 'Pendiente').length },
          { label: 'Área consultorio', value: all.filter((x) => x.area === 'Consultorio').length },
          { label: 'Área farmacia', value: all.filter((x) => x.area === 'Farmacia').length },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar requisición o área"
            className="w-full rounded-xl border border-slate-200 bg-blue-50/50 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1050px]">
            <div className="grid grid-cols-[44px_1fr_1fr_1fr_1fr_1fr_2fr_120px] rounded-2xl bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-500">
              <span><input type="checkbox" className="h-4 w-4 rounded border border-[#899BA5] bg-slate-50 accent-[#899BA5]" /></span>
              <span>ID</span>
              <span>Fecha</span>
              <span>Área</span>
              <span>Prioridad</span>
              <span>Solicitante</span>
              <span>Items</span>
              <span className="text-center">Acciones</span>
            </div>
            {filtered.map((item, index) => (
              <div key={`${item.id}-${index}`} className="grid grid-cols-[44px_1fr_1fr_1fr_1fr_1fr_2fr_120px] items-center border-b border-slate-200 px-3 py-3 text-sm">
                <span><input type="checkbox" className="h-4 w-4 rounded border border-[#899BA5] bg-slate-50 accent-[#899BA5]" /></span>
                <span className="font-semibold text-slate-700">{item.id}</span>
                <span>{item.fecha}</span>
                <span>{item.area}</span>
                <span>{item.prioridad}</span>
                <span>{item.solicitante || 'Usuario autenticado'}</span>
                <div className="text-xs text-slate-600">
                  {(item.items || []).slice(0, 2).join(', ') || 'Sin items'}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Eye size={13} className="text-cyan-600" /></button>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Pencil size={13} className="text-slate-600" /></button>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Trash2 size={13} className="text-red-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-cyan-700">
        <p className="flex items-center gap-2 font-semibold"><ClipboardList size={16} /> Estado inicial fijo: Pendiente</p>
      </div>
    </div>
  )
}
