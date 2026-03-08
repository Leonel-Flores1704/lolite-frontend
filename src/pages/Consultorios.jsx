import { useMemo, useState } from 'react'
import { CheckCircle2, Clock3, Eye, MapPin, Pencil, Search, Trash2, UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { readCollection } from '../utils/localStorage'

const baseConsultorios = [
  { id: 1, nombre: 'Consultorio 1', ubicacion: 'Piso 1, Sala A', estado: 'Disponible', doctor: 'Dr. Juan Pedro Ramírez', especialidad: 'Medicina General', horario: '08:00 - 14:00', citasDia: 12, equipamiento: 'Camilla, Estetoscopio' },
  { id: 2, nombre: 'Consultorio 2', ubicacion: 'Piso 1, Sala B', estado: 'Ocupado', doctor: 'Dra. María González', especialidad: 'Oftalmología', horario: '09:00 - 17:00', citasDia: 9, equipamiento: 'Lámpara, Camilla' },
  { id: 3, nombre: 'Consultorio 3', ubicacion: 'Piso 1, Sala C', estado: 'Disponible', doctor: 'Dr. Carlos Mendoza', especialidad: 'Cardiología', horario: '10:00 - 18:00', citasDia: 7, equipamiento: 'Camilla, Estetoscopio, Desfibrilador' },
]

export default function Consultorios() {
  const navigate = useNavigate()
  const extra = readCollection('consultorios_registrados', [])
  const consultorios = useMemo(() => [...extra, ...baseConsultorios], [extra])
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      consultorios.filter((item) =>
        `${item.nombre} ${item.doctor} ${item.ubicacion}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [consultorios, search],
  )

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Gestión de consultorios</h2>
          <p className="text-sm text-slate-500">Listado de consultorios, estado y disponibilidad</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/consultorios/nuevo')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          + Nuevo consultorio
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Consultorios', value: filtered.length, icon: MapPin, color: 'bg-blue-100 text-blue-600' },
          { label: 'Disponibles', value: filtered.filter((x) => x.estado === 'Disponible').length, icon: CheckCircle2, color: 'bg-green-100 text-green-600' },
          { label: 'Ocupados', value: filtered.filter((x) => x.estado === 'Ocupado').length, icon: UsersRound, color: 'bg-amber-100 text-amber-600' },
          { label: 'Citas de Hoy', value: filtered.reduce((acc, x) => acc + Number(x.citasDia || x.citas || 0), 0), icon: Clock3, color: 'bg-violet-100 text-violet-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por consultorio, doctor o ubicación"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={`${item.nombre}-${item.id}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{item.nombre}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={13} className="text-slate-400" />
                  {item.ubicacion}
                </p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${
                item.estado === 'Disponible'
                  ? 'border-green-300 text-green-700 bg-green-50/70'
                  : item.estado === 'Ocupado'
                    ? 'border-amber-300 text-amber-700 bg-amber-50/70'
                    : 'border-red-300 text-red-700 bg-red-50/70'
              }`}>{item.estado}</span>
            </div>

            <div className="mb-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-base font-semibold text-slate-900">{item.doctor || 'Sin asignar'}</p>
              <p className="text-xs font-medium text-slate-500">{item.especialidad || '-'}</p>
            </div>

            <p className="mb-2 text-xs font-semibold text-slate-400">Equipamiento:</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {String(item.equipamiento || 'Sin captura')
                .split(',')
                .map((equip) => equip.trim())
                .filter(Boolean)
                .slice(0, 4)
                .map((equip) => (
                  <span key={equip} className="rounded-full border border-slate-300 px-3 py-0.5 text-[11px] text-slate-700">
                    {equip}
                  </span>
                ))}
            </div>

            <div className="mb-4 flex items-end justify-between border-t border-slate-200 pt-3">
              <div>
                <p className="text-xs font-semibold text-slate-400">Horario</p>
                <p className="text-base font-semibold text-slate-900">{item.horario || '-'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-400">Citas hoy</p>
                <p className="text-base font-semibold text-cyan-600">{item.citasDia || item.citas || 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="rounded-2xl border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Ver</button>
              <button type="button" className="rounded-2xl border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Editar</button>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Detalles de Consultorios</h3>

        <div className="mb-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_160px_140px_140px_90px]">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar consultorios"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">Doctor</button>
          <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">Horario</button>
          <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-500">Citas</button>
          <button type="button" className="rounded-xl bg-cyan-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500">Exportar</button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1120px]">
            <div className="grid grid-cols-[44px_1.2fr_1fr_1.2fr_1fr_1fr_1fr_1fr_120px] rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-slate-700">
              <span><input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" /></span>
              <span>Consultorio</span>
              <span>Ubicación</span>
              <span>Doctor</span>
              <span>Especialidad</span>
              <span>Horario</span>
              <span>Citas / día</span>
              <span>Estado</span>
              <span className="text-center">Acciones</span>
            </div>
            {filtered.map((item, index) => (
              <div key={`${item.nombre}-${index}`} className="grid grid-cols-[44px_1.2fr_1fr_1.2fr_1fr_1fr_1fr_1fr_120px] items-center border-b border-slate-200 px-3 py-3 text-sm">
                <span><input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" /></span>
                <span className="font-semibold text-slate-700">{item.nombre}</span>
                <span>{item.ubicacion}</span>
                <span>{item.doctor || 'Sin asignar'}</span>
                <span>{item.especialidad || '-'}</span>
                <span>{item.horario || '-'}</span>
                <span>
                  <span className="rounded-md bg-cyan-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {item.citasDia || item.citas || 0}
                  </span>
                </span>
                <span>
                  <span className={`rounded-md border px-2 py-0.5 text-[11px] ${
                    item.estado === 'Disponible'
                      ? 'border-green-400 text-green-600 bg-green-50/70'
                      : item.estado === 'Ocupado'
                        ? 'border-amber-400 text-amber-600 bg-amber-50/70'
                        : 'border-red-400 text-red-600 bg-red-50/70'
                  }`}>
                    {item.estado}
                  </span>
                </span>
                <div className="flex items-center justify-center gap-1">
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Eye size={13} className="text-cyan-600" /></button>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Trash2 size={13} className="text-cyan-600" /></button>
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><Pencil size={13} className="text-cyan-600" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
