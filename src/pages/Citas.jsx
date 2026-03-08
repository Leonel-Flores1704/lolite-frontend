import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  CalendarCheck2,
  CircleCheck,
  Clock3,
  Eye,
  Pencil,
  Search,
  Trash2,
  XCircle,
} from 'lucide-react'
import { readCollection } from '../utils/localStorage'

const baseCitas = [
  { id: 'CIT-1201', paciente: 'Leonel flores', doctor: 'Sergio Vargas Luna', telefono: '618 123 4567', fechaTexto: '25 DIC 2025', hora: '10:30 AM', estado: 'Completada' },
  { id: 'CIT-1202', paciente: 'Roberto Solis', doctor: 'Jose Luis mandolado', telefono: '618 123 4567', fechaTexto: '25 DIC 2025', hora: '10:30 AM', estado: 'Pendiente' },
  { id: 'CIT-1203', paciente: 'Andrés García', doctor: 'Maria Jose Montelongo', telefono: '618 111 2223', fechaTexto: '25 DIC 2025', hora: '10:30 AM', estado: 'Cancelada' },
  { id: 'CIT-1204', paciente: 'Leonel flores', doctor: 'Sergio Vargas Luna', telefono: '618 123 4567', fechaTexto: '25 DIC 2025', hora: '10:30 AM', estado: 'Atendida' },
  { id: 'CIT-1205', paciente: 'Roberto Solis', doctor: 'Jose Luis mandolado', telefono: '618 123 4567', fechaTexto: '25 DIC 2025', hora: '10:30 AM', estado: 'Pendiente' },
  { id: 'CIT-1206', paciente: 'Marta Ruiz', doctor: 'Dra. Laura Torres', telefono: '618 222 5566', fechaTexto: '26 DIC 2025', hora: '09:00 AM', estado: 'Atendida' },
  { id: 'CIT-1207', paciente: 'Carla Pineda', doctor: 'Dr. Juan Pedro Ramírez', telefono: '618 009 1133', fechaTexto: '26 DIC 2025', hora: '11:00 AM', estado: 'Completada' },
  { id: 'CIT-1208', paciente: 'José Ramírez', doctor: 'Dr. Carlos Mendoza', telefono: '618 119 7788', fechaTexto: '27 DIC 2025', hora: '12:30 PM', estado: 'Pendiente' },
]

const badgeByStatus = {
  Completada: 'bg-green-50 text-green-600 border border-green-100',
  Atendida: 'bg-sky-50 text-sky-600 border border-sky-100',
  Pendiente: 'bg-amber-50 text-amber-600 border border-amber-100',
  Cancelada: 'bg-red-50 text-red-600 border border-red-100',
  Confirmada: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

export default function Citas() {
  const navigate = useNavigate()
  const created = readCollection('citas_registradas', [])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todas')

  const all = useMemo(() => [...created, ...baseCitas], [created])
  const filtered = useMemo(() => {
    const byText = all.filter((item) =>
      `${item.paciente} ${item.doctor}`.toLowerCase().includes(search.toLowerCase()),
    )
    return filter === 'Todas' ? byText : byText.filter((item) => item.estado === filter)
  }, [all, search, filter])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestión de citas</h2>
          <p className="text-sm text-slate-500">Agenda y control de atención médica</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/citas/nueva')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          + Agregar cita
        </button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total citas', value: all.length, icon: Calendar, color: 'bg-blue-100 text-blue-700' },
          { label: 'Completadas', value: all.filter((x) => x.estado === 'Completada').length, icon: CircleCheck, color: 'bg-green-100 text-green-700' },
          { label: 'Pendientes', value: all.filter((x) => x.estado === 'Pendiente').length, icon: Clock3, color: 'bg-amber-100 text-amber-700' },
          { label: 'Canceladas', value: all.filter((x) => x.estado === 'Cancelada').length, icon: XCircle, color: 'bg-red-100 text-red-700' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">{item.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                <item.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4">
          <div className="relative min-w-[260px] flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar paciente o doctor"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {['Todas', 'Completada', 'Atendida', 'Pendiente', 'Cancelada'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                filter === item ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1180px]">
            <div className="grid grid-cols-[44px_1.35fr_1.35fr_1fr_1fr_1fr_120px] rounded-2xl bg-blue-50 px-3 py-3 text-xs font-semibold text-slate-700">
              <span><input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" /></span>
              <span>Paciente</span>
              <span>Doctor asignado</span>
              <span>Telefono</span>
              <span>Fecha de la cita</span>
              <span>Estado</span>
              <span>Acciones</span>
            </div>

            {filtered.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="grid grid-cols-[44px_1.35fr_1.35fr_1fr_1fr_1fr_120px] items-center border-b border-slate-200 px-3 py-3 text-sm">
                <span><input type="checkbox" className="h-4 w-4 rounded border border-slate-200 bg-slate-50 accent-slate-400" /></span>

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {initials(item.paciente)}
                  </div>
                  <p className="font-semibold text-slate-800">{item.paciente}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    {initials(item.doctor)}
                  </div>
                  <p className="text-slate-800">{item.doctor}</p>
                </div>

                <span className="text-slate-700">{item.telefono}</span>

                <div>
                  <p className="text-slate-900">{item.fechaTexto}</p>
                  <p className="text-xs text-slate-500">{item.hora}</p>
                </div>

                <span>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeByStatus[item.estado] || 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                    {item.estado}
                  </span>
                </span>

                <div className="flex items-center gap-1">
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
